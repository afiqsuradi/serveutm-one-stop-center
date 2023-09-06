const router = require("express").Router();
const refreshContoller = require("../controller/refreshController");

router.get("/", refreshContoller.handleRefreshToken);

module.exports = router;
