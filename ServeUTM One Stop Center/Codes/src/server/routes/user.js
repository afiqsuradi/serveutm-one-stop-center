const router = require("express").Router();
const { userController } = require("../controller/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", userController.validateAndCreateUser);
router.get("/", userController.getUsers);
router.get("/:username", userController.getUserByUsername);
router.delete("/:username", authenticateToken, userController.deleteUser);
router.put("/", authenticateToken, userController.updateUser);
router.put("/password", authenticateToken, userController.updateUserPassword);

module.exports = router;
