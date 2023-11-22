const router = require("express").Router();
const inquiryController = require("../controller/inquiryController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", inquiryController.getInquiries);
router.post("/", inquiryController.addInquiry);
router.delete("/:id", authenticateToken, inquiryController.deleteInquiry);
module.exports = router;
