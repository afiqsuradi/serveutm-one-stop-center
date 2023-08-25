const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
module.exports = function (app) {
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api/user", require("../routes/user"));
  app.use("/api/auth", require("../routes/auth"));
};
