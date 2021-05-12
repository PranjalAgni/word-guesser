/* eslint-env browser */
/* global io */

const localState = {
  name: null,
  teamId: null,
};

const socket = io();

const preGame = document.querySelector("#pre-game");
const buttons = document.querySelectorAll(".team-select button");
const teamList1 = document.querySelector("#team-1-list");
const teamList2 = document.querySelector("#team-2-list");

buttons.forEach((button) => {
  const teamId = +button.dataset.teamId;
  button.addEventListener("click", () => {
    socket.emit("join-team", { teamId });
    localState.teamId = teamId;

    // preGame.classList.add("team-select");
  });
});

const setName = (name) => {
  socket.emit("set-name", { name });
};

socket.on("connect", () => {
  console.log("Connected");
  if (!localState.name) {
    localState.name = prompt("Please enter user name");
  }

  setName(localState.name);

  console.log(localState);
  if (localState.teamId) {
    socket.emit("join-team", { teamId: localState.teamId });
  }

  socket.emit("game-state", "", (state) => {
    updateGame(state);
  });
});

const updateTeamList = (state, element, teamId) => {
  element.innerHTML = "";
  Object.values(state.teams[teamId]).forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.textContent = player.name;
    element.appendChild(playerElement);
  });
};

const updateGame = (state) => {
  updateTeamList(state, teamList1, 1);
  updateTeamList(state, teamList2, 2);
};

socket.on("game-state", updateGame);

socket.on("game-error", console.error);
