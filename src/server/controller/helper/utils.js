const ObjectId = require("mongodb").ObjectId;
const Order = require("../../model/order");

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

const getMonthlyRevenue = async (year) => {
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

module.exports = { idToDate, getMonthlyRevenue };
