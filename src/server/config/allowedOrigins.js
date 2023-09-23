require("dotenv").config();
const allowedOrigins = [process.env.ORIGIN_URL, process.env.ADMIN_URL];
module.exports = allowedOrigins;
