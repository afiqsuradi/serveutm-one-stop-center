const { User } = require("../model/user");
const Order = require("../model/order");
const { idToDate } = require("./helper/utils");

const ordersController = {};

ordersController.getOrders = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/`;
    const target = req.query.user ? req.query.user : req.user.username;
    // If its another user then check if its admin
    if (req.query.user && !(req.user.role === "admin"))
      return res.status(403).json({ message: "Access Denied." });
    if (!target) return res.sendStatus(400);
    const user = await User.findOne({ username: target });
    if (!user) return res.status(404).json({ message: "User not found" });
    const filters = {};
    filters.fullfillmentStatus = new RegExp(
      `.*${req.query.fullfillmentStatus}.*`
    );
    filters.user = user._id;
    const aggregationPipeline = [
      {
        $match: filters,
      },
      {
        $lookup: {
          from: "User",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "Services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $unwind: {
          path: "$service",
        },
      },
      {
        $project: {
          user: {
            name: 1,
            username: 1,
            profileImage: 1,
          },
          service: {
            title: 1,
            description: 1,
            category: 1,
            images: 1,
          },
          requirements: 1,
          paymentStatus: 1,
          fullfillmentStatus: 1,
          package: 1,
          _id: 1,
          quantity: 1,
        },
      },
    ];
    const orders = await Order.aggregate(aggregationPipeline);
    let modifiedOrders = [];
    if (orders) {
      modifiedOrders = orders.map((order) => {
        order.placed = idToDate(order._id);
        order.service.images = order.service.images.map((url) => {
          return `${baseUrl}images/thumbnails/${url}`;
        });
        return order;
      });
    }
    return res.status(200).json({
      count: orders ? orders.length : 0,
      data: modifiedOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

ordersController.rejectOrder = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Order id required" });
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) return res.status(404).json({ message: "Order not found!" });
    order.fullfillmentStatus = "Canceled";
    order.paymentStatus = "Refunded";
    const result = await order.save({ validateModifiedOnly: true });
    if (!result)
      return res.status(400).json({ message: "Failed to save data" });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = ordersController;
