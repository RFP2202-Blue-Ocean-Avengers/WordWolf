import { Button, UnorderedList, ListItem } from '@chakra-ui/react';
import LobbyTable from './LobbyTable';
import JoinButtons from './lobby/JoinButtons';
import Timer from './Timer';
import Settings from './Settings';
import Rules from './Rules';

function Lobby({
  lobby, toggleJoin, onGameStart, loginData, updateTimer,
}) {
  const time = new Date();
  console.log(lobby.settings.minutes)
  time.setSeconds(time.getSeconds() + lobby.settings.minutes*60);
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
      <Timer updateTimer={updateTimer} lobby={lobby} expiryTimestamp={time} />
      <LobbyTable toggleJoin={toggleJoin} loginData={loginData} />
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
      <Settings updateTimer={updateTimer} lobby={lobby} />
      <Rules />
    </div>
  );
}

export default Lobby;
