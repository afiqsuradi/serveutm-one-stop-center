const express = require("express");
const helmet = require("helmet");
const user = require("../routes/user");
module.exports = function (app) {
  app.use(helmet());
  app.use(express.json());
  app.use("/api/user", user);
};
