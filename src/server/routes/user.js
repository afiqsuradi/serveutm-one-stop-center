const router = require("express").Router();
const { userController } = require("../controller/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", userController.validateAndCreateUser);
router.get("/:username", userController.getUserByUsername);

module.exports = router;
