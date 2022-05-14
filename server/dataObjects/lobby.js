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
    2. people can asks questions in the chat and the mayor will
    respond with tokens to each player accordingly
  #endGame
    3. if time runs out | if tokens run out | if word is guessed THEN game is over
  #outOfTokens / #outOfTime
    4a. if word is not guessed, everyone votes on who the werewolf is
  #wordGuessed
    4b. if word is guessed, werewolf is revealed,
    and they guess who the seer is with 15s on the timer
    5. cards are revealed
*/

class Lobby {
  constructor(host, name) {
    this.name = name;
    this.host = host;
    this.mayor = null;
    this.werewolf = [];
    this.seer = null;
    this.settings = {
      minutes: 1,
      seconds: 0,
    };
    this.timer = 1;
    this.pickCount = 2;
    this.gameState = 'lobby'; // four possible states [lobby, mayorPick, questionRound, endGame]
    this.players = {}; // an object that contains players in the game
    this.seats = {
      seat1: null,
      seat2: null,
      seat3: null,
      seat4: null,
      seat5: null,
      seat6: null,
      seat7: null,
      seat8: null,
      seat9: null,
      seat10: null,
    }; // seats for the game
    this.words = []; // two randomly chosen words
    this.chosenWord = ''; // word chosen by the mayor for this round
    this.messages = []; // all messages store for chat?
    this.questions = []; // questions queue
    this.answeredQuestions = []; // all answered questions with their respective answers
    this.soClose = null; // question object for given token
    this.wayOff = null; // question object for given token
    this.correct = null; // question object for given token
    this.tokens = 36; // if this runs out the game ends, yes no tokens
    this.maybeTokens = 12; // 12 maybe tokens, cannot give if have no more left, button disppears?
    this.villagerVotes = []; // player objects will be stored in here as votes
    this.werewolfVotes = []; // player objects will be stored in here as votes
    this.soClose = null; // question object for given token
    this.wayOff = null; // question object for given token
    this.correct = null; // question object for given token
  }
}

const updatePickCount = (pickCount, lobby) => {
  const currLobby = lobbies.get(lobby);
  if (!currLobby) {
    return null;
  }
  currLobby.pickCount = Number(pickCount);
  lobbies.set(lobby, currLobby);
  return currLobby;
};

const updateTimer = (settings, lobby) => {
  // get specific lobby
  const currLobby = lobbies.get(lobby);
  if (!currLobby) {
    return null;
  }
  // update settings to param
  currLobby.settings = settings;
  // update lobbies map
  lobbies.set(lobby, currLobby);
  return currLobby;
};

const updateSaveTimer = (timer, lobby) => {
  const currLobby = lobbies.get(lobby);
  if (!currLobby) {
    return null;
  }
  currLobby.timer = timer;
  lobbies.set(lobby, currLobby);
  return currLobby;
};

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
};

const getLobby = (lobbyName) => {
  const lobby = lobbies.get(lobbyName);
  if (!lobby) {
    return null;
  }
  return lobby;
};

const deleteLobby = (name) => {
  lobbies.delete(name);
};

const toggleJoin = (name, lobby, seat, color) => {
  const currentLobby = lobbies.get(lobby);
  if (!currentLobby) {
    return null;
  }
  currentLobby.players[name].spectator = false;
  currentLobby.players[name].seat = seat;
  currentLobby.players[name].color = color;
  if (!currentLobby.seats[seat]) {
    currentLobby.seats[seat] = currentLobby.players[name];
  }
  lobbies.set(currentLobby.name, currentLobby);
  return lobby;
};

const swapSeats = (name, lobby, seat, color) => {
  const currentLobby = lobbies.get(lobby);
  if (!currentLobby) {
    return null;
  }
  const prevSeat = currentLobby.players[name].seat;
  currentLobby.players[name].color = color;
  currentLobby.players[name].seat = seat;
  currentLobby.seats[prevSeat] = null;
  currentLobby.seats[seat] = currentLobby.players[name];
  lobbies.set(currentLobby.name, currentLobby);
  return lobby;
};

const toggleSpectate = (name, lobby) => {
  const currentLobby = lobbies.get(lobby);
  if (!currentLobby) {
    return null;
  }
  const prevSeat = currentLobby.players[name].seat;
  currentLobby.players[name].spectator = true;
  currentLobby.players[name].seat = null;
  currentLobby.seats[prevSeat] = null;
  currentLobby.players[name].color = null;
  lobbies.set(currentLobby.name, currentLobby);
  return lobby;
};

const startGame = (lobbyName) => {
  const lobby = lobbies.get(lobbyName);
  if (!lobby) {
    return null;
  }
  const joinedCount = Object.keys(lobby.players)
    .reduce((prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev), 0);
  const roles = ['villager', 'villager', 'seer', 'werewolf']; // base roles

  // adds villagers to the roles array dynamically
  const addVillagers = (count) => {
    while (count > 0) {
      roles.push('villager');
      count -= 1;
    }
  };

  // Durstenfeld shuffle algorithm to shuffle the roles array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  if (joinedCount > 6) {
    roles.push('werewolf');
    const villagersToAdd = joinedCount - roles.length;
    addVillagers(villagersToAdd);
  } else if (joinedCount <= 6) {
    const villagersToAdd = joinedCount - roles.length;
    addVillagers(villagersToAdd);
  }

  shuffleArray(roles);

  const playerKeys = Object.keys(lobby.players);

  // assign each player a role
  let roleIndex = 0;
  playerKeys.forEach((player) => {
    if (!lobby.players[player].spectator) {
      lobby.players[player].role = roles[roleIndex];
      if (roles[roleIndex] === 'werewolf') {
        lobby.werewolf.push(lobby.players[player]);
      } else if (roles[roleIndex] === 'seer') {
        lobby.seer = lobby.players[player];
      }
      roleIndex += 1;
    }
  });

  // randomly assign one non spectator to be the mayor
  let mayorSelected = false;
  while (!mayorSelected) {
    const player = lobby.players[playerKeys[Math.floor(Math.random() * joinedCount)]];
    if (!player.spectator) {
      lobby.players[player.name].mayor = true;
      lobby.mayor = player;
      mayorSelected = true;
    }
  }

  // add a function to randomly select x number of words for the mayor to choose from
  for (let i = 0; i < lobby.pickCount; i += 1) {
    lobby.words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  // lobby.words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  // lobby.words.push(wordList[Math.floor(Math.random() * wordList.length)]);

  // changes the game state so the front end can change the display accordingly
  lobby.gameState = 'mayorPick';
  // console.log(lobby);

  // updates the lobby data
  lobbies.set(lobbyName, lobby);
  return lobby;
};

