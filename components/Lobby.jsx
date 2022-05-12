import {
  Button, UnorderedList, ListItem, HStack, VStack, Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import LobbyTable from './LobbyTable';
import Settings from './Settings';
import Rules from './Rules';
import Chat from './chat/Chat';
import GameLogo from '../assets/GameLogo.svg';
import Timer from './Timer';

function Lobby({
  lobby, toggleJoin, onGameStart, loginData, toggleSpectate, updateTimer, afterQuestionsRound,
}) {
  const time = new Date();
  time.setSeconds(time.getSeconds()
  + Math.floor(lobby.settings.minutes * 60)
  + lobby.settings.seconds);
  console.log(window.innerWidth);
  return (
    <div className="background">
      <HStack
        name="top-row"
        justifyContent="space-evenly"
        w="100vw"
        style={{ paddingTop: '10px' }}
      >
        <Timer
          updateTimer={updateTimer}
          lobby={lobby}
          expiryTimestamp={time}
          afterQuestionsRound={afterQuestionsRound}
        />
        <Image src={GameLogo} />
        <Rules />
      </HStack>
      <Box className="chat" style={{ transform: 'scale(0.9)', marginRight: '90px' }}>
        <Chat players={lobby.players} username={loginData.name} lobby={loginData.lobby} />
      </Box>
      <Box style={window.innerWidth > 1500 ? { marginTop: '12vh' } : { marginTop: '6vh' }}>
        <LobbyTable toggleJoin={toggleJoin} loginData={loginData} lobby={lobby} />
      </Box>
      <Box className="lobby-btn">
        {lobby.host === loginData.name ? null : <Button onClick={(e) => toggleSpectate(e)} width="11vw" height="9vh" bg="#D19E61" fontSize="32px" borderRadius="0px">Spectate</Button>}
        {lobby.host === loginData.name
          ? (
            <Button width="11vw" height="9vh" onClick={(e) => onGameStart(e)} bg="#D19E61" fontSize="32px" borderRadius="0px">
              Start
            </Button>
          ) : null}
      </Box>
      <Box className="spectators-list">
        <h1>Spectators</h1>
        <UnorderedList>
          {lobby
            ? Object.keys(lobby.players).map((player) => (!lobby.players[player].spectator
              ? null
              : (
                <ListItem key={player} style={{ listStyle: 'none', marginLeft: '-15px' }}>{lobby.players[player].name}</ListItem>
              )))
            : null}
        </UnorderedList>
      </Box>
      <Box className="settings">
        <Settings updateTimer={updateTimer} lobby={lobby} />
      </Box>
    </div>
  );
}

export default Lobby;
