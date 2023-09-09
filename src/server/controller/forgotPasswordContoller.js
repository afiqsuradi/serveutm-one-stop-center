const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const { generatePasswordResetToken } = require("./helper/token");
const { PasswordResetToken } = require("../model/passwordResetToken");
const { sendPasswordResetMail } = require("./helper/mail");

const forgotPasswordController = {};

forgotPasswordController.sendMail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(401)
      .json({ message: "No user found with correspond email." });
  // Check if user already requested for otp
  const prevToken = await PasswordResetToken.findOne({ owner: user._id });
  // If yes then delete previous one
  if (prevToken) await prevToken.deleteOne();
  // If found user then generate otp and save it to db
  const newToken = await generatePasswordResetToken(user._id);
  // Send OTP through email

  const userUrl = req.headers.origin;
  sendPasswordResetMail(email, userUrl, newToken.token);
  // Send 201 res to user
  return res.sendStatus(201);
};

forgotPasswordController.resetPass = async (req, res) => {
  const { token, password } = req.body;
  if (!token) return res.sendStatus(400);
  const resetToken = await PasswordResetToken.findOne({ token });
  if (!resetToken) return res.sendStatus(400);
  const user = await User.findOne({ _id: resetToken.owner });
  user.password = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
  const result = await user.save();
  const deleteResult = await PasswordResetToken.findByIdAndDelete(
    resetToken._id
  );
  if (!result || !deleteResult) return res.sendStatus(500);
  return res.sendStatus(202);
};

forgotPasswordController.isValid = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(400);
  const resetToken = await PasswordResetToken.findOne({ token });
  if (!resetToken) return res.sendStatus(400);
  return res.sendStatus(200);
};

module.exports = forgotPasswordController;
