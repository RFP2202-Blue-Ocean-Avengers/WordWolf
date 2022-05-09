const { lobbies, deleteLobby } = require('./lobby');

const players = new Map();

class Player {
  constructor(name, lobby, socketId) {
    this.socketId = socketId;
    this.name = name;
    this.lobby = lobby;
    this.spectator = true;
    this.role = null;
    this.mayor = false;
    this.color = null;
    this.questions = [];
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

  const player = new Player(name, lobby, socketId);
  lobbies.get(lobby).players[name] = player;
  players.set(socketId, player);
  return player;
}

const removePlayerFromLobby = (player) => {
  const currentLobby = lobbies.get(player.lobby);
  if (currentLobby.players[player.name]) {
    delete currentLobby.players[player.name];
    if (Object.keys(currentLobby.players).length === 0) {
      deleteLobby(player.lobby);
    }
  }
}

module.exports = {
  players,
  assignPlayerToLobby,
  removePlayerFromLobby,
}