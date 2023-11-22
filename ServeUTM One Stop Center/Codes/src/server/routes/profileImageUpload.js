const router = require("express").Router();
const { userController } = require("../controller/userController");
const upload = require("../model/profileImage");

router.post("/", upload.single("image"), userController.uploadProfileImage);

module.exports = router;
