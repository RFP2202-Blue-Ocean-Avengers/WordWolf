import { useState, useEffect, useContext } from "react";
import { StoreContext } from '../api/contextStore';
import { Button, UnorderedList, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { socket } from '../api/service/socket';

function Lobby() {
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

  // starts the game
  const onGameStart = (lobby) => {
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

  // toggles player's spectator status'
  const toggleJoin = (lobby) => {
    e.preventDefault();
    socket.emit("toggleJoin", { lobby: lobby.name });
  };

  return (
    <div>
      <h1>Lobby name: {lobby?.name}</h1>
      <h1>Current Players</h1>
      <UnorderedList>
        {lobby
          ? Object.keys(lobby.players).map((player) => (
              <ListItem key={player}>{lobby.players[player].name}</ListItem>
            ))
          : null}
      </UnorderedList>
      {/* <Button size="sm" onClick={}>Join Game</Button>
      <Button size="sm" onClick={}>Leave Game</Button>
      <Button size="sm" onClick={}>
        Start
      </Button> */}
    </div>
  );
}

export default Lobby;
