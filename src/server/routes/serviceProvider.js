const router = require("express").Router();
const serviceProviderController = require("../controller/serviceProviderController");

router.post("/register", serviceProviderController.registerProvider);

module.exports = router;
