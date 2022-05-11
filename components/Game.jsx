import { Box } from '@chakra-ui/react';
import GameTable from './GameTable';
import GameChat from './chat/GameChat';
import MayorPickModal from './MayorPickModal';

function Game({
  lobby,
  onMayorPick,
  afterQuestionsRound,
  resetGame,
  loginData,
}) {
  const spectators = Object.keys(lobby.players).reduce(
    (prev, player) => (lobby.players[player].spectator ? prev + 1 : prev),
    0,
  );

  return (
    <div className="background">
      <GameTable loginData={loginData} lobby={lobby} />
      <Box fontWeight="extrabold" fontSize="20">
        {spectators}
        &nbsp;SPECTATORS
      </Box>
      <GameChat
        players={lobby?.players}
        username={loginData?.name}
        lobby={loginData?.lobby}
      />
      {lobby.mayor?.name === loginData.name ? (
        <MayorPickModal
          lobby={lobby}
          onMayorPick={onMayorPick}
        />
      ) : null}
    </div>
  );
}

export default Game;
