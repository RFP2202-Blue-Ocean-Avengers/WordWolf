const wordList = require('../../wordList.json');

const lobbies = new Map();

/*
  #lobby
    1. host starts the game
  #mayorPick
    1. every player that has is not a spectator gets a random role
    2. a random mayor is set
    3. the mayor gets two random words to choose from
    4. that word is sent to the werewolves and the seer
  #questionRound
    1. the questions round begins
    2. people can asks questions in the chat and the mayor will respond with tokens to each player accordingly
  #endGame
    3. if time runs out | if tokens run out | if word is guessed THEN game is over
    4a. if word is not guessed, everyone votes on who the werewolf is
    4b. if word is guessed, werewolf is revealed, and they guess who the seer is with 15s on the timer
    5. cards are revealed
*/

class Lobby {
  constructor(host, name) {
    this.name = name;
    this.host = host; // somehow set this when instance is created
    this.settings = {
      timer: 0,
    };
    this.gameState = 'lobby'; // four possible states [lobby, mayorPick, questionRound, endGame]
    this.players = {};
    this.words = [];
    this.chosenWord = ''
    this.messages = [];
  }
}

const addLobby = (host, name) => {
  const existingLobby = lobbies.get(name);
  if (existingLobby) {
    return { error: 'Lobby name already in use' };
  }
  if (!name) {
    return { error: 'Please provide a lobby name' };
  }

  const lobby = new Lobby(host, name);
  lobbies.set(name, lobby);
  return lobby;
}

const getLobby = (name) => {
  const lobby = lobbies.get(name);
  return lobby;
}

const deleteLobby = (name) => {
  lobbies.delete(name);
}

const toggleJoin = (name, lobby) => {
  const currentLobby = lobbies.get(lobby);
  currentLobby.players[name].spectator = !currentLobby.players[name].spectator;
  lobbies.set(currentLobby.name, currentLobby);
  return lobby;
}

const startGame = (name) => {
  const lobby = lobbies.get(name);
  const joinedCount = Object.keys(lobby.players)
  .reduce((prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev), 0);
  const playerCount = Object.keys(lobby.players).length;
  let roles = ['villager', 'seer', 'werewolf'];   // base roles

  // adds villagers to the roles array dynamically
  const addVillagers = (count) => {
    while (count > 0) {
      roles.push('villager');
      count--;
    }
  }

  // Durstenfeld shuffle algorithm to shuffle the roles array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  if (joinedCount > 6) {
    roles.push('werewolf');
    let villagersToAdd = joinedCount - roles.length;
    addVillagers(villagersToAdd);
  } else if (joinedCount <= 6) {
    let villagersToAdd = joinedCount - roles.length;
    addVillagers(villagersToAdd);
  }

  shuffleArray(roles);

  const playerKeys = Object.keys(lobby.players);

  // assign each player a role
  let roleIndex = 0;
  playerKeys.forEach((player) => {
    if (!lobby.players[player].spectator) {
      lobby.players[player].role = roles[roleIndex];
      roleIndex += 1;
    }
  });

  // randomly assign one non spectator to be the mayor
  let mayorSelected = false;
  while (!mayorSelected) {
    const player = lobby.players[playerKeys[Math.floor(Math.random() * joinedCount)]];
    if (!player.spectator) {
      lobby.players[playerKeys[Math.floor(Math.random() * joinedCount)]].mayor = true;
      mayorSelected = true;
    }
  }

  // add a function to randomly select two words for the mayor to choose from
  lobby.words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  lobby.words.push(wordList[Math.floor(Math.random() * wordList.length)]);

  // changes the game state so the front end can change the display accordingly
  lobby.gameState = "mayorPick";
  console.log(lobby);

  // updates the lobby data
  lobbies.set(name, lobby);
  return lobby;
}

module.exports = {
  lobbies,
  Lobby,
  addLobby,
  getLobby,
  deleteLobby,
  startGame,
  toggleJoin,
}

// addLobby('lobby');
// startGame('lobby');
