import { Button, UnorderedList, ListItem } from '@chakra-ui/react';
import JoinButtons from './Lobby/JoinButtons';

function Lobby({
  lobby, toggleJoin, toggleSpectate, onGameStart, loginData,
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
      <JoinButtons lobby={lobby} toggleJoin={toggleJoin} />
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
