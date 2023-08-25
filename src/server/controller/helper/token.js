const { VerificationToken } = require("../../model/verificationToken");
const { genToken } = require("../../utils/tokenGen");
const jwt = require("jsonwebtoken");
async function generateVerificationToken(userId) {
  const newToken = new VerificationToken({
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
    { expiresIn: "10s" }
  );
}

async function generateRefreshToken(user) {
  return jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    { expiresIn: "15s" }
  );
}

exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.generateVerificationToken = generateVerificationToken;
