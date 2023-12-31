require("dotenv").config();
const { User } = require("../model/user");
const { validateUserInput } = require("./helper/validation");
const { createUserInDatabase } = require("./helper/database");
const jwtCookie = require("./helper/cookie");
const { generateVerificationToken } = require("./helper/token");
const { generateAccessToken, generateRefreshToken } = require("./helper/token");
const { sendVerifyMail } = require("./helper/mail");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const userController = {};

userController.validateAndCreateUser = async (req, res) => {
  try {
    const { success, data, error } = await validateUserInput(req.body);

    if (!success) {
      return res.status(400).json({ message: `"${error.issues.message}"` });
    }

    //generate access token
    const accessToken = await generateAccessToken(data);
    //generate refresh token
    const newRefreshToken = await generateRefreshToken(data);
    //send refresh token to cookie with httpOnly
    res.cookie(jwtCookie.name, newRefreshToken, {
      ...jwtCookie.properties,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Add refresh token to user data
    data.refreshToken = newRefreshToken;
    const userUrl = process.env.ORIGIN_URL;
    const newUser = await createUserInDatabase(data);
    const token = await generateVerificationToken(newUser._id);

    sendVerifyMail(newUser.email, token.token);
    return res.status(200).json({
      accessToken,
      profileImage: `${req.protocol}://${req.get("host")}/${
        newUser.profileImage
      }`,
      username: newUser.username,
      role: newUser.role,
      isVerified: newUser.isVerified,
    });
  } catch (error) {
    // Check if it's a Mongoose validation error with custom message
    if (error.name === "ValidationError" && error.errors) {
      const validationErrors = {};
      let message = ``;
      // Loop through the validation errors and extract custom messages
      for (const key in error.errors) {
        if (error.errors[key].message) {
          message += error.errors[key].message + `\n`;
        }
      }

      return res.status(400).json({ message });
    }
    return res.status(500).json({ message: `"${error.message}"` });
  }
};

userController.getUserByUsername = async (req, res) => {
  const username = req.params.username;
  if (!username) return res.sendStatus(400);
  const user = await User.findOne({ username });
  if (!user)
    return res
      .status(400)
      .json({ message: `User with username ${username} not found` });
  const userData = _.pick(user, [
    "name",
    "username",
    "email",
    "profileImage",
    "role",
  ]);
  (userData.profileImage = `${req.protocol}://${req.get("host")}/${
    userData.profileImage
  }`),
    (userData.dateJoined = user._id.getTimestamp());
  return res.status(200).send(userData);
};

userController.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter criteria
    const filter = {};
    if (req.query.textInput && req.query.type) {
      filter[req.query.type] = new RegExp(`.*${req.query.textInput}.*`);
    }
    if (req.query.role && req.query.role !== "Role") {
      filter.role = req.query.role;
    }

    // Count total documents
    const count = await User.countDocuments(filter);

    // Find paginated documents
    const users = await User.find(
      filter,
      "name username email role profileImage"
    )
      .skip(skip)
      .limit(limit);

    users.forEach((user) => {
      user.profileImage = `${req.protocol}://${req.get("host")}/${
        user.profileImage
      }`;
    });

    res.json({
      count,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userController.uploadProfileImage = async (req, res) => {
  const target = req.query.user ? req.query.user : req.user.username;
  // If its another user then check if its admin
  if (req.query.user && !(req.user.role === "admin"))
    return res.status(403).json({ message: "Access Denied." });
  if (!target) return res.sendStatus(400);
  const user = await User.findOne({ username: target });
  if (!user) return res.status(404).json({ message: "User not found" });
  const imagePath = `${req.file.destination + req.file.filename}`;
  const imageLink = `${req.protocol}://${req.get("host")}/${imagePath}`;
  user.profileImage = imagePath;
  const result = await user.save({ validateModifiedOnly: true });
  if (!result) return res.sendStatus(500);
  return res.status(200).json({ profileImage: imageLink });
};

userController.updateUser = async (req, res) => {
  const { name, username: newUsername, email } = req.body;
  if (!name || !newUsername || !email)
    return res
      .status(400)
      .json({ message: "Name, username and email required!" });
  const target = req.query.user ? req.query.user : req.user.username;
  // If its another user then check if its admin
  if (req.params.user && !(req.user.role === "admin"))
    return res.status(403).json({ message: "Access Denied." });
  if (!target) return res.sendStatus(400);
  try {
    const user = await User.findOne({ username: target });
    user.name = name;
    user.username = newUsername;
    user.email = email;
    const result = await user.save({ validateModifiedOnly: true });
    if (!result) res.status(500).json({ message: "Something went wrong!" });
    return res.sendStatus(201);
  } catch (error) {
    // Check if it's a Mongoose validation error with custom message
    if (error.name === "ValidationError" && error.errors) {
      const validationErrors = {};
      let message = ``;
      // Loop through the validation errors and extract custom messages
      for (const key in error.errors) {
        if (error.errors[key].message) {
          message += error.errors[key].message + `\n`;
        }
      }

      return res.status(400).json({ message });
    }
    return res.status(500).json({ message: `"${error.message}"` });
  }
};
userController.updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  //fk the validation process
  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: "New password is required!" });
  const { username } = req.user;
  if (!username) return res.sendStatus(400);
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found!" });
  // check if password is the same as old one
  bcrypt.compare(currentPassword, user.password, async function (err, result) {
    // result == true
    if (result) {
      user.password = await bcrypt.hash(
        newPassword,
        Number(process.env.SALT_ROUND)
      );
      const saveResult = await user.save({ validateModifiedOnly: true });
      if (!saveResult)
        res.status(500).json({ message: "Something went wrong!" });
      return res.sendStatus(201);
    }
    //if not then f off
    return res.status(401).json({ message: "Invalid Password!" });
  });
};

userController.deleteUser = async (req, res) => {
  try {
    // Validate user role
    if (req.user.role !== "admin") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    // Find user by username
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.deleteOne();
    res.status(200).send({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.userController = userController;
