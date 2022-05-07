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
      <Button size="sm" onClick={() => router.push(`/${lobby.name}/game`)}>
        Start
      </Button>
    </div>
  );
}

export default Lobby;
