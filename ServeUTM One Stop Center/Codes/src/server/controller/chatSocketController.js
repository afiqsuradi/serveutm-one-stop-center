const PrivateMessageRoom = require("../model/chat");
const { User } = require("../model/user");
// {
//   header: {
//     room_id,
//     sender: Auth.username,
//   },
//   data: {
//     message: textInput.current.value,
//     type: "message",
//   },
// }
module.exports = function (io, socket) {
  socket.on("message", async (data) => {
    const sender = await User.findOne({ username: data.header.sender });
    const room = await PrivateMessageRoom.findOne({
      room_id: data.header.room_id,
    });
    room.messages = [
      ...room.messages,
      {
        type: data.data.type,
        sender: sender._id,
        message: data.data.message,
        timestamp: new Date(),
      },
    ];
    await room.save({ validateModifiedOnly: true });
    io.to(data.header.room_id).emit("message", {
      type: data.data.type,
      sender: sender._id,
      message: data.data.message,
      timestamp: new Date(),
    });
  });

  socket.on("join", async ({ room_id, user }) => {
    socket.join(room_id);
  });

  socket.on("leave", async (id) => {
    socket.leave(id);
  });

  socket.on("activity", (data) => {
    socket.broadcast.to(data.room_id).emit("activity", data.username);
  });
};
