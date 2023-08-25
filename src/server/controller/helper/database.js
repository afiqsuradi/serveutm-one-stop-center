const bcrypt = require("bcrypt");
const { User } = require("../../model/user");

async function createUserInDatabase(userData) {
  const newUser = new User(userData);
  newUser.password = await bcrypt.hash(
    newUser.password,
    Number(process.env.SALT_ROUND)
  );
  return newUser.save();
}

exports.createUserInDatabase = createUserInDatabase;
