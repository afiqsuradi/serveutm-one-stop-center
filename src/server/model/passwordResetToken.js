const mongoose = require("mongoose");

const passwordResetToken = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 1800,
    default: Date.now(),
  },
  token: { type: Number, length: 6, required: true },
});

exports.PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetToken,
  "PasswordResetToken"
);
