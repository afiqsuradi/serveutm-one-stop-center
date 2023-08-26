const router = require("express").Router();
const refreshContoller = require("../controller/refresh");

router.get("/", refreshContoller.handleRefreshToken);

module.exports = router;
