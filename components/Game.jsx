import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import GameTable from "./GameTable";
import GameChat from "./chat/GameChat";
import GameLogo from "../assets/GameLogo.svg";
import UserRole from "./UserRole";
import TokenModal from "./TokenModal";
import MayorPickModal from './MayorPickModal';
import Timer from './Timer';

function Game({
  lobby,
  onMayorPick,
  afterQuestionsRound,
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

  function tokenSetter(name, token) {
    setplayerObj(lobby.players[name]);
    setSelected(lobby.players[name].tokens[token]);
  }
  //for timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + Math.floor(lobby.settings.minutes * 60) + lobby.settings.seconds);

  return (
    <div className="game-background">
      <Box className="logo">
        <Image src={GameLogo} />
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          left: "20px",
          top: "575px",
          transform: "scale(0.93)",
        }}
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
      </div>
      <Box
        pos="relative"
        top="125"
        right="140"
        w="fit-content"
        h="fit-content"
        transform="scale(0.93)"
      >
        <GameTable
          tokenSetter={tokenSetter}
          loginData={loginData}
          lobby={lobby}
        />
      </Box>
      <Box pos="absolute" bottom="250" right="20">
        <UserRole role={lobby.players[loginData.name].role} />
      </Box>
      <Box>
        <TokenModal player={playerObj} selectedTokens={selected} />
      </Box>
      {lobby?.mayor?.name === loginData.name ? (
        <MayorPickModal
          lobby={lobby}
          onMayorPick={onMayorPick}
        />
      ) : null}
      <Timer updateTimer={updateTimer} lobby={lobby} expiryTimestamp={time} afterQuestionsRound={afterQuestionsRound} />
    </div>
  );
}

export default Game;
