const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
module.exports = function (app) {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api/user", require("../routes/user"));
  app.use("/api/auth", require("../routes/auth"));
  app.use("/api/refresh", require("../routes/refresh"));
  app.use("/api/forgot-password", require("../routes/forgotPassword"));
  app.use("/logout", require("../routes/logout"));
  app.use(require("../middleware/authenticateToken"));
  app.use("/api/verify-email", require("../controller/verifyController"));
};
