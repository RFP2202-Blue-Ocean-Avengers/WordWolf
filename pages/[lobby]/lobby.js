import { useEffect, useContext } from 'react';
import { StoreContext } from '../api/contextStore';
import { socket } from '../api/service/socket';
import Lobby from '../../components/Lobby';
import Chat from '../../components/chat/Chat';
import GameChat from '../../components/chat/GameChat';

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

  // if a player clicks this button, it would remove them from their seat and move them to spectate
  // also make sure it emits to the backend
  const toggleSpectate = (e) => {
    e.preventDefault();
  };

  // starts the game
  const onGameStart = (e) => {
    e.preventDefault();
    // if less than 3 players are not spectators, do not let the game start
    const joinedCount = Object.keys(lobby.players).reduce(
      (prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev),
      0,
    );

    if (joinedCount < 3) {
      alert('unable to start with less than 3 players joined');
      return;
    }
    // emit game start to the server and swap the page to the game
    socket.emit('gameStart', lobby.name);
  };

  const display = () => {
    switch (lobby.gameState) {
      case ('lobby'):
        return (
          <div>
            <Lobby
              lobby={lobby}
              toggleJoin={toggleJoin}
              onGameStart={onGameStart}
            />
            <Chat username={loginData.name} lobby={loginData.lobby} />
          </div>
        );
      case ('mayorPick'):
        return <h1>Mayor Picking</h1>;
      case ('questionRound'):
        return (
          <div>
            <h1>Question Round</h1>
            <GameChat username={loginData.name} lobby={loginData.lobby} />
          </div>
        );

      case ('endGame'):
        return <h1>End Game</h1>;
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
