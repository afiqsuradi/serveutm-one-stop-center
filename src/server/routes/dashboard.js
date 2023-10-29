const router = require("express").Router();
const dashboardController = require("../controller/dashboardController");

router.get(
  "/service-provider/stats",
  dashboardController.getServiceProviderStats
);
module.exports = router;
