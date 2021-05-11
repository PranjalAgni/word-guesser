const logger = require("../logger");

const connectionListener = (io) => {
  io.on("connection", (socket) => {
    logger.info(`User with socketid = ${socket.id} connected`);
  });
};

module.exports = connectionListener;
