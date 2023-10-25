require("dotenv").config();
const express = require("express");
const corsOptions = require("../config/corsOptions");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
module.exports = function (app) {
  app.use(cors(corsOptions));
  app.use("/api/webhook", require("../routes/webhook"));
  app.use("/images", express.static("images"));
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use("/api/inquiry", require("../routes/inquiry"));
  app.use("/api/user", require("../routes/user"));
  app.use("/api/auth", require("../routes/auth"));
  app.use("/api/services", require("../routes/services"));
  app.use("/api/refresh", require("../routes/refresh"));
  app.use("/api/forgot-password", require("../routes/forgotPassword"));
  app.use("/logout", require("../routes/logout"));
  app.use("/api/service-provider", require("../routes/serviceProvider"));
  app.use(require("../middleware/authenticateToken"));
  app.use("/api/checkout", require("../routes/checkout"));
  app.use("/api/profile-image/upload", require("../routes/profileImageUpload"));
  app.use("/api/verify", require("../routes/verify"));
};
