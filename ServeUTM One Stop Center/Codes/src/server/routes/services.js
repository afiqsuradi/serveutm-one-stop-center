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
router.put(
  "/",
  authenticateToken,
  upload.array("images"),
  serviceController.updateService
);
router.put(
  "/approval",
  authenticateToken,
  serviceController.updateServiceApproval
);
router.get(
  "/",
  serviceController.getServicesByUsername,
  serviceController.getServices
);
router.get("/:id", serviceController.getService);
router.delete("/:username", authenticateToken, serviceController.deleteService);
module.exports = router;
