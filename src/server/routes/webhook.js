const router = require("express").Router();
const checkoutController = require("../controller/checkoutController");
const bodyParser = require("body-parser");

router.post(
  "/stripe",
  bodyParser.raw({ type: "application/json" }),
  checkoutController.handlePaymentWebhook
);

module.exports = router;
