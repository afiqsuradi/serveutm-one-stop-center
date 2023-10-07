const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const serviceController = require("../controller/servicesController");
const upload = require("../model/uploadThumbnail");

router.post(
  "/",
  authenticateToken,
  upload.array("images"),
  serviceController.createService
);
router.get("/", serviceController.getServices);
module.exports = router;
