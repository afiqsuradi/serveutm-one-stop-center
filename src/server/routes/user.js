const router = require("express").Router();
const { userController } = require("../controller/user");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", userController.validateAndCreateUser);

module.exports = router;
