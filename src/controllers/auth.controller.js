const authService = require("../services/auth.service");

exports.verifyPassword = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "username and password are required",
      });
    }
    const { isMatch, user } = await authService.verifyPassword(
      username,
      password,
    );
    res.status(200).json({
      success: true,
      data: { isMatch, user },
    });
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "username and password are required",
      });
    }
    const user = await authService.registerUser(username, password);

    // For now, we'll just return a success message
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
