require("dotenv").config();
const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./helper/token");
const authController = {};

authController.handleLogin = async (req, res) => {
  // check user and password
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "username and password are required" });
  // check if user exists
  const user = await User.findOne({ username });
  if (!user)
    return res.status(401).json({ message: "User or password is incorrect" });
  // Evaluate password
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "User or password is incorrect" });
  // Create token if true
  //generate access token
  const accessToken = await generateAccessToken(user);
  //generate refresh token
  const newRefreshToken = await generateRefreshToken(user);
  //send refresh token to cookie with httpOnly
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  //send access token
  return res.json({ accessToken });
};

module.exports = authController;
