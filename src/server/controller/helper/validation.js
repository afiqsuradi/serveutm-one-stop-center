const { validateUser } = require("../../model/validator");
async function validateUserInput(userData) {
  return validateUser({
    name: userData.name,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: "user",
  });
}
exports.validateUserInput = validateUserInput;
