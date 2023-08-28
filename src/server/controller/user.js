const { User } = require("../model/user");
const { validateUserInput } = require("./helper/validation");
const { createUserInDatabase } = require("./helper/database");
const jwtCookie = require("./helper/cookie");
const { generateVerificationToken } = require("./helper/token");
const { generateAccessToken, generateRefreshToken } = require("./helper/token");
const { sendVerifyMail } = require("./helper/mail");

const userController = {};

userController.validateAndCreateUser = async (req, res) => {
  try {
    const { success, data, error } = await validateUserInput(req.body);

    if (!success) {
      return res.status(400).send(error);
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
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
    const userUrl = req.query.baseUrl;
    const newUser = await createUserInDatabase(data);
    const token = await generateVerificationToken(newUser._id);

    sendVerifyMail(newUser.email, userUrl, token.token);
    return res.status(200).json({
      accessToken,
      username: newUser.username,
      role: newUser.role,
      isVerified: newUser.isVerified,
    });
  } catch (error) {
    return res.status(500).json({ message: `"${error.message}"` });
  }
};

module.exports.userController = userController;
