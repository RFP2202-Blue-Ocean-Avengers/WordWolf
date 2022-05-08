const lobbies = new Map();

const lobby = {
  name: 'lobby',
  host: 'danny',
  settings: { timer: 240 }, // 4 minutes in seconds
  gameState:'lobby',
  players: {
    danny: {
      name: 'danny',
      lobby: 'lobby',
      spectator: false,
      role: null,
      mayor: false,
      color: 'purple',
      questions: [
        {
          message: 'is it alive?',
          answer: 'yes',
        }
      ],
      tokens: {
        yes: 1,
        no: 0,
        maybe: 0,
        'wayOff': 0,
        'soClose': 0,
        'correct': 0,
      }
    },
    eunice: {
      name: 'eunice',
      lobby: 'lobby',
      spectator: true,
      role: null,
      mayor: false,
      color: 'blue',
      questions: [],
      tokens: {
        yes: 0,
        no: 0,
        maybe: 0,
        'wayOff': 0,
        'soClose': 0,
        'correct': 0,
      }
    },
    amy: {
      name: 'amy',
      lobby: 'lobby',
      spectator: false,
      role: null,
      mayor: false,
      color: 'red',
      questions: [],
      tokens: {
        yes: 0,
        no: 0,
        maybe: 0,
        'wayOff': 0,
        'soClose': 0,
        'correct': 0,
      }
    },
    anny: {
      name: 'anny',
      lobby: 'lobby',
      spectator: true,
      role: null,
      mayor: false,
      color: 'grey',
      questions: [],
      tokens: {
        yes: 0,
        no: 0,
        maybe: 0,
        'wayOff': 0,
        'soClose': 0,
        'correct': 0,
      }
    },
    casey: {
      name: 'casey',
      lobby: 'lobby',
      spectator: false,
      role: null,
      mayor: false,
      color: 'brown',
      questions: [],
      tokens: {
        yes: 0,
        no: 0,
        maybe: 0,
        'wayOff': 0,
        'soClose': 0,
        'correct': 0,
      }
    },
    bogdan: {
      name: 'bogdan',
      lobby: 'lobby',
      spectator: true,
      role: null,
      mayor: false,
      color: 'green',
      questions: [],
      tokens: {
        yes: 0,
        no: 0,
        maybe: 0,
        'wayOff': 0,
        'soClose': 0,
        'correct': 0,
      }
    },
    andy: {
      name: 'andy',
      lobby: 'lobby',
      spectator: false,
      role: null,
      mayor: false,
      color: 'orange',
      questions: [],
      tokens: {
        yes: 0,
        no: 0,
        maybe: 0,
        'wayOff': 0,
        'soClose': 0,
        'correct': 0,
      }
    },
  },
  words: [],
  chosenWord: null,
  messages: [
    {
      name: 'danny',
      message: 'is it alive?',
      question: true,
      answer: 'yes',
    },
    {
      name: 'bogdan',
      message: 'can I eat it?',
      question: true,
      answer: null,
    },
    {
      name: 'amy',
      message: 'who do you guys think the wolf is??',
      question: false,
      answer: null,
    }
  ]
}
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
  constructor(name) {
    this.name = name;
    this.host = null; // somehow set this when instance is created
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
  const lobby = lobbies.get(name);
  return lobby;
}

const deleteLobby = (name) => {
  lobbies.delete(name);
}

const startGame = (name) => {
  // const lobby = lobbies.get(name);
  const joinedCount = Object.keys(lobby.players)
  .reduce((prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev), 0);const playerCount = Object.keys(lobby.players).length;
  // const playerCount = 10;

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

  lobby.gameState = "mayorPick";
  console.log(lobby);
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
}

addLobby('lobby');
startGame('lobby');
