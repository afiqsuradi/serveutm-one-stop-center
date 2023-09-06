const mongoose = require("mongoose");
const conn = mongoose.connection;

module.exports = async () => {
  conn.on("error", (err) => console.log("Can't connect to database"));
  conn.once("open", () => console.log("Connected to database"));
  return await mongoose.connect(process.env.DB_URL);
};
