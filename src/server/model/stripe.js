require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
module.exports = stripe;
