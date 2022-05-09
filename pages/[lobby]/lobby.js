import { useState, useEffect, useContext } from "react";
import { StoreContext } from '../api/contextStore';
import { useRouter } from 'next/router';
import { socket } from '../api/service/socket';
import Lobby from '../../components/Lobby';

function Game() {
  const { lobby, setLobby, loginData, setLoginData } = useContext(StoreContext);
  const router = useRouter();

  useEffect(() => {
    if (loginData.create) {
      handleCreateLobby(loginData);
    } else {
      handleJoinLobby(loginData);
    }
  }, [])

  useEffect(() => {
    socket.on('lobby', (data) => {
      console.log(data.lobbyData);
      setLobby(data.lobbyData);
    });
  }, [socket]);

  const handleCreateLobby = (loginData) => {
    socket.emit("createLobby", {
      name: loginData.name,
      lobby: loginData.lobby,
    });
    socket.on("connectedToLobby", async (data) => {
      await setLobby(data.lobbyData);
    });
  };

  const handleJoinLobby = (loginData) => {
    socket.emit("joinLobby", {
      name: loginData.name,
      lobby: loginData.lobby
    });
    socket.on("connectedToLobby", async (data) => {
      await setLobby(data.lobbyData);
    });
  };

  // toggles player's spectator status'
  const toggleJoin = (e) => {
    e.preventDefault();
    socket.emit("toggleJoin", { name: loginData.name, lobby: lobby.name });
  };

  // starts the game
  const onGameStart = (e) => {
    e.preventDefault();
    // if less than 3 players are not spectators, do not let the game start
    const joinedCount = Object.keys(lobby.players).reduce(
      (prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev),
      0
    );

    if (joinedCount < 3) {
      alert("unable to start with less than 3 players joined");
      return;
    }
    // emit game start to the server and swap the page to the game
    socket.emit("gameStart", lobby.name);
  };

  const display = () => {
    switch (lobby.gameState) {
      case ('lobby'):
        return <Lobby lobby={lobby} toggleJoin={toggleJoin} onGameStart={onGameStart} />;
      case ('mayorPick'):
        return <h1>Mayor Picking</h1>;
      case ('questionRound'):
        return <h1>Question Round</h1>;
      case ('endGame'):
        return <h1>End Game</h1>;
      default:
        return <h1>No Game State</h1>;
    }
  }

  return (
    <div>
      {lobby && display()}
    </div>
  );
}

export default Game;
