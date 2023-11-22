const ObjectId = require("mongodb").ObjectId;
const Order = require("../../model/order");
const Service = require("../../model/services");
const { User } = require("../../model/user");
const { cloneDeep } = require("lodash");

const idToDate = (objectId) => {
  // Get the timestamp from the ObjectId
  const timestamp = new ObjectId(objectId).getTimestamp();

  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Create a formatter for the date
  const formatter = new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format the date
  const formattedDate = formatter.format(date);

  // Return the formatted date
  return formattedDate;
};

const getMonthlyRevenue = async (year, ownerId) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const orders = await Order.find({
    fullfillmentStatus: "Completed",
    paymentStatus: "Success",
    placed: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    },
    serviceOwner: ownerId,
  });
  const monthlyRevenue = [];

  for (let month = 1; month <= 12; month++) {
    const ordersInMonth = orders.filter(
      (order) => order.placed.getMonth() === month - 1
    );
    const totalRevenueInMonth = ordersInMonth.reduce(
      (total, order) => total + order.total,
      0
    );

    monthlyRevenue.push({
      name: months[month - 1],
      total: totalRevenueInMonth,
    });
  }

  return monthlyRevenue;
};

const getMonthlyUser = async (year) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const users = await User.find({
    isVerified: true,
    createdAt: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    },
  });
  const monthlyUsers = [];

  for (let month = 1; month <= 12; month++) {
    const usersInMonth = users.filter(
      (user) => user.createdAt.getMonth() === month - 1
    );

    monthlyUsers.push({
      name: months[month - 1],
      total: usersInMonth.length,
    });
  }

  return monthlyUsers;
};

const getMonthlyServices = async (year) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const services = await Service.find({
    isApproved: "Approved",
    createdAt: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    },
  });
  const monthlyServices = [];

  for (let month = 1; month <= 12; month++) {
    const servicesInMonth = services.filter(
      (service) => service.createdAt.getMonth() === month - 1
    );

    monthlyServices.push({
      name: months[month - 1],
      total: servicesInMonth.length,
    });
  }

  return monthlyServices;
};

const getStartAndEndOfMonth = (date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return {
    start: startOfMonth,
    end: endOfMonth,
  };
};

const getNewUsersForMonth = async () => {
  const currentDate = new Date();
  const users = await User.find({
    createdAt: {
      $gte: getStartAndEndOfMonth(currentDate).start,
      $lt: getStartAndEndOfMonth(currentDate).end,
    },
  });

  return users;
};

const getNewServicesForMonth = async () => {
  const currentDate = new Date();
  const services = await Service.find({
    createdAt: {
      $gte: getStartAndEndOfMonth(currentDate).start,
      $lt: getStartAndEndOfMonth(currentDate).end,
    },
  });
  return services;
};

const getNewOrdersForMonth = async () => {
  const currentDate = new Date();
  const orders = await Order.find({
    placed: {
      $gte: getStartAndEndOfMonth(currentDate).start,
      $lt: getStartAndEndOfMonth(currentDate).end,
    },
  });
  return orders;
};

const getUnverifiedUsers = async (baseUrl) => {
  const users = await User.find({ isVerified: false });
  const clonedUsers = [];
  users.forEach((user) => {
    const clonedUser = cloneDeep(user);
    clonedUser.profileImage = `${baseUrl}${user.profileImage}`;
    clonedUsers.push(clonedUser);
  });
  return clonedUsers;
};

module.exports = {
  idToDate,
  getMonthlyRevenue,
  getNewUsersForMonth,
  getNewServicesForMonth,
  getNewOrdersForMonth,
  getMonthlyServices,
  getMonthlyUser,
};
