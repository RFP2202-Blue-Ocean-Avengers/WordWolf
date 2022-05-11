import {
  Button, UnorderedList, ListItem, HStack, VStack, Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import LobbyTable from './LobbyTable';
import Chat from './chat/Chat';
import GameLogo from '../assets/GameLogo.svg';

function Lobby({
  lobby, toggleJoin, onGameStart, loginData, toggleSpectate,
}) {
  return (
    <div className="background">
      <Box className="logo">
        <Image src={GameLogo} />
      </Box>
      <h1 style={{ color: '#fff', marginLeft: '45px' }}>
        Lobby name:
        {lobby?.name}
      </h1>

      <HStack style={{ marginLeft: '30px', marginTop: '40px' }}>
        <Box style={{ transform: 'scale(0.9)', marginRight: '90px' }}>
          <Chat players={lobby.players} username={loginData.name} lobby={loginData.lobby} />
        </Box>
        <LobbyTable toggleJoin={toggleJoin} loginData={loginData} lobby={lobby} style={{ justifySelf: 'center' }} />
        <Box style={{ alignSelf: 'flex-end' }}>
          <VStack spacing="-5px" style={{ marginLeft: '100px' }}>
            <Button onClick={(e) => toggleSpectate(e)} width="200px" height="70px" bg="#D19E61" fontSize="32px" borderRadius="0px">Spectate</Button>
            <br />
            {lobby.host === loginData.name
              ? (
                <Button width="200px" height="70px" onClick={(e) => onGameStart(e)} bg="#D19E61" fontSize="32px" borderRadius="0px">
                  Start
                </Button>
              ) : null}
          </VStack>
        </Box>
      </HStack>
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
