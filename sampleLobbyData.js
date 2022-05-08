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
  words: ['tooth', 'yogurt', 'dog'],
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

module.exports = lobby;
