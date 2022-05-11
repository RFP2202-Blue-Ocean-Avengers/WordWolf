import {
  Button, UnorderedList, ListItem, HStack, Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import LobbyTable from './LobbyTable';
import Timer from './Timer';
import Settings from './Settings';
import Rules from './Rules';
import Chat from './chat/Chat';
import GameLogo from '../assets/GameLogo.svg';

function Lobby({
  lobby, toggleJoin, onGameStart, loginData, updateTimer, toggleSpectate,
}) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + Math.floor(lobby.settings.minutes * 60) + lobby.settings.seconds);
  return (
    <div className="background">
      <Box className="logo">
        <Image src={GameLogo} />
      </Box>
      <Timer updateTimer={updateTimer} lobby={lobby} expiryTimestamp={time} />
      <h1 style={{ color: '#fff' }}>
        Lobby name:
        {lobby?.name}
      </h1>

      <HStack style={{ marginLeft: '30px' }}>
        <Chat players={lobby.players} username={loginData.name} lobby={loginData.lobby} />
        <Box w="40px" />
        <LobbyTable toggleJoin={toggleJoin} loginData={loginData} lobby={lobby} style={{ justifySelf: 'center' }} />
      </HStack>
      <HStack style={lobby.host === loginData.name ? { marginLeft: '75%' } : { marginLeft: '85%' }} spacing="20px">
        <Button onClick={(e) => toggleSpectate(e)} width="150px" height="50px" top="-20" bg="#D19E61">Spectate</Button>
        <br />
        {lobby.host === loginData.name
          ? (
            <Button width="150px" height="50px" top="-20" onClick={(e) => onGameStart(e)} bg="#D19E61">
              Start
            </Button>
          ) : null}
      </HStack>
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
