import { Button, UnorderedList, ListItem } from '@chakra-ui/react';
import LobbyTable from './LobbyTable';
import Chat from './chat/Chat';

function Lobby({
  lobby, toggleJoin, onGameStart, loginData, toggleSpectate,
}) {
  return (
    <div className="background">
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
      <LobbyTable toggleJoin={toggleJoin} loginData={loginData} lobby={lobby} />
      <Chat players={lobby.players} username={loginData.name} lobby={loginData.lobby} />
      {lobby.host === loginData.name
        ? (
          <Button size="sm" onClick={(e) => onGameStart(e)}>
            Start
          </Button>
        ) : null}
      <br />
      <Button onClick={(e) => toggleSpectate(e)}>Spectate</Button>
      <Chat players={lobby.players} username={loginData.name} lobby={loginData.lobby} />
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
