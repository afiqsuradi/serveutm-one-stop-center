const router = require("express").Router();
const logoutController = require("../controller/logout");

router.get("/", logoutController.handleLogout);

module.exports = router;
