const { VerificationToken } = require("../../model/verificationToken");
const { genToken } = require("../../utils/tokenGen");

async function generateVerificationToken(userId) {
  const newToken = new VerificationToken({
    owner: userId,
    token: genToken(),
  });
  await newToken.save();
}

exports.generateVerificationToken = generateVerificationToken;
