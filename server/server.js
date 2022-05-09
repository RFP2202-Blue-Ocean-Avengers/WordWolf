require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next  = require('next');
const { lobbies, addLobby, getLobby, deleteLobby, startGame, toggleJoin } = require('./dataObjects/lobby');
const { players, assignPlayerToLobby, removePlayerFromLobby } = require('./dataObjects/player');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev })
const handler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

const emitLobbyData = async (lobby) => {
  const lobbyData = await getLobby(lobby);
  io.emit('lobby', { lobbyData });
}

io.on('connect', socket => {
  const emitConnectedToLobby = async (lobbyData) => {
    socket.emit('connectedToLobby', { lobbyData });
  }

  socket.on('createLobby', async ({ name, lobby }) => {
    await assignPlayerToLobby(name, lobby);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
  });
  socket.on('joinLobby', async ({ name, lobby }) => {
    await assignPlayerToLobby(name, lobby);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
    emitLobbyData(lobby);
  });
  socket.on('toggleJoin', async ({ name, lobby }) => {
    toggleJoin(name, lobby);
    emitLobbyData(lobby);
  });
  socket.on('gameStart', async (lobby) => {
    startGame(lobby);
    let lobbyData = await getLobby(lobby);
    emitLobbyData(lobby);
  });
  socket.on('disconnect', () => {
    console.log('closed socket: ' + socket.id);

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

    app.get('/joinLobby',  (req, res) => {
      const { name, lobby } = JSON.parse(req.query.loginData);
      if (!lobbies.get(lobby)) {
        res.send('error');
      } else {
        res.send('ok');
      }
    });

    app.get('*', async (req, res) => {
      return handler(req, res);
    });

    server.listen(port, (err) => {
      if (err) { throw err; }
      console.log(`listening on port ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  });
