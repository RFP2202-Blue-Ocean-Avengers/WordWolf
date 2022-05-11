import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Image from 'next/image';
import GameTable from './GameTable';
import GameChat from './chat/GameChat';
import GameLogo from '../assets/GameLogo.svg';
import UserRole from './UserRole';
import TokenModal from './TokenModal';
import MayorPickModal from './MayorPickModal';
import MayorQModal from './MayorQModal';
import Timer from './Timer';
import Rules from './Rules';

function Game({
  lobby,
  onMayorPick,
  afterQuestionsRound,
  afterVotingRound,
  resetGame,
  loginData,
  updateTimer,
}) {
  const spectators = Object.keys(lobby.players).reduce(
    (prev, player) => (lobby.players[player].spectator ? prev + 1 : prev),
    0,
  );

  const [playerObj, setplayerObj] = useState(null);
  const [selected, setSelected] = useState(null);

  const tokenSetter = (name, token) => {
    setplayerObj(lobby?.players[name]);
    setSelected(token);
  };

  // for timer
  const time = new Date();
  time.setSeconds(
    time.getSeconds()
    + Math.floor(lobby.settings.minutes * 60)
    + lobby.settings.seconds,
  );

  return (
    <div className="game-background">
      <Box
        name="main-container"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <Box
          name="top-row"
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          w="100vw"
        >
          <Timer
            updateTimer={updateTimer}
            lobby={lobby}
            expiryTimestamp={time}
            afterQuestionsRound={afterQuestionsRound}
            afterVotingRound={afterVotingRound}
          />
          <Image src={GameLogo} />
          <Rules />
        </Box>
        <Box
          className="middleContainer"
          display="flex"
          transform="scale(0.93)"
          pos="relative"
          left="95"
        >
          <GameTable
            tokenSetter={tokenSetter}
            loginData={loginData}
            lobby={lobby}
          />
        </Box>
        <Box
          className="bottom-container"
          display="flex"
          flexDirection="row"
        >
          <Box
            className="chat"
            display="flex"
            flexDirection="column"
            transform="scale(0.93)"
          >
            <Box fontWeight="extrabold" fontSize="30" color="#FFF">
              {spectators}
              &nbsp;SPECTATORS
            </Box>
            <Box alignSelf="center">
              <GameChat
                players={lobby?.players}
                username={loginData?.name}
                lobby={loginData?.lobby}
              />
            </Box>
          </Box>
          <UserRole role={lobby.players[loginData.name].role} />
          <Box>
            <TokenModal
              player={playerObj}
              tokenType={selected}
              setplayerObj={setplayerObj}
            />
          </Box>
          {lobby?.mayor?.name === loginData.name && lobby?.questions.length > 0 ? (
            <Box pos="relative" right="160" top="400">
              <MayorQModal lobby={lobby} />
            </Box>
          ) : null}
        </Box>
      </Box>
      {lobby?.mayor?.name === loginData.name ? (
        <MayorPickModal lobby={lobby} onMayorPick={onMayorPick} />
      ) : null}
    </div>
  );
}

export default Game;
