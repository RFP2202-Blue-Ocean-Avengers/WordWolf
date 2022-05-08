const lobbies = new Map();

/*
  game states
  1. when start is hit each player is given a random role
  2. random mayor is assigned
  3. mayor gets a choice of words to choose from
  4. timer starts
*/
class Lobby {
  constructor(name) {
    this.name = name;
    this.settings = {
      timer: 0,
    };
    this.gameState = 'lobby';
    this.players = {};
    this.words = [];
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

  const lobby = {
    name: 'lobby',
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
        spectator: false,
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
        spectator: false,
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
        spectator: false,
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
    words: ['tooth', 'yogurt', 'dog'],
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

  const playerCount = Object.keys(lobby.players).length;
  // const playerCount = 10;

  // base roles
  let roles = ['villager', 'seer', 'werewolf'];

  const addVillagers = (count) => {
    while (count > 0) {
      roles.push('villager');
      count--;
    }
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  if (playerCount > 6) {
    roles.push('werewolf');
    let villagersToAdd = playerCount - roles.length;
    addVillagers(villagersToAdd);
  } else if (playerCount <= 6) {
    let villagersToAdd = playerCount - roles.length;
    addVillagers(villagersToAdd);
  }

  shuffleArray(roles);
  console.log(roles);



  lobby.gameState = "mayorPick";
  // lobbies.set(name, lobby);
  // return lobby;
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
