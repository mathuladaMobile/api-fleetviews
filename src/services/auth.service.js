const bcrypt = require("bcrypt");
const userService = require("./user.service");

exports.verifyPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  const userData = {
    id: user.id,
    username: user.username,
    company_code: user.company_code,
    company_name: company ? company.name : null,
  };

  return { isMatch, user: userData };
};
