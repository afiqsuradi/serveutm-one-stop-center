require("dotenv").config();
const { User } = require("../model/user");
const { VerificationToken } = require("../model/verificationToken");
const { sendVerifyMail } = require("./helper/mail");
const { generateVerificationToken } = require("./helper/token");
const verifyController = {};

verifyController.verify = async (req, res) => {
  // get verification token from body
  const { token } = req.body;
  if (!token) return res.status(404).json({ message: "No token found" });
  // search for user with that param in verificationDb
  const tokenItem = await VerificationToken.findOne({ token: token });
  if (!tokenItem) return res.sendStatus(400).json({ message: "Invalid token" });
  // search for user in user db and update status
  const user = await User.findOneAndUpdate(
    { _id: tokenItem.owner },
    { isVerified: true },
    { new: true }
  );
  if (!user) return res.sendStatus(404);
  await VerificationToken.findByIdAndDelete(tokenItem._id);
  return res.status(202).json({ isVerified: `"${user.isVerified}"` });
};

verifyController.resend = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(400).json({ message: "Couldn't find user" });
    const existToken = await VerificationToken.findOne({ owner: user._id });
    if (existToken) {
      await VerificationToken.deleteOne({ owner: user._id });
    }
    const verifyToken = await generateVerificationToken(user._id);
    if (!verifyToken) return res.sendStatus(500);

    sendVerifyMail(user.email, verifyToken.token);
    return res.status(200).json({ message: "Successfully created new email." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = verifyController;
