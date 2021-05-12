const logger = require("../logger");
const gameState = require("../state");
const eventEmitter = require("../events");

const playerListener = (socket) => {
  socket.on("set-name", (data) => {
    const { name } = data;
    if (!name || typeof name !== "string" || name.length > 20) return;

    logger.info(`User name ${name}`);

    const payload = {
      [socket.id]: {
        name,
      },
    };

    gameState.setPlayerState(payload);

    eventEmitter.emit("emit-game-state");
  });
};

module.exports = playerListener;
