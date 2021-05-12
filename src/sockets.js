const socketIO = require("socket.io");
const gameListeners = require("./listeners");

const initalizeSocket = (server) => {
  const io = socketIO(server);
  gameListeners(io);
};

module.exports = initalizeSocket;
