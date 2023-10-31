const Service = require("../model/services");
const { User } = require("../model/user");
const { cloneDeep } = require("lodash");
const { idToDate, getMonthlyRevenue } = require("./helper/utils");
const _ = require("lodash");
const Order = require("../model/order");

const dashboardController = {};

dashboardController.getServiceProviderStats = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/`;
    const user = await User.findOne({ username: req.user.username });
    const services = await Service.find({ owner: user._id }).populate({
      path: "serviceRequest",
      populate: [
        {
          path: "user",
          select: "name username profileImage",
        },
        {
          path: "service",
          select: "title description category images",
        },
      ],
    });
    if (services) {
      const orders = [];
      services.forEach((service) => {
        if (service.serviceRequest.length > 0) {
          service.serviceRequest.forEach((order) => {
            orders.push(order);
          });
        }
      });
      const revenue = orders
        .filter(
          (order) =>
            order.paymentStatus === "Success" &&
            order.fullfillmentStatus === "Completed"
        )
        .reduce((acc, curr) => (acc += curr.total), 0);
      const sales = orders.filter(
        (order) =>
          order.paymentStatus === "Success" &&
          order.fullfillmentStatus !== "Canceled"
      );
      let active = orders.filter(
        (order) =>
          order.paymentStatus === "Success" &&
          order.fullfillmentStatus === "In Progress"
      );
      const canceled = orders.filter(
        (order) =>
          order.paymentStatus === "Refunded" &&
          order.fullfillmentStatus === "Canceled"
      );

      if (active.length > 0) {
        active.forEach((order) => {
          _.set(order, "placed", idToDate(order._id));
        });
        active = active.map((order) => {
          const clonedOrder = cloneDeep(order);
          const clonedUser = cloneDeep(order.user);
          const clonedService = cloneDeep(order.service);
          clonedUser.profileImage = `${baseUrl}${clonedUser.profileImage}`;
          clonedOrder.user = clonedUser;
          clonedService.images = clonedService.images.map(
            (image) => `${baseUrl}images/thumbnails/${image}`
          );
          clonedOrder.service = clonedService;
          return clonedOrder;
        });
      }
      const monthlyRevenue = await getMonthlyRevenue(
        new Date().getFullYear(),
        user._id
      );

      return res.status(200).json({
        total_revenue: revenue,
        sales: sales.length,
        active: active.length,
        canceled: canceled.length,
        recent: active,
        monthlyRevenue,
      });
    }
    return res.status(200).json({
      total_revenue: 0,
      sales: 0,
      active: 0,
      canceled: 0,
      recent: [],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

dashboardController.getUserStats = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const orders = await Order.find({
      user: user._id,
    });
    if (orders) {
      const completed = orders.filter(
        (order) =>
          order.paymentStatus === "Success" &&
          order.fullfillmentStatus === "Completed"
      );
      const expenditures = completed.reduce(
        (acc, curr) => (acc += curr.total),
        0
      );
      let active = orders.filter(
        (order) =>
          order.paymentStatus === "Success" &&
          order.fullfillmentStatus === "In Progress"
      );
      const canceled = orders.filter(
        (order) =>
          order.paymentStatus === "Refunded" &&
          order.fullfillmentStatus === "Canceled"
      );
      return res.status(200).json({
        expenditures,
        completed: completed.length,
        active: active.length,
        canceled: canceled.length,
      });
    }
    return res.status(200).json({
      expenditures: 0,
      completed: 0,
      active: 0,
      canceled: 0,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = dashboardController;
