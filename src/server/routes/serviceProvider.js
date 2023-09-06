const router = require("express").Router();
const serviceProviderController = require("../controller/serviceProviderController");

router.post(
  "/register",
  require("../middleware/authenticateToken"),
  serviceProviderController.registerProvider
);
router.put(
  "/",
  require("../middleware/authenticateToken"),
  serviceProviderController.updateSellerInfo
);
router.get("/:username", serviceProviderController.getSellerByUsername);

module.exports = router;
