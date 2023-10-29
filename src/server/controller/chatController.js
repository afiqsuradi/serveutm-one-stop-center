const PrivateMessageRoom = require("../model/chat");
const { createNewRoom, getRoom } = require("./helper/chat");
const { User } = require("../model/user");

const chatController = {};

chatController.getAllPrivateRooms = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found!" });
    const room = await PrivateMessageRoom.find({
      participants: { $elemMatch: { user: user._id } },
    }).populate({
      path: "participants.user",
      model: "User",
      select: ["profileImage", "name", "username"],
    });
    if (!room) return res.status(200).json({ count: 0 });
    room.forEach((roomData) => {
      roomData.participants.forEach((participator) => {
        participator.user.profileImage = `${req.protocol}://${req.get(
          "host"
        )}/${participator.user.profileImage}`;
      });
    });
    return res.status(200).json({ count: room.length, data: room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

chatController.getPrivateMessageRoom = async (req, res) => {
  try {
    if (req.user.username === req.query.receiver)
      return res
        .status(400)
        .json({ message: "Sender and receiver cant be the same user" });

    let room = await getRoom(req.user.username, req.query.receiver);
    if (!room) {
      room = await createNewRoom(req.user.username, req.query.receiver);
    }

    if (room) {
      return res.status(200).json({ room_id: room.room_id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

chatController.getRoom = async (req, res) => {
  try {
    const room_id = req.params.id;
    if (!room_id) return res.status(400).json({ message: "Please provide id" });
    const room = await PrivateMessageRoom.findOne({ room_id }).populate({
      path: "participants.user",
      model: "User",
      select: ["profileImage", "name", "username"],
    });
    if (!room) return res.status(404).json({ message: "Room not found" });
    room.participants.forEach((participator) => {
      participator.user.profileImage = `${req.protocol}://${req.get("host")}/${
        participator.user.profileImage
      }`;
    });
    return res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = chatController;
