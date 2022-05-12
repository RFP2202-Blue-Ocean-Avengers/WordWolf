import { Box, HStack, VStack } from '@chakra-ui/react';
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
import VillagerVote from './VillagerVote';
import WerewolfVote from './WerewolfVote';
import AnsweredQuestions from './AnsweredQuestions';

function Game({
  lobby,
  onMayorPick,
  onTimeout,
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
      <AnsweredQuestions lobby={lobby} />
      <VStack
        name="main-container"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <HStack
          name="top-row"
          justifyContent="space-evenly"
          w="100vw"
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
          transform="scale(0.93)"
          pos="relative"
          left="90"
        >
          <GameTable
            tokenSetter={tokenSetter}
            loginData={loginData}
            lobby={lobby}
          />
        </HStack>
        <HStack
          className="bottom-row"
          justify="space-between"
          w="100vw"
        >
          <Box
            className="chat"
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
                >
                  END
                </Box>
              ) : null}
          </VStack>
        </HStack>
      </VStack>
      {
        lobby?.mayor?.name === loginData.name && lobby?.questions.length > 0 ? (
          <Box pos="relative" right="220" top="400" transform="scale(0.83)">
            <MayorQModal lobby={lobby} />
          </Box>
        ) : null
      }
      {(lobby?.players[loginData.name].role !== 'werewolf') && ((lobby.gameState === 'outOfTokens') || (lobby.gameState === 'outOfTime')) ? <VillagerVote /> : <VillagerVote />}
      {(lobby?.players[loginData.name].role === 'werewolf') && (lobby.gameState === 'wordGuessed') ? <WerewolfVote /> : <WerewolfVote />}
      {
        lobby?.mayor?.name === loginData.name ? (
          <MayorPickModal lobby={lobby} onMayorPick={onMayorPick} />
        ) : null
      }
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
    </div>
  );
}

export default Game;
