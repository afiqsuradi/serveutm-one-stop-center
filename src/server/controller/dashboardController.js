const Service = require("../model/services");
const { User } = require("../model/user");
const { cloneDeep } = require("lodash");
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
          order.paymentStatus === "Success" &&
          order.fullfillmentStatus === "Canceled"
      );

      if (active.length > 0) {
        active.forEach((order) => {
          const clonedUser = cloneDeep(order.user);
          clonedUser.profileImage = `${baseUrl}${clonedUser.profileImage}`;
          order.user = clonedUser;
          const clonedService = cloneDeep(order.service);
          clonedService.images = clonedService.images.map(
            (image) => `${baseUrl}images/thumbnails/${image}`
          );
          order.service = clonedService;
        });
      }

      return res.status(200).json({
        total_revenue: revenue,
        sales: sales.length,
        active: active.length,
        canceled: canceled.length,
        recent: active,
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

module.exports = dashboardController;
