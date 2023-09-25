require("dotenv").config();
const mongoose = require("mongoose");
const inquirySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    minlength: 5,
    maxlength: 255,
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});
const Inquiry = mongoose.model("User", inquirySchema, "User");

exports.Inquiry = Inquiry;
