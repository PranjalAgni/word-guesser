const socketIO = require("socket.io");
const { connectionListener } = require("./listeners");

const initalizeSocket = (server) => {
  const io = socketIO(server);
  connectionListener(io);
};

module.exports = initalizeSocket;
