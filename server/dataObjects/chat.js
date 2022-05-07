// stores message data for the chat ?
// maybe also stores the questions ?

const messages = new Map();

// example message object
class Message {
  constructor(name, message, question) {
    this.name = name;
    this.message = message;
    this.question = question; // if it is a question or not, boolean
    this.answer = null; // if it is a question, this will be changed, if not then it will stay null
  }
}

const addMessageToLobby = (payload) => {
  const { name, message, question } = payload;
  // add the message to the lobby's list of messages ?
}

const updateMessageAnswer = (payload) => {
  // get the message from the lobby list of messages and update it accordingly
}

module.exports = {
  messages,
  addMessageToLobby,
  updateMessageAnswer,
}