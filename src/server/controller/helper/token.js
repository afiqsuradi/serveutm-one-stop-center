const { VerificationToken } = require("../../model/verificationToken");
const { PasswordResetToken } = require("../model/passwordResetToken");
const genToken = require("../../utils/tokenGen");
const jwt = require("jsonwebtoken");
async function generateVerificationToken(userId) {
  const newToken = new VerificationToken({
    owner: userId,
    token: genToken(),
  });
  return await newToken.save();
}

async function generatePasswordResetToken(userId) {
  const newToken = new PasswordResetToken({
    owner: userId,
    token: genToken(),
  });
  return await newToken.save();
}

async function generateAccessToken(user) {
  return jwt.sign(
    {
      UserInfo: {
        username: user.username,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    { expiresIn: "15m" }
  );
}

async function generateRefreshToken(user) {
  return jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    { expiresIn: "1d" }
  );
}
// exports.generateAccessToken = generateAccessToken;
// exports.generateRefreshToken = generateRefreshToken;
// exports.generateVerificationToken = generateVerificationToken;
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  generatePasswordResetToken,
};
