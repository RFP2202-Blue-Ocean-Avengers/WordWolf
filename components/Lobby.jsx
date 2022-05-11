import { Button, UnorderedList, ListItem } from '@chakra-ui/react';
import LobbyTable from './LobbyTable';
import Timer from './Timer';
import Settings from './Settings';
import Rules from './Rules';

function Lobby({
  lobby, toggleJoin, onGameStart, loginData, updateTimer, toggleSpectate,
}) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + Math.floor(lobby.settings.minutes * 60) + lobby.settings.seconds);
  return (
    <div>
      <Timer updateTimer={updateTimer} lobby={lobby} expiryTimestamp={time} />
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
      <LobbyTable toggleJoin={toggleJoin} lobby={lobby} />
      {lobby.host === loginData.name
        ? (
          <Button size="sm" onClick={(e) => onGameStart(e)}>
            Start
          </Button>
        ) : null}
      <br />
      <Button onClick={(e) => toggleSpectate(e)}>Spectate</Button>
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
