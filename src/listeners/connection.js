const logger = require("../logger");
const gameListener = require("./game");
const teamListener = require("./team");
const playerListener = require("./player");
const eventEmitter = require("../events");
const gameState = require("../state");

const connectionListener = (io) => {
  eventEmitter.on("emit-game-state", () => {
    io.emit("game-state", gameState.getState());
  });

  io.on("connection", (socket) => {
    logger.info(`User with socketid = ${socket.id} connected`);
    eventEmitter.emit("emit-game-state");
    gameListener(socket);
    teamListener(socket);
    playerListener(socket);
  });
};

module.exports = connectionListener;
