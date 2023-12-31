const router = require("express").Router();
const forgotPasswordController = require("../controller/forgotPasswordContoller");

router.post("/", forgotPasswordController.sendMail);
router.post("/reset-status", forgotPasswordController.isValid);
router.post("/reset", forgotPasswordController.resetPass);

module.exports = router;
