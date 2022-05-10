import { Button, UnorderedList, ListItem } from '@chakra-ui/react';
import GameTable from './GameTable';
import LobbyTable from './LobbyTable';

function Lobby({
  lobby, toggleJoin, onGameStart, loginData,
}) {
  return (
    <div>
      <h1>
        Lobby name:
        {lobby?.name}
      </h1>
      <h1>Current Players</h1>
      <UnorderedList>
        {lobby
          ? Object.keys(lobby.players).map((player) => (
            <ListItem key={player}>{lobby.players[player].name}</ListItem>
          ))
          : null}
      </UnorderedList>
      {lobby.gameState === "lobby" ? <GameTable toggleJoin={toggleJoin} loginData={loginData} lobby={lobby} /> : null }
      {lobby.gameState === "game" ? <LobbyTable toggleJoin={toggleJoin} loginData={loginData} lobby={lobby} /> : null }
      {lobby.host === loginData.name
        ? (
          <Button size="sm" onClick={(e) => onGameStart(e)}>
            Start
          </Button>
        ) : null}
      <br />
      <h1>Joined Players</h1>
      <UnorderedList>
        {lobby
          ? Object.keys(lobby.players).map((player) => (lobby.players[player].spectator ? null : (
            <ListItem key={player}>{lobby.players[player].name}</ListItem>
          )))
          : null}
      </UnorderedList>
      <h1>Spectators</h1>
      <UnorderedList>
        {lobby
          ? Object.keys(lobby.players).map((player) => (!lobby.players[player].spectator ? null : (
            <ListItem key={player}>{lobby.players[player].name}</ListItem>
          )))
          : null}
      </UnorderedList>
    </div>
  );
}

export default Lobby;
