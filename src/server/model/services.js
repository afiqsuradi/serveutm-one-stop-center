const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isApproved: {
    type: String,
    default: "Pending",
  },
  faq: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  pricePackage: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  images: [String],
  serviceRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
});
const Service = mongoose.model("Services", serviceSchema, "Services");
module.exports = Service;
