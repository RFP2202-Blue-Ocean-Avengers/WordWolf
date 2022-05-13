const { lobbies, deleteLobby } = require('./lobby');
const { deleteLobbyMessages, deleteGameMessages } = require('./chat');

const players = new Map();

class Player {
  constructor(name, lobby, socketId) {
    this.socketId = socketId;
    this.name = name;
    this.lobby = lobby;
    this.spectator = true;
    this.seat = null;
    this.role = null;
    this.mayor = false;
    this.color = null;
    this.tokens = {
      yes: [],
      no: [],
      maybe: [],
      wayOff: [],
      soClose: [],
      correct: [],
    };
  }
}

const assignPlayerToLobby = (name, lobby, socketId) => {
  const currentLobby = lobbies.get(lobby);
  if (!currentLobby) {
    return null;
  }
  if (Object.keys(currentLobby.players).length === 10) {
    return { error: 'Lobby is full' };
  }

  const player = new Player(name, lobby, socketId);
  lobbies.get(lobby).players[name] = player;
  players.set(socketId, player);
  return player;
};

const removePlayerFromLobby = (player) => {
  const currentLobby = lobbies.get(player.lobby);
  if (!currentLobby) {
    return;
  }
  if (currentLobby.players[player.name]) {
    // removes player from seat if they are in one
    if (currentLobby.players[player.name].seat) {
      const { seat } = currentLobby.players[player.name];
      currentLobby.seats[seat] = null;
    }
    // removes player from lobby
    delete currentLobby.players[player.name];
    if (Object.keys(currentLobby.players).length === 0) {
      deleteLobbyMessages(player.lobby);
      deleteGameMessages(player.lobby);
      deleteLobby(player.lobby);
    }
  }
};

module.exports = {
  players,
  assignPlayerToLobby,
  removePlayerFromLobby,
};
