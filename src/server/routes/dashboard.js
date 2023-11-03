const router = require("express").Router();
const dashboardController = require("../controller/dashboardController");

router.get(
  "/service-provider/stats",
  dashboardController.getServiceProviderStats
);

router.get("/user/stats", dashboardController.getUserStats);
router.get("/admin/stats", dashboardController.getAdminStats);
module.exports = router;
