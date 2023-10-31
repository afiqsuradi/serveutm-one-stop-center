const router = require("express").Router();
const dashboardController = require("../controller/dashboardController");

router.get(
  "/service-provider/stats",
  dashboardController.getServiceProviderStats
);

router.get("/user/stats", dashboardController.getUserStats);
module.exports = router;
