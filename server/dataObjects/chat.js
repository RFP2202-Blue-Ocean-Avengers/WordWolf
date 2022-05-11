const { getLobby } = require('./lobby');

const messages = [];
const gameMesages = [];

const addMessage = (data, gameStart) => {
  const { lobby } = data;
  const theLobby = getLobby(lobby);
  if (gameStart) {
    gameMesages.push(data);
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

const getGameMessages = (lobby) => gameMesages.filter((message) => message.lobby === lobby);

module.exports = { addMessage, getLobbyMessages, getGameMessages };
