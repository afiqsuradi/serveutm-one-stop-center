const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  description: { type: String, minlength: 30, maxlength: 600, required: true },
  language: [
    {
      name: {
        type: String,
        required: true,
        minlength: 4, // Minimum 4 characters
        maxlength: 30, // Maximum 30 characters
      },
      level: {
        type: String,
        enum: ["Basic", "Fluent", "Native"],
        required: true,
      },
    },
  ],
  skills: [
    {
      name: {
        type: String,
        required: true,
        minlength: 4, // Minimum 4 characters
        maxlength: 30, // Maximum 30 characters
      },
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Expert"],
        required: true,
      },
    },
  ],
  PersonalWebsite: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
