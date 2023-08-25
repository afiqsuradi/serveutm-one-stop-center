const router = require("express").Router();
const authController = require("../controller/auth");

router.post("/", authController.handleLogin);

module.exports = router;
