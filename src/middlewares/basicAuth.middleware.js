const bcrypt = require("bcrypt");
const { users } = require("../stores/users");

module.exports = async (req, res, next) => {
  try {
    const contentLength = req.headers["content-length"];
    if (contentLength) {
      const sizeMB = (contentLength / 1024 / 1024).toFixed(2);
      // console.log(`Incoming request size: ${sizeMB} MB`);
    } else {
      // console.log("Incoming request size: unknown");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
        code: "AUTH_HEADER_MISSING",
      });
    }

    const [scheme, encoded] = authHeader.split(" ");

    if (scheme !== "Basic" || !encoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
        code: "INVALID_AUTH_FORMAT",
      });
    }

    // Decode base64
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    if (!username || !password) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization value",
        code: "INVALID_AUTH_VALUE",
      });
    }

    const user = users.find((u) => u.name === username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
        code: "INVALID_CREDENTIALS",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
        code: "INVALID_CREDENTIALS",
      });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      username: user.name,
    };

    next();
  } catch (err) {
    next(err);
  }
};
