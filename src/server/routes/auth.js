const router = require("express").Router();
const authController = require("../controller/authController");

router.post("/", authController.handleLogin);

module.exports = router;
