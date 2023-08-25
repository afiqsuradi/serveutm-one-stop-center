const express = require("express");
const helmet = require("helmet");
exports = function (app) {
  app.use(helmet());
  app.use(express.json());
};
