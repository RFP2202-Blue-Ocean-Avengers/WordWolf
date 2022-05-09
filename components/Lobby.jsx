import { Button, UnorderedList, ListItem } from "@chakra-ui/react";

const Lobby = ({ lobby, toggleJoin, onGameStart }) => {
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
      <Button size="sm" onClick={(e) => toggleJoin(e)}>
        Toggle Join
      </Button>
      <Button size="sm" onClick={(e) => onGameStart(e)}>
        Start
      </Button>
      <br />
      <h1>Joined Players</h1>
      <UnorderedList>
        {lobby
          ? Object.keys(lobby.players).map((player) =>
              lobby.players[player].spectator ? null : (
                <ListItem key={player}>{lobby.players[player].name}</ListItem>
              )
            )
          : null}
      </UnorderedList>
    </div>
  );
};

export default Lobby;
