const logger = require("../logger");
const gameState = require("../state");
const eventEmitter = require("../events");

const teamListener = (socket) => {
  socket.on("join-team", (data) => {
    logger.info(`Team recieved: ${JSON.stringify(data)}`);
    const currentGameState = gameState.getState();
    const player = currentGameState.players[socket.id];
    const { teamId } = data;

    logger.info(`User wants to join ${teamId}`);

    const team = {
      [socket.id]: player,
    };

    const payload = {
      [socket.id]: {
        teamId,
      },
    };
    gameState.setPlayerState(payload);
    gameState.setTeamState(team, teamId);

    eventEmitter.emit("emit-game-state");
  });
};

module.exports = teamListener;
