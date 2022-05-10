import { useEffect, useContext } from 'react';
import { StoreContext } from '../api/contextStore';
import { socket } from '../api/service/socket';
import Lobby from '../../components/Lobby';

function Game() {
  const { lobby, setLobby, loginData } = useContext(StoreContext);

  const onInit = () => {
    const emit = (loginData.create ? 'createLobby' : 'joinLobby');
    const payload = { name: loginData.name, lobby: loginData.lobby };
    socket.emit(emit, payload);
    socket.on('connectedToLobby', async (data) => {
      await setLobby(data.lobbyData);
    });
  };

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    socket.on(`${loginData.lobby}`, (data) => {
      setLobby(data.lobbyData);
    });
  }, [socket]);

  // toggles player's spectator status'
  const toggleJoin = (e) => {
    e.preventDefault();
    const seat = e.target.name;
    if (lobby.seats[seat]) {
      if (lobby.seats[seat].name === loginData.name) {
        socket.emit('toggleSpectate', { name: loginData.name, lobby: lobby.name });
      } else {
        alert('seat already taken');
      }
    } else if (lobby.players[loginData.name].seat && !lobby.seats[seat]) {
      socket.emit('swapSeats', { name: loginData.name, lobby: lobby.name, seat });
    } else {
      socket.emit('toggleJoin', { name: loginData.name, lobby: lobby.name, seat });
    }
  };

  const toggleSpectate = (e) => {
    e.preventDefault();
    if (!lobby.players[loginData.name].spectator) {
      socket.emit('toggleSpectate', { name: loginData.name, lobby: lobby.name });
    } else {
      alert("You\'re already a spectator");
    }
  };

  // starts the game
  const onGameStart = (e) => {
    e.preventDefault();
    // if less than 3 players are not spectators, do not let the game start
    const joinedCount = Object.keys(lobby.players).reduce(
      (prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev),
      0,
    );

    if (joinedCount < 4) {
      alert('unable to start with less than 4 players joined');
      return;
    }
    // emit game start to the server and swap the page to the game
    socket.emit('gameStart', lobby.name);
  };

  const onMayorPick = (e) => {
    e.preventDefault();
    /*
      emit to the server 'onMayorPick' with
        { lobby: name of the lobby, word: word that is chosen }
    */
  };

  const afterQuestionsRound = (e) => {
    e.preventDefault();
    /*
      emit to the server based on a condition
       if all tokens are handed out
        will emit the phrase 'outOfTokens'
          { lobby: name of the lobby, condition: 'outOfTokens'}
       if timer runs out
        will emit the phrase 'outOfTime'
       if correct word is chosen
        will emit the phrase 'wordGuessed'
    */
  };

  // resets the game state to be a clean state
  // allows for restart from the lobby
  const resetGame = (e) => {
    e.preventDefault();
    socket.emit('resetGame', lobby.name);
  };

  const display = () => {
    switch (lobby.gameState) {
      case ('lobby'):
        return (
          <Lobby
            lobby={lobby}
            toggleJoin={toggleJoin}
            onGameStart={onGameStart}
            loginData={loginData}
            toggleSpectate={toggleSpectate}
          />
        );
      case ('mayorPick'):
        return <h1>Mayor Picking</h1>;
      case ('questionRound'):
        return <h1>Question Round</h1>;
      case ('wordGuessed'):
        return <h1>End Game: word guessed</h1>;
      case ('outOfTokens'):
        return <h1>End Game: out of tokens</h1>;
      case ('outOfTime'):
        return <h1>End Game: out of time</h1>;
      default:
        return <h1>No Game State</h1>;
    }
  };

  return (
    <div>
      {lobby && display()}
    </div>
  );
}

export default Game;
