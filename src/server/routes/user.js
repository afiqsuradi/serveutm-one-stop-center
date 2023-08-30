const router = require("express").Router();
const { userController } = require("../controller/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", userController.validateAndCreateUser);

module.exports = router;
