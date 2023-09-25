const router = require("express").Router();
const inquiryController = require("../controller/inquiryController");

router.get("/", inquiryController.getInquiries);
router.post("/", inquiryController.addInquiry);
module.exports = router;
