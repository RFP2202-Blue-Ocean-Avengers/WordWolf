require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const {
  lobbies, addLobby, getLobby, startGame, toggleJoin, swapSeats,
  toggleSpectate, onMayorPick, afterQuestionRound, resetGame,
  updateTimer, answerQuestion, VoteWerewolf, VoteSeer,
} = require('./dataObjects/lobby');
const { players, assignPlayerToLobby, removePlayerFromLobby } = require('./dataObjects/player');
const { addMessage, getLobbyMessages, getGameMessages } = require('./dataObjects/chat');

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
  socket.on('afterQuestionRound', async ({ lobby, condition }) => {
    await afterQuestionRound(lobby, condition);
    emitLobbyData(lobby);
  });
  socket.on('resetGame', async (lobby) => {
    await resetGame(lobby);
    emitLobbyData(lobby);
  });
  socket.on('updateTimer', async ({ settings, lobby }) => {
    await updateTimer(settings, lobby);
    emitLobbyData(lobby);
  });

  socket.on('newMessage', async (data, lobby) => {
    addMessage(data, false);
    const allmessages = getLobbyMessages(lobby);
    io.to(lobby).emit('allMessages', allmessages);
  });

  socket.on('newGameMessage', async (data, lobby) => {
    addMessage(data, true);
    const allmessages = getGameMessages(lobby);
    io.to(lobby).emit('allGameMessages', allmessages);
  });


  socket.on('AnsweredQuestion', async ({ answer, question, lobbyName }) => {
    // adds the question to the appropriate player's array of that answer
    await answerQuestion(answer, question, lobbyName);
    emitLobbyData(lobbyName);
  });

  socket.on('VoteWerewolf', async ({ name }) => {
    // adds a player object to the provided name's werewolfVotes array
    console.log('invoke werewolf votes');
  });

  socket.on('VoteSeer', async ({ name }) => {
    // adds a player object to the provided name's villagerVotes array
    console.log('invoke seer votes');
  });


  socket.on('disconnect', async () => {
    // add on disconnect, remove from seat in the lobby if they are sitting
    console.log(`closed socket: ${socket.id}`);
    const player = players.get(socket.id);
    if (player) {
      await removePlayerFromLobby(player);
      socket.leave(player.lobby);
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
