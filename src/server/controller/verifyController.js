const { User } = require("../model/user");
const { VerificationToken } = require("../model/verificationToken");

module.exports = async (req, res) => {
  // get verification token from body
  const { token } = req.body;
  // search for user with that param in verificationDb
  const tokenItem = await VerificationToken.findOne({ token: token });
  if (!tokenItem) return res.sendStatus(400);
  // search for user in user db and update status
  const user = await User.findOneAndUpdate(
    { _id: tokenItem.owner },
    { isVerified: true },
    { new: true }
  );
  await VerificationToken.findByIdAndDelete(tokenItem._id);
  return res.status(202).json({ isVerified: `"${user.isVerified}"` });
};
