const bcrypt = require("bcrypt");
const { users } = require("../stores/users");

exports.verifyPassword = async (username, password) => {
  const user = users.find((u) => u.name === username);
  if (!user) {
    throw new Error(`User not found: ${username}`);
  }
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid password");
  } else {
    return { user: { id: user.id, username: user.name } };
  }
};

exports.generateUser = async (username, password) => {
  // Check if the username already exists
  const existingUser = users.find((u) => u.name === username);
  if (existingUser) {
    throw new Error(`Username:[${username}] is already exists`);
  }

  // Hash the password
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);
  // Create the new user
  const newUser = {
    id: users.length + 1,
    name: username,
    password_hash,
  };
  return newUser;
};
