const logger = require("./logger");

const gameState = {
  guessedLetters: "",
  isGameOver: false,
  players: {},
  teams: {
    1: {},
    2: {},
  },
  score: {
    1: 0,
    2: 0,
  },
};

const gameListeners = (io) => {
  io.on("connection", (socket) => {
    logger.info(`User with socketid = ${socket.id} connected`);

    socket.on("game-state", (_, ack) => {
      logger.info("Emit game state");
      ack(gameState);
    });

    const getPlayer = () => gameState.players[socket.id];

    const emitGameState = () => io.emit("game-state", gameState);

    const emitGameError = (errorMessage) =>
      socket.emit("game-error", errorMessage);

    socket.on("set-name", (data) => {
      const { name } = data;
      if (!name || typeof name !== "string" || name.length > 20) {
        emitGameError(`You are providing invalid user name ${name}`);
        return;
      }

      logger.info(`User name ${name}`);
      const player = getPlayer();

      gameState.players[socket.id] = {
        ...player,
        name,
      };

      emitGameState();
    });

    socket.on("join-team", (data = {}) => {
      if (!data) return;
      const { teamId } = data;

      const player = getPlayer();

      if (!player) {
        emitGameError("Set the name of player before joining team");
        return;
      }

      if (player.teamId) {
        emitGameError(`You have already joined team ${player.teamId}`);
        return;
      }

      logger.info(`Player ${player.name} want to join team ${teamId}`);
      gameState.players[socket.id] = {
        ...player,
        teamId,
      };
      gameState.teams[teamId][socket.id] = {
        ...player,
        teamId,
      };

      emitGameState();
    });

    socket.on("disconnect", () => {
      const player = getPlayer();
      if (!player) return;
      if (player.teamId) {
        delete gameState.teams[player.teamId][socket.id];
      }
      delete gameState.players[socket.id];
      emitGameState();
    });
  });
};

module.exports = gameListeners;
