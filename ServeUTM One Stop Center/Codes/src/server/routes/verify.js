const router = require("express").Router();
const verifyController = require("../controller/verifyController");

router.post("/confirm-email", verifyController.verify);
router.get("/resend", verifyController.resend);

module.exports = router;
