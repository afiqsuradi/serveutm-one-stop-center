const router = require("express").Router();
const checkoutController = require("../controller/checkoutController");

router.post("/", checkoutController.createSession);
router.get("/", checkoutController.getSessionStatus);

module.exports = router;
