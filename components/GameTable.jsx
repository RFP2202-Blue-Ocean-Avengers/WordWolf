import { Box, HStack } from "@chakra-ui/react";
import Tokens from "./Tokens.jsx";

function GameTable({ lobby }) {
  // const players = Object.keys(lobby.players).length;
  console.log(lobby);
  const players = 10;

  return (
    <>
      <Box h="100px" display="flex" />
      <Box
        w="900px"
        h="485px"
        background="#3A4171"
        borderWidth="10px"
        borderColor="#D19E61"
        borderRadius="full"
        bgGradient="linear(to-r, #3A4171, #2d3664)"
        marginRight="200px"
        justify="center"
      >
        <HStack>
          <Box
            //red
            name="seat1"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#E6474E"
            borderWidth="5px"
            borderColor="#E6474E"
            pos="relative"
            top="-10"
            left="175"
          />
          {players >= 6 ? (
            <Box
              //blue
              name="seat6"
              w="70px"
              h="70px"
              borderRadius="full"
              background="#164186"
              borderWidth="5px"
              borderColor="#164186"
              pos="relative"
              top="-10"
              left="340"
            />
          ) : (
            <Box
              name="seat6"
              w="70px"
              h="70px"
              pos="relative"
              top="-10"
              left="340"
            />
          )}
          <Box
            //orange
            name="seat2"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#F18E35"
            borderWidth="5px"
            borderColor="#F18E35"
            pos="relative"
            top="-10"
            left="500"
          />
        </HStack>
        <HStack>
          {players === 10 ? (
            <Box
              //black
              name="seat10"
              w="70px"
              h="70px"
              borderRadius="full"
              background="#333333"
              borderWidth="5px"
              borderColor="#333333"
              pos="relative"
              top="5"
              left="-2"
            />
          ) : (
            <Box
              name="seat10"
              w="70px"
              h="70px"
              pos="relative"
              top="5"
              left="-2"
            />
          )}
          {players >= 8 ? (
            <Box
              //pink
              name="seat8"
              w="70px"
              h="70px"
              borderRadius="full"
              background="#D564D8"
              borderWidth="5px"
              borderColor="#D564D8"
              pos="relative"
              top="5"
              left="740"
            />
          ) : (
            <Box
              name="seat8"
              w="70px"
              h="70px"
              pos="relative"
              top="5"
              left="740"
            />
          )}
        </HStack>
        <HStack>
          {players >= 7 ? (
            <Box
              //purple
              name="seat7"
              w="70px"
              h="70px"
              borderRadius="full"
              background="#582C71"
              borderWidth="5px"
              borderColor="#582C71"
              pos="relative"
              top="170"
              left="-2"
            />
          ) : (
            <Box
              name="seat7"
              w="70px"
              h="70px"
              pos="relative"
              top="170"
              left="-2"
            />
          )}
          {players >= 9 ? (
            <Box
              //brown
              name="seat9"
              w="70px"
              h="70px"
              borderRadius="full"
              background="#71362E"
              borderWidth="5px"
              borderColor="#71362E"
              pos="relative"
              top="170"
              left="740"
            />
          ) : (
            <Box
              name="seat9"
              w="70px"
              h="70px"
              pos="relative"
              top="170"
              left="740"
            />
          )}
        </HStack>
        <HStack>
          <Box
            //yellow
            name="seat3"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#F5D74C"
            borderWidth="5px"
            borderColor="#F5D74C"
            pos="relative"
            top="220"
            left="175"
          />
          {players >= 5 ? (
            <Box
              //lblue
              name="seat5"
              w="70px"
              h="70px"
              borderRadius="full"
              background="#55BFDB"
              borderWidth="5px"
              borderColor="#55BFDB"
              pos="relative"
              top="220"
              left="340"
            />
          ) : (
            <Box
              name="seat5"
              w="70px"
              h="70px"
              pos="relative"
              top="220"
              left="340"
            />
          )}
          <Box
            //green
            name="seat4"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#54B877"
            borderWidth="5px"
            borderColor="#54B877"
            pos="relative"
            top="220"
            left="500"
          />
        </HStack>
        <Box
          pos="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          bottom="90"
          left="225"
          width="460px"
          height="60px"
          background="#FFFFFF"
        >
          {lobby.gameState !== "questionRound"
            ? lobby.gameState
            : lobby.questions[0]}
        </Box>
        <Box
          marginTop="10px"
          pos="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          bottom="95"
          left="15"
          color="white"
          fontWeight="bold"
        >
          Tokens remaining: &nbsp;
          {lobby.tokens}
        </Box>
        <Box
          // red
          name="tokens1"
          pos="relative"
          left="185"
          bottom="330"
        >
          <Tokens />
        </Box>
        {players >= 6 ? (
          <Box
            // blue
            name="tokens6"
            pos="relative"
            left="395"
            bottom="370"
          >
            <Tokens />
          </Box>
        ) : null}
        <Box
          // orange
          name="tokens2"
          pos="relative"
          left="605"
          bottom="410"
        >
          <Tokens />
        </Box>
        {players === 10 ? (
          <Box
            // black
            name="tokens10"
            pos="relative"
            left="50"
            bottom="370"
          >
            <Tokens />
          </Box>
        ) : null}
        {players >= 8 ? (
          <Box
            // pink
            name="tokens8"
            pos="relative"
            left="710"
            bottom="410"
          >
            <Tokens />
          </Box>
        ) : null}
        {players >= 7 ? (
          <Box
            // purple
            name="tokens7"
            pos="relative"
            left="50"
            bottom="330"
          >
            <Tokens />
          </Box>
        ) : null}
        {players >= 9 ? (
          <Box
            // brown
            name="tokens9"
            pos="relative"
            left="710"
            bottom="370"
          >
            <Tokens />
          </Box>
        ) : null}
        <Box
          // yellow
          name="tokens3"
          pos="relative"
          left="185"
          bottom="330"
        >
          <Tokens />
        </Box>
        {players >= 5 ? (
          <Box
            // lblue
            name="tokens5"
            pos="relative"
            left="395"
            bottom="370"
          >
            <Tokens />
          </Box>
        ) : null}
        <Box
          // green
          name="tokens4"
          pos="relative"
          left="605"
          bottom="410"
        >
          <Tokens />
        </Box>
      </Box>
    </>
  );
}

export default GameTable;
