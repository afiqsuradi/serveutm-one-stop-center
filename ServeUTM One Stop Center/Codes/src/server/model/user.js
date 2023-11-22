require("dotenv").config();
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  profileImage: {
    type: String,
    default: "images/default.png",
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  username: {
    type: String,
    unique: true,
    validate: {
      validator: async function (value) {
        const existingUser = await this.constructor.findOne({
          username: value,
        });
        return !existingUser; // Return true if username is unique
      },
      message: "Username already exists. Please choose a different username.",
    },
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    minlength: 5,
    maxlength: 255,
    validate: {
      validator: async function (value) {
        const existingUser = await this.constructor.findOne({ email: value });
        return !existingUser; // Return true if email is unique
      },
      message:
        "Email address is already registered. Please use a different email.",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "service_provider", "admin"],
    default: "user",
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  pendingRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // Bad implementation, ik but im too lazy
  refreshToken: { type: String, default: "" },
});
const User = mongoose.model("User", userSchema, "User");

exports.User = User;
