require("dotenv").config();
const allowedOrigins = process.env.ORIGIN_URL.split(",");
module.exports = allowedOrigins;
