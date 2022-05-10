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
    } else if (lobby.players[loginData.name].seat && !lobby.seats[seat]) {
      socket.emit('swapSeats', { name: loginData.name, lobby: lobby.name, seat });
    } else {
      socket.emit('toggleJoin', { name: loginData.name, lobby: lobby.name, seat });
    }
  };

  const toggleSpectate = (e) => {
    const seat = e.target.name;
    // make sure to check if the player is already a spectator
    /*
      emits to the server 'toggleSpectate' with
        { lobby: name of lobby,
          name: name of player,
          seat: name of seat,
        }
    */
    socket.emit('toggleSpectate', { lobby: lobby.name, name: loginData.name, seat });
  };

  // starts the game
  // if less than 4 players are joined do not let the game start
  const onGameStart = () => {
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

  const onMayorPick = (word) => {
    socket.emit('onMayorPick', { lobby: lobby.name, word });
  };

  const afterQuestionsRound = (condition) => {
    socket.emit(condition, { lobby: lobby.name, condition });
  };

  // resets the game state to be a clean state
  const resetGame = () => {
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
            toggleSpectate={toggleSpectate}
            onGameStart={onGameStart}
            loginData={loginData}
          />
        );
      case ('mayorPick'):
        return (
          <MayorPick
            lobby={lobby}
            onMayorPick={onMayorPick}
            loginData={loginData}
          />
        );
      case ('questionRound'):
        return (
          <QuestionRound
            lobby={lobby}
            afterQuestionsRound={afterQuestionsRound}
            loginData={loginData}
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
      {/* {lobby && display()} */}

      {/* for testing purposes, I've displayed all the states of
      the game out onto the lobby screen by default */}
      {lobby
      && (
      <>
        <Lobby
          lobby={lobby}
          toggleJoin={toggleJoin}
          toggleSpectate={toggleSpectate}
          onGameStart={onGameStart}
          loginData={loginData}
        />

        <MayorPick
          lobby={lobby}
          onMayorPick={onMayorPick}
          loginData={loginData}
        />

        <QuestionRound
          lobby={lobby}
          afterQuestionsRound={afterQuestionsRound}
          loginData={loginData}
        />

        <EndGame
          lobby={lobby}
          resetGame={resetGame}
          loginData={loginData}
        />
      </>
      )}

    </div>
  );
}

export default Game;
