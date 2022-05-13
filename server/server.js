require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const {
  lobbies, addLobby, getLobby, startGame, toggleJoin, swapSeats,
  toggleSpectate, onMayorPick, onTimeout, afterVotingRound, resetGame,
  updateTimer, updatePickCount, answerQuestion, VoteWerewolf, VoteSeer, switchHost, deleteLobby,
} = require('./dataObjects/lobby');
const { players, assignPlayerToLobby, removePlayerFromLobby } = require('./dataObjects/player');
const {
  addMessage, getLobbyMessages, getGameMessages, deleteLobbyMessages, deleteGameMessages,
} = require('./dataObjects/chat');

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
    socket.join(lobby);

    await assignPlayerToLobby(name, lobby, socket.id);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
  });
  socket.on('joinLobby', async ({ name, lobby }) => {
    socket.join(lobby);

    await assignPlayerToLobby(name, lobby, socket.id);
    const lobbyData = await getLobby(lobby);
    await emitConnectedToLobby(lobbyData, socket);
    emitLobbyData(lobby);
  });
  socket.on('toggleJoin', async ({
    name, lobby, seat, color,
  }) => {
    await toggleJoin(name, lobby, seat, color);
    emitLobbyData(lobby);
  });
  socket.on('swapSeats', async ({
    name, lobby, seat, color,
  }) => {
    await swapSeats(name, lobby, seat, color);
    emitLobbyData(lobby);
  });
  socket.on('toggleSpectate', async ({ name, lobby }) => {
    await toggleSpectate(name, lobby);
    emitLobbyData(lobby);
  });
  socket.on('gameStart', async (lobby) => {
    await startGame(lobby);
    emitLobbyData(lobby);
  });
  socket.on('onMayorPick', async ({ lobby, word }) => {
    await onMayorPick(lobby, word);
    emitLobbyData(lobby);
  });
  socket.on('onTimeout', async ({ lobby }) => {
    await onTimeout(lobby);
    emitLobbyData(lobby);
  });
  socket.on('afterVotingRound', async ({ lobby }) => {
    await afterVotingRound(lobby);
    emitLobbyData(lobby);
  });
  socket.on('resetGame', async (lobby) => {
    await resetGame(lobby);
    emitLobbyData(lobby);
    deleteGameMessages(lobby);
  });
  socket.on('updateTimer', async ({ settings, lobby }) => {
    await updateTimer(settings, lobby);
    emitLobbyData(lobby);
  });
  socket.on('updatePickCount', async ({ pickCount, lobby }) => {
    await updatePickCount(pickCount, lobby);
    emitLobbyData(lobby);
  });

  socket.on('newMessage', async (data, lobby) => {
    addMessage(data, false);
    const allmessages = getLobbyMessages(lobby);
    io.to(lobby).emit('allMessages', allmessages);
    emitLobbyData(lobby);
  });

  socket.on('newGameMessage', async (data, lobby) => {
    addMessage(data, true);
    const allmessages = getGameMessages(lobby);
    io.to(lobby).emit('allGameMessages', allmessages);
    emitLobbyData(lobby);
  });

  socket.on('AnsweredQuestion', async ({ answer, question, lobbyName }) => {
    await answerQuestion(answer, question, lobbyName);
    emitLobbyData(lobbyName);
  });

  socket.on('VoteWerewolf', async ({ player, lobbyName }) => {
    await VoteWerewolf(player, lobbyName);
    emitLobbyData(lobbyName);
  });

  socket.on('VoteSeer', async ({ player, lobbyName }) => {
    await VoteSeer(player, lobbyName);
    emitLobbyData(lobbyName);
  });

  socket.on('disconnect', async () => {
    // add on disconnect, remove from seat in the lobby if they are sitting
    console.log(`closed socket: ${socket.id}`);
    const player = players.get(socket.id);
    if (player) {
      await removePlayerFromLobby(player);
      socket.leave(player.lobby);
      emitLobbyData(player.lobby);
      const lobbyData = await getLobby(player.lobby);
      if (player.mayor || player.role === 'seer' || (player.role === 'werewolf' && lobbyData.werewolf.length === 1)) {
        resetGame(player.lobby);
      }
      if (lobbyData.host === player.name) {
        switchHost(player.lobby);
      }
      if (!lobbyData?.players) {
        deleteLobby(player.lobby);
        deleteLobbyMessages(player.lobby);
      }
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
      const { name, lobby } = JSON.parse(req.query.loginData);
      const currentLobby = lobbies.get(lobby);
      if (!currentLobby) {
        res.send('lobby name not found');
      } else if (currentLobby.players[name]) {
        res.send('name already in use');
      } else if (Object.keys(currentLobby.players).length === 10) {
        res.send('lobby is full');
      } else {
        res.send('ok');
      }
    });

    app.get('/messages/:lobby', (req, res) => {
      const allmessages = getLobbyMessages(req.params.lobby);
      if (allmessages) {
        res.send(allmessages);
      } else {
        res.send([]);
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
