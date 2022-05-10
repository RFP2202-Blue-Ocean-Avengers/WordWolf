import { useEffect, useContext } from 'react';
import { StoreContext } from '../api/contextStore';
import { socket } from '../api/service/socket';
import Lobby from '../../components/Lobby';
import MayorPick from '../../components/MayorPick';
import QuestionRound from '../../components/QuestionRound';
import EndGame from '../../components/EndGame';

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
      alert('seat already taken');
    } else if (false) {
      // refactor this statement to check if the player has already taken a seat
      alert('you are already joined');
    } else {
      socket.emit('toggleJoin', { name: loginData.name, lobby: lobby.name, seat });
    }
  };

  const toggleSpectate = (e) => {
    e.preventDefault();
    // make sure to check if the player is already a spectator
    /*
      emits to the server 'toggleSpectate' with
        { lobby: name of lobby,
          name: name of player,
          seat: name of seat,
        }
    */
  };

  // starts the game
  // if less than 4 players are joined do not let the game start
  const onGameStart = (e) => {
    e.preventDefault();

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
  const resetGame = (e) => {
    e.preventDefault();
    socket.emit('resetGame', lobby.name);
  };

  const display = () => {
    const endGameArray = ['wordGuessed', 'outOfTokens', 'outOfTime'];
    let gameState;
    if (endGameArray.includes(lobby.gameState)) {
      gameState = 'endGame';
    } else {
      gameState = lobby.gameState;
    }

    switch (gameState) {
      case ('lobby'):
        return (
          <Lobby
            lobby={lobby}
            toggleJoin={toggleJoin}
            onGameStart={onGameStart}
            loginData={loginData}
          />
        );
      case ('mayorPick'):
        return (
          <MayorPick
            lobby={lobby}
          />
        );
      case ('questionRound'):
        return (
          <QuestionRound
            lobby={lobby}
          />
        );
      case ('endGame'):
        return (
          <EndGame
            lobby={lobby}
            resetGame={resetGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {lobby && display()}
    </div>
  );
}

export default Game;
