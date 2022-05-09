require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const {
  lobbies, addLobby, getLobby, startGame, toggleJoin,
  toggleSpectate, onMayorPick, afterQuestionRound, resetGame,
} = require('./dataObjects/lobby');
const { players, assignPlayerToLobby, removePlayerFromLobby } = require('./dataObjects/player');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

const emitLobbyData = async (lobby) => {
  const lobbyData = await getLobby(lobby);
  if (lobbyData) {
    io.emit(`${lobby}`, { lobbyData });
  }
};

io.on('connect', (socket) => {
  const emitConnectedToLobby = async (lobbyData) => {
    socket.emit('connectedToLobby', { lobbyData });
  };

  socket.on('createLobby', async ({ name, lobby }) => {
    await assignPlayerToLobby(name, lobby, socket.id);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
  });
  socket.on('joinLobby', async ({ name, lobby }) => {
    await assignPlayerToLobby(name, lobby, socket.id);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
    emitLobbyData(lobby);
  });
  socket.on('toggleJoin', async ({ name, lobby, seat }) => {
    toggleJoin(name, lobby, seat);
    emitLobbyData(lobby);
  });
  socket.on('toggleSpectate', async ({ name, lobby, seat }) => {
    toggleSpectate(name, lobby, seat);
    emitLobbyData(lobby);
  });
  socket.on('gameStart', async (lobby) => {
    startGame(lobby);
    emitLobbyData(lobby);
  });
  socket.on('mayorPick', async ({ lobby, word }) => {
    mayorPick(lobby, word);
    emitLobbyData(lobby);
  });
  socket.on('questionRound', async (lobby) => {
    emitLobbyData(lobby);
  });
  socket.on('endGame', async (lobby) => {
    emitLobbyData(lobby);
  });
  socket.on('disconnect', () => {
    // add on disconnect, remove from seat in the lobby if they are sitting
    console.log(`closed socket: ${socket.id}`);
    const player = players.get(socket.id);
    if (player) {
      removePlayerFromLobby(player);
      emitLobbyData(player.lobby);
    }
  });
});

nextApp.prepare()
  .then(() => {
    app.get('/createLobby', (req, res) => {
      const { name, lobby } = JSON.parse(req.query.loginData);
      if (!lobbies.get(lobby)) {
        addLobby(name, lobby);
        res.send('ok');
      } else {
        res.send('error');
      }
    });

    app.get('/joinLobby', (req, res) => {
      const { lobby } = JSON.parse(req.query.loginData);
      if (!lobbies.get(lobby)) {
        res.send('error');
      } else {
        res.send('ok');
      }
    });

    app.get('*', async (req, res) => handler(req, res));

    server.listen(port, (err) => {
      if (err) { throw err; }
      console.log(`listening on port ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