const onMayorPick = (lobbyName, word) => {
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }

  // assigns the mayor's chosen word to the lobby
  lobby.chosenWord = word;

  // changes the game state, and updates the lobby
  lobby.gameState = 'questionRound';
  lobbies.set(lobbyName, lobby);
  return lobby;
};

const answerQuestion = (answer, question, lobbyName) => {
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }
  if (answer === 'discard') {
    lobby.questions.shift();
    lobbies.set(lobbyName, lobby);
    return lobby;
  }

  const player = lobby.players[question.name];

  if (answer === 'correct') {
    lobby.correct = question;
    lobby.gameState = 'wordGuessed';
  } else if (answer === 'wayOff') {
    lobby.wayOff = question;
  } else if (answer === 'soClose') {
    lobby.soClose = question;
  } else if (answer === 'maybe') {
    lobby.maybeTokens -= 1;
  } else if (answer === 'yes' || answer === 'no') {
    lobby.tokens -= 1;
  } else { // in case answer is undefined or somethin else, although front end solves that
    lobbies.set(lobbyName, lobby);
    return lobby;
  }

  player.tokens[answer].push(question);
  lobby.answeredQuestions.push({ ...question, answer });
  lobby.questions.shift();

  if (lobby.tokens === 0) {
    lobby.gameState = 'outOfTokens';
  }

  // lobbies.set(lobbyName, lobby);
  return lobby;
};

const voteWerewolf = (player, lobbyName) => { // the villagers are voting
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }
  lobby.villagerVotes.push(player); // put who's werewolf here
  const joinedCount = Object.keys(lobby.players)
    .reduce((prev, name) => (!lobby.players[name].spectator ? prev + 1 : prev), 0);
  if (lobby.villagerVotes.length === (joinedCount - lobby.werewolf.length)) {
    lobby.gameState = 'endGame';
  }
  lobbies.set(lobbyName, lobby);
  return lobby;
};

const voteSeer = (player, lobbyName) => { // the werewolfs are voting
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }
  lobby.werewolfVotes.push(player); // put who's a seer here
  if (lobby.werewolfVotes.length === lobby.werewolf.length) {
    lobby.gameState = 'endGame';
  }
  lobbies.set(lobbyName, lobby);
  return lobby;
};

const onTimeout = (lobbyName) => {
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }
  lobby.gameState = 'outOfTime';
  lobbies.set(lobbyName, lobby);
  return lobby;
};

const afterVotingRound = (lobbyName) => {
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }
  lobby.gameState = 'endGame';
  lobbies.set(lobbyName, lobby);
  return lobby;
};

// implement logic and functions for the voting period

const resetGame = (lobbyName) => {
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }

  Object.keys(lobby?.players).forEach((player) => {
    lobby.players[player].tokens = {
      yes: [],
      no: [],
      maybe: [],
      wayOff: [],
      soClose: [],
      correct: [],
    };
  });

  lobby.mayor = null;
  lobby.werewolf = [];
  lobby.seer = null;
  lobby.settings = { minutes: lobby.timer, seconds: 0 };
  lobby.words = [];
  lobby.chosenWord = '';
  lobby.questions = [];
  lobby.answeredQuestions = [];
  lobby.soClose = null;
  lobby.wayOff = null;
  lobby.correct = null;
  lobby.gameState = 'lobby';
  lobby.tokens = 36;
  lobby.maybeTokens = 12;
  lobby.villagerVotes = [];
  lobby.werewolfVotes = [];

  lobbies.set(lobbyName, lobby);
  return lobby;
};

// pass the host if the host leaves

const switchHost = (lobbyName) => {
  const lobby = getLobby(lobbyName);
  if (!lobby) {
    return null;
  }

  const playerName = Object.keys(lobby.players)[0];
  lobby.host = playerName;
  return lobby;
};

const rerollWords = (lobbyName) => {
  const lobby = getLobby(lobbyName);
  if (lobby) {
    lobby.words.splice(0, lobby.words.length);
    for (let i = 0; i < lobby.pickCount; i += 1) {
      lobby.words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return lobby;
  }
  return null;
};

module.exports = {
  lobbies,
  addLobby,
  getLobby,
  deleteLobby,
  startGame,
  toggleJoin,
  swapSeats,
  toggleSpectate,
  onMayorPick,
  onTimeout,
  afterVotingRound,
  resetGame,
  updateTimer,
  updateSaveTimer,
  updatePickCount,
  answerQuestion,
  voteWerewolf,
  voteSeer,
  switchHost,
  rerollWords,
};
