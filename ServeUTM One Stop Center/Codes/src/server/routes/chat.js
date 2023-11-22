const router = require("express").Router();
const chatController = require("../controller/chatController.js");

router.get("/rooms", chatController.getAllPrivateRooms);
router.get("/room", chatController.getPrivateMessageRoom);
router.get("/room/:id", chatController.getRoom);

module.exports = router;
