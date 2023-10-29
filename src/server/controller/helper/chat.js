const uuid = require("uuid");
const PrivateMessageRoom = require("../../model/chat");
const { User } = require("../../model/user");

const getRoom = async (senderUsername, receiverUsername) => {
  try {
    const sender = await User.findOne({ username: senderUsername });
    const receiver = await User.findOne({ username: receiverUsername });
    if (!sender || !receiver) throw new Error("User not found");
    return await PrivateMessageRoom.findOne({
      $and: [
        { participants: { $elemMatch: { user: sender._id } } },
        { participants: { $elemMatch: { user: receiver._id } } },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const createNewRoom = async (senderUsername, receiverUsername) => {
  try {
    const sender = await User.findOne({ username: senderUsername });
    const receiver = await User.findOne({ username: receiverUsername });
    if (!sender || !receiver) throw new Error("User not found");
    const roomData = {
      room_id: uuid.v4(),
      createdAt: new Date(),
      participants: [
        {
          user: sender._id,
        },
        {
          user: receiver._id,
        },
      ],
    };
    const newRoom = new PrivateMessageRoom(roomData);
    return await newRoom.save();
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewRoom, getRoom };
