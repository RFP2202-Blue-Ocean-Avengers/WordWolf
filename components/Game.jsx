import { Box, HStack, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
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
import VillagerVote from './VillagerVote';
import WerewolfVote from './WerewolfVote';
import EndScreen from './EndScreen';
import AnsweredQuestions from './AnsweredQuestions';
import MayorDisplay from './MayorDisplay';

function Game({
  lobby,
  onMayorPick,
  onTimeout,
  afterVotingRound,
  resetGame,
  loginData,
  updateTimer,
}) {
  const [spectators, setSpectators] = useState(
    Object.keys(lobby.players).reduce(
      (prev, player) => (lobby.players[player].spectator ? prev + 1 : prev),
      0,
    ),
  );
  const [playerObj, setplayerObj] = useState(null);
  const [selected, setSelected] = useState(null);
  const is16 = (typeof window !== 'undefined' && window.innerWidth > 1500);

  useEffect(() => {
    const joined = Object.keys(lobby.players).reduce(
      (prev, player) => (lobby.players[player].spectator ? prev + 1 : prev),
      0,
    );
    setSpectators(joined);
  }, [lobby.players]);

  const tokenSetter = (name, token) => {
    setplayerObj(lobby?.players[name]);
    setSelected(token);
  };

  // for timer
  const time = new Date();
  time.setSeconds(
    time.getSeconds()
    + Math.floor(lobby.timer * 60),
  );

  return (
    <div className="game-background">
      <VStack
        name="main-container"
        alignItems="center"
        justifyContent="space-evenly"
      >
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
            onTimeout={onTimeout}
            afterVotingRound={afterVotingRound}
          />
          <Image src={GameLogo} />
          <Rules />
        </HStack>
        <HStack
          className="middleContainer"
          pos="relative"
          top="5"
          justifyContent="space-between"
          w="100vw"
        >
          <Box pos="relative" marginLeft="10px" transform="scale(0.9)">
            <AnsweredQuestions lobby={lobby} />
          </Box>
          <Box transform="scale(0.93)" pos="relative" right="223" style={is16 ? null : { marginLeft: '290px' }}>
            <GameTable
              tokenSetter={tokenSetter}
              loginData={loginData}
              lobby={lobby}
            />
          </Box>
          <Box style={is16 ? { position: 'absolute', top: '-1.2vh', right: '6vw' } : { position: 'absolute', top: '-1.2vh', right: '2vw' }}>
            <MayorDisplay mayor={lobby?.mayor.name} lobby={lobby} />
          </Box>
        </HStack>
        <HStack
          className="bottom-row"
          justify="space-between"
          w="100vw"
        >
          <Box
            className="gamechat"
            display="flex"
            flexDirection="column"
            transform="scale(0.98)"
            h="295"
            marginLeft="20px"
          >
            <Box fontWeight="extrabold" fontSize="30" color="#FFF">
              {spectators}
              &nbsp;SPECTATORS
            </Box>
            <GameChat
              players={lobby?.players}
              username={loginData?.name}
              lobby={loginData?.lobby}
            />
          </Box>
          <Box pos="relative" transform="scale(0.97)" top="20px" />
          <VStack
            display="flex"
            alignItems="end"
            position="relative"
            transform="scale(0.80)"
            top="18px"
          >
            <UserRole roles={lobby?.players[loginData.name].role} />
            {lobby?.mayor?.name === loginData.name
              ? (
                <Box
                  w="220px"
                  h="50px"
                  backgroundColor="#9D373B"
                  as="button"
                  color="#FFF"
                  fontSize="30px"
                  onClick={() => resetGame()}
                >
                  END
                </Box>
              ) : null}
          </VStack>
        </HStack>
      </VStack>
      {
        (lobby?.mayor?.name === loginData.name
          && lobby?.questions.length > 0 && lobby?.tokens > 0) ? (
            <Box pos="relative" right="220" top="435" transform="scale(0.83)" h="fit-content">
              <MayorQModal lobby={lobby} />
            </Box>
          ) : null
      }
      <MayorPickModal lobby={lobby} onMayorPick={onMayorPick} loginData={loginData} />
      {lobby?.gameState === 'endGame' ? <EndScreen lobby={lobby} resetGame={resetGame} loginData={loginData} /> : null}
      <Box
        pos="absolute"
        display="flex"
        w="100vw"
        justifyContent="center"
        alignItems="center"
      >
        <TokenModal
          player={playerObj}
          tokenType={selected}
          setplayerObj={setplayerObj}
        />
      </Box>
      {lobby.gameState === 'outOfTokens' || lobby.gameState === 'outOfTime' ? <VillagerVote lobby={lobby} loginData={loginData} /> : null}
      {lobby.gameState === 'wordGuessed' ? <WerewolfVote lobby={lobby} loginData={loginData} /> : null}
    </div>
  );
}

export default Game;
