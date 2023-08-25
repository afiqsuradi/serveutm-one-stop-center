require("dotenv").config();
const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  if (!user) return res.status(401);
  // Evaluate password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401);
  // Create token if true
  //generate access token
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.username,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    { expiresIn: "10s" }
  );
  //generate refresh token
  const newRefreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    { expiresIn: "15s" }
  );
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
