const initialGameState = {
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

let currentGameState = Object.assign({}, initialGameState);

const getState = () => currentGameState;

const setPlayerState = (player) => {
  currentGameState = Object.assign({}, currentGameState, {
    players: {
      ...currentGameState.players,
      ...player,
    },
  });
};

const setTeamState = (team, teamId) => {
  currentGameState = Object.assign({}, currentGameState, {
    teams: {
      ...currentGameState.teams,
      [teamId]: {
        ...currentGameState.teams[teamId],
        ...team,
      },
    },
  });
};

module.exports = {
  getState,
  setPlayerState,
  setTeamState,
};
