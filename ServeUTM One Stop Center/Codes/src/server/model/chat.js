const mongoose = require("mongoose");

const privateMessageRoomSchema = new mongoose.Schema({
  room_id: String,
  createdAt: Date,
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  messages: [
    {
      type: {
        type: String,
        enum: ["message", "image", "order"],
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: String,
      timestamp: Date,
    },
  ],
});

const PrivateMessageRoom = mongoose.model(
  "PrivateMessageRoom",
  privateMessageRoomSchema
);

module.exports = PrivateMessageRoom;
