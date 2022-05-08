import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../api/socketContext";
import { StoreContext } from '../api/contextStore';
import { Button, UnorderedList, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function Lobby({ playerData, lobbyData }) {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const { lobby, setLobby, player, setPlayer } = useContext(StoreContext);

  useEffect(() => {
    socket.on("lobby", (data) => {
      setLobby(data.lobbyData);
    });
  }, [socket]);

  // starts the game
  const onGameStart = (e) => {
    e.preventDefault();
    // if less than 3 players are not spectators, do not let the game start
    const joinedCount = Object.keys(lobby.players)
      .reduce((prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev), 0);

    if (joinedCount < 3) {
      alert('unable to start with less than 3 players joined');
      return;
    }
     // emit game start to the server and swap the page to the game
    socket.emit('gameStart', lobby.name);
    router.push(`/${lobby.name}/game`)
  };


  // toggles player's spectator status'
  const toggleJoin = (e) => {
    e.preventDefault();
    socket.emit('toggleJoin', { name: player.name, lobby: lobby.name });
  }

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
      <Button size="sm" onClick={(e) => toggleJoin(e)}>Join Game</Button>
      <Button size="sm" onClick={(e) => toggleJoin(e)}>Leave Game</Button>
      <Button size="sm" onClick={(e) => onGameStart(e)}>
        Start
      </Button>
    </div>
  );
}

export default Lobby;
