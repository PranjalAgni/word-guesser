const logger = require("../logger");
const gameState = require("../state");

const gameListener = (socket) => {
  socket.on("game-state", (_, ack) => {
    logger.info("Emit game state");
    ack(gameState.getState());
  });
};

module.exports = gameListener;
