const router = require("express").Router();
const { userController } = require("../controller/user");

router.post("/", userController.validateAndCreateUser);

module.exports = router;
