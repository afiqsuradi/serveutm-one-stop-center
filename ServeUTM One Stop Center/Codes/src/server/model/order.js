const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  stripeId: {
    type: String,
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  package: {
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
  quantity: {
    type: Number,
    required: true,
  },
  placed: {
    type: Date,
    required: true,
  },
  serviceOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  requirements: {
    type: String,
    required: false,
  },
  fullfillmentStatus: {
    type: String,
    enum: ["Completed", "In Progress", "Canceled"],
    default: "In Progress",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Success", "Refunded"],
    default: "Pending",
  },
});

const Order = mongoose.model("Orders", orderSchema, "Orders");
module.exports = Order;
