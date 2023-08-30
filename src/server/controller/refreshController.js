require("dotenv").config();
const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./helper/token");

const refreshContoller = {};

refreshContoller.handleRefreshToken = async (req, res) => {
  // Get token from cookie
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie?.jwt;
  // Get user from refresh token
  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) return res.sendStatus(400);
  // Verify token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    async (err, decoded) => {
      if (err) return res.sendStatus(403);
      // Generate new access token
      const newAccessToken = await generateAccessToken(user);
      // Send new access token to user
      return res.json({
        accessToken: newAccessToken,
        username: user.username,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  );
};

module.exports = refreshContoller;
