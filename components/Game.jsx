import { Box } from "@chakra-ui/react";
import GameTable from "./GameTable";
import GameChat from "./chat/GameChat";

function Game({
  lobby,
  onMayorPick,
  afterQuestionsRound,
  resetGame,
  loginData,
}) {
  const spectators = Object.keys(lobby.players).reduce(
    (prev, player) => (lobby.players[player].spectator ? prev + 1 : prev),
    0
  );

  return (
    <div className="game-background">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          left: '20px',
          top: '600px',
        }}
      >
        <Box fontWeight="extrabold" fontSize="20" color="#FFF">
          {spectators}
          &nbsp;SPECTATORS
        </Box>
        <Box alignSelf="center"
        zIndex="100">
          <GameChat
            players={lobby?.players}
            username={loginData?.name}
            lobby={loginData?.lobby}
          />
        </Box>
      </div>
      <Box pos="relative"
        right="50"
        top="50"
      >
        <GameTable loginData={loginData} lobby={lobby} />
      </Box>
    </div>
  );
}

export default Game;
