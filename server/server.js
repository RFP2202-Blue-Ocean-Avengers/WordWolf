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

const emitLobbyData = async (lobby, socket) => {
  const lobbyData = await getLobby(lobby);
  socket.emit('lobby', { lobbyData });
}

const emitConnectedToLobby = async (lobbyData, socket) => {
  socket.emit('connectedToLobby', { lobbyData });
}

io.on('connect', socket => {
  socket.on('createLobby', async ({ name, lobby }) => {
    console.log(socket.id);
    await assignPlayerToLobby(name, lobby);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
  });
  socket.on('joinLobby', async ({ name, lobby }) => {
    console.log(socket.id);
    await assignPlayerToLobby(name, lobby);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
    emitLobbyData(lobby, socket);
  });
  socket.on('toggleJoin', async ({ lobby }) => {
    console.log(socket.id);
    toggleJoin(lobby, socket.id);
    emitLobbyData(lobby, socket);
  });
  socket.on('gameStart', async (lobby) => {
    console.log(socket.id);
    startGame(lobby);
    let lobbyData = await getLobby(lobby);
    emitLobbyData(lobby, socket);
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
      // if (req.query.name) {
      //   const { name, lobby } = req.query;
      //   if (req.query.create) {
      //     const lobbyData = await addLobby(name, lobby);
      //     const playerData = await assignPlayerToLobby(name, lobby);
      //     res.send(lobbyData);
      //     return;
      //   } else {
      //     const lobbyData = await getLobby(lobby);
      //     const playerData = await assignPlayerToLobby(name, lobby);
      //     res.send('ok');
      //     return;
      //   }
      // }
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
