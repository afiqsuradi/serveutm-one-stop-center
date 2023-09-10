const mongoose = require("mongoose");

const passwordResetToken = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 1800 * 60,
    default: Date.now(),
  },
  token: { type: String, required: true },
});

exports.PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetToken,
  "PasswordResetToken"
);
