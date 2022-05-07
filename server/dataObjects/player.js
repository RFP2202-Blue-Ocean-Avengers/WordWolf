const { lobbies, deleteLobby } = require('./lobby');

const players = new Map();

class Player {
  constructor(name, lobby) {
    this.name = name;
    this.lobby = lobby;
    this.spectator = true;
    this.role = null;
    this.color = null;
    this.questions = {};
    this.tokens = {
      yes: 0,
      no: 0,
      maybe: 0,
      'wayOff': 0,
      'soClose': 0,
      'correct': 0,
    };
  }
}

const assignPlayerToLobby = (name, lobby, socketId) => {
  const currentLobby = lobbies.get(lobby);
  if (Object.keys(currentLobby.players).length === 10) {
    return { error: 'Lobby is full' };
  }

  const player = new Player(name, lobby);
  lobbies.get(lobby).players[socketId] = player;
  players.set(socketId, player);
  return player;
}

const updatePlayerData = (data, lobby, socketId) => {
  const currentLobby = lobby.get(lobby);
  // update player data for whatever is needed?
  // maybe their token or their role or something??
}

const removePlayerFromLobby = (lobby, socketId) => {
  const currentLobby = lobbies.get(lobby);
  if (currentLobby.players[socketId]) {
    delete currentLobby.players[socketId];
    if (Object.keys(currentLobby.players).length === 0) {
      deleteLobby(lobby);
    }
  }
}

module.exports = {
  players,
  assignPlayerToLobby,
  removePlayerFromLobby,
}