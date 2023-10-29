require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const { Server } = require("socket.io");
const corsOption = require("./config/corsOptions");
const cors = require("cors");

// Startup
require("./startup/db")();

// Add Middleware
require("./startup/routes")(app);

const privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY, "utf8");
const certificate = fs.readFileSync(
  process.env.SSL_PRIVATE_CERTIFICATE,
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
};

const httpsServer = https.createServer(credentials, app);

const io = new Server(httpsServer, {
  cors: {
    origin: process.env.ORIGIN_URL,
  },
});

io.on("connection", (socket) => {
  require("./controller/chatSocketController.js")(io, socket);
});

httpsServer.listen(process.env.PORT, () => {
  console.log(`Started app on port ${process.env.PORT}`);
});
