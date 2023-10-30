const ordersController = require("../controller/ordersController");

const router = require("express").Router();

router.get("/", ordersController.getOrders);
router.post("/reject", ordersController.rejectOrder);
router.post("/approve", ordersController.markAsDoneOrder);

module.exports = router;
