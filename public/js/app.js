/* eslint-env browser */
/* global io */

const localState = {
  name: null,
  teamId: null,
};

const socket = io();

const buttons = document.querySelectorAll(".team-select button");

buttons.forEach((button) => {
  const teamId = +button.dataset.teamId;
  button.addEventListener("click", () => {
    socket.emit("join-team", { teamId });
  });
});

socket.on("connect", () => {
  console.log("Connected");
  if (!localState.name) {
    localState.name = prompt("Please enter user name");
  }

  socket.emit("set-name", { name: localState.name });
});

socket.on("game-state", (data) => {
  console.log("Game State: ", data);
});
