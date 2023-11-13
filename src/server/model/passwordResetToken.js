const mongoose = require("mongoose");

const passwordResetToken = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
});

exports.PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetToken,
  "PasswordResetToken"
);
