require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("../../model/user");
const _ = require("lodash");

async function createUserInDatabase(userData) {
  const newUser = new User(userData);
  newUser.password = await bcrypt.hash(
    newUser.password,
    Number(process.env.SALT_ROUND)
  );
  return newUser.save();
}

function pickUserData(userData) {
  const pickedUser = _.pick(userData, [
    "name",
    "username",
    "email",
    "profileImage",
  ]);
  pickedUser.profileImage = `${req.protocol}://${req.get("host")}/${
    pickedUser.profileImage
  }`;
  pickedUser.dateJoined = user._id.getTimestamp();
  return pickedUser;
}

function pickProfileData(profileData) {
  const pickedProfile = _.pick(profileData, [
    "description",
    "language",
    "skills",
    "PersonalWebsite",
    "services",
  ]);
  return pickedProfile;
}

module.exports = { createUserInDatabase, pickUserData, pickProfileData };
