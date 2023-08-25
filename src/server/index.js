require("dotenv").config();
const express = require("express");
const app = express();

// Startup
require("./startup/db")();

app.listen(process.env.PORT, () =>
  console.log(`Started app on port ${process.env.PORT}`)
);
