const ordersController = require("../controller/ordersController");

const router = require("express").Router();

router.get("/", ordersController.getOrders);
router.post("/reject", ordersController.rejectOrder);

module.exports = router;
