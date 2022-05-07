const lobbies = new Map();

class Lobby {
  constructor(name) {
    this.name = name;
    this.settings = {};
    this.players = {};
  }
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
