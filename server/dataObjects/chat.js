const { getLobby } = require('./lobby');

let messages = [];
let gameMessages = [];

const addMessage = (data, gameStart) => {
  const { lobby } = data;
  const theLobby = getLobby(lobby);
  if (!theLobby) {
    return null;
  }
  if (gameStart) {
    gameMessages.push(data);
    if (data.question) {
      theLobby.questions.push(data);
    }
    return data;
  }
  messages.push(data);
  theLobby.messages.push(data);
  return data;
};

const getLobbyMessages = (lobby) => messages.filter((message) => message.lobby === lobby);

const getGameMessages = (lobby) => gameMessages.filter((message) => message.lobby === lobby);

const deleteLobbyMessages = (lobby) => {
  messages = messages.filter((message) => message.lobby !== lobby);
};

const deleteGameMessages = (lobby) => {
  gameMessages = gameMessages.filter((message) => message.lobby !== lobby);
};

module.exports = {
  addMessage,
  getLobbyMessages,
  getGameMessages,
  deleteLobbyMessages,
  deleteGameMessages,
};
