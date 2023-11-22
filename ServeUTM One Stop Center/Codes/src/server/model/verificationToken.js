const mongoose = require("mongoose");

const verificationTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
});

exports.VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema,
  "VerificationToken"
);
