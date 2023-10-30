const PrivateMessageRoom = require("../model/chat");
const ObjectId = require("mongodb").ObjectId;
const { createNewRoom, getRoom } = require("./helper/chat");
const Order = require("../model/order");
const { User } = require("../model/user");
const { cloneDeep, set } = require("lodash");

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
    const baseUrl = `${req.protocol}://${req.get("host")}/`;
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
    const modifiedRoom = {
      _id: room._id,
      room_id: room.room_id,
      createdAt: room.createdAt,
      participants: room.participants,
      messages: [],
    };
    const messagePromises = room.messages.map(async (message) => {
      if (message.type === "order") {
        const aggregationPipeline = [
          {
            $match: {
              _id: new ObjectId(message.message),
            },
          },
          {
            $lookup: {
              from: "User",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $lookup: {
              from: "Services",
              localField: "service",
              foreignField: "_id",
              as: "service",
            },
          },
          {
            $unwind: {
              path: "$user",
            },
          },
          {
            $unwind: {
              path: "$service",
            },
          },
          {
            $project: {
              user: {
                name: 1,
                username: 1,
                profileImage: 1,
              },
              service: {
                title: 1,
                description: 1,
                category: 1,
                images: 1,
              },
              requirements: 1,
              paymentStatus: 1,
              fullfillmentStatus: 1,
              placed: 1,
              total: 1,
              package: 1,
              _id: 1,
              quantity: 1,
            },
          },
        ];
        return await Order.aggregate(aggregationPipeline);
      }
      return message;
    });
    let resolvedMessages = await Promise.all(messagePromises);
    resolvedMessages.forEach((msg) => {
      if (Array.isArray(msg)) {
        msg[0].user.profileImage = `${baseUrl}${msg[0].user.profileImage}`;
        msg[0].service.images = msg[0].service.images.map((img) => {
          return `${baseUrl}images/thumbnails/${img}`;
        });
      }
    });
    modifiedRoom.messages = room.messages.map((originalMessage, index) => {
      if (originalMessage.type === "order") {
        return {
          type: room.messages[index].type,
          sender: room.messages[index].sender,
          message: room.messages[index].message,
          timestamp: room.messages[index].timestamp,
          _id: room.messages[index]._id,
          order: resolvedMessages[index][0],
        };
      }
      return originalMessage;
    });
    return res.status(200).json(modifiedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = chatController;
