const ordersController = require("../controller/ordersController");

const router = require("express").Router();

router.get("/", ordersController.getOrders);

module.exports = router;
