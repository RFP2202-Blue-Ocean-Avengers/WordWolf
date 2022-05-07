const lobbies = new Map();

class Lobby {
  constructor(name) {
    this.name = name;
    this.host = null; // this needs to somehow be set to the lobby creator
    this.settings = {};
    this.gameState = {
      // maybe something like this? subject to change
      // mayor: 'player',
      // state: 'pickWord',
      // word: 'table',
    };
    this.colors = {};
    this.players = {};
    this.messages = {};
  }

  // game logic probably goes here as functions?
  // look into game logic in OOP styles
}

const addLobby = (name) => {
  const existingLobby = lobbies.get(name);
  if (existingLobby) {
    return { error: 'Lobby name already in use' };
  }
  if (!name) {
    return { error: 'Please provide a lobby name' };
  }

  const lobby = new Lobby(name);
  lobbies.set(name, lobby);
  return lobby;
}

const getLobby = (name) => {
  let lobby = lobbies.get(name);
  return lobby;
}

const deleteLobby = (name) => {
  lobbies.delete(name);
}

module.exports = {
  lobbies,
  addLobby,
  getLobby,
  deleteLobby,
}
