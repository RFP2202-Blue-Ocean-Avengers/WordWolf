import { Box, HStack } from '@chakra-ui/react';
import Tokens from './Tokens';

function GameTable({ tokenSetter, lobby }) {
  let currentPlay;
  if (lobby.gameState !== 'questionRound') {
    currentPlay = lobby.gameState;
  } else if (lobby.gameState === 'questionRound') {
    if (lobby.questions.length === 0) {
      currentPlay = 'Question Round - Ask away!';
    } else {
      currentPlay = lobby.questions[0]?.message;
    }
  }

  return (
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
        {lobby?.seats?.seat1 ? (
          <Box
            // red
            name="seat1"
            id="#E6474E"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#E6474E"
            borderWidth="5px"
            borderColor="#E6474E"
            color="#333"
            fontWeight="600"
            pos="relative"
            top="-10"
            left="175"
          >
            {lobby?.seats?.seat1?.name.substring(0, 2).toUpperCase()}
          </Box>
        ) : (
          <Box
            // red
            name="seat1"
            id="#E6474E"
            as="button"
            w="70px"
            h="70px"
            pos="relative"
            top="-10"
            left="175"
          />
        )}
        {lobby?.seats?.seat6 ? (
          <Box
            name="seat6"
            id="#164186"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#164186"
            borderWidth="5px"
            borderColor="#164186"
            color="#fff"
            fontWeight="600"
            pos="relative"
            top="-10"
            left="340"
          >
            {lobby?.seats?.seat6?.name.substring(0, 2).toUpperCase()}
          </Box>
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
        {lobby?.seats?.seat2 ? (
          <Box
            // orange
            name="seat2"
            id="#F18E35"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#F18E35"
            borderWidth="5px"
            borderColor="#F18E35"
            color="#333"
            fontWeight="600"
            pos="relative"
            top="-10"
            left="500"
          >
            {lobby?.seats?.seat2?.name.substring(0, 2).toUpperCase()}
          </Box>
        ) : (
          <Box
            // orange
            name="seat2"
            id="#F18E35"
            as="button"
            w="70px"
            h="70px"
            pos="relative"
            top="-10"
            left="500"
          />
        )}
      </HStack>
      <HStack>
        {lobby?.seats?.seat10 ? (
          <Box
            // black
            name="seat10"
            id="#333333"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#333333"
            borderWidth="5px"
            borderColor="#333333"
            color="#fff"
            fontWeight="600"
            pos="relative"
            top="5"
            left="-2"
          >
            {lobby?.seats?.seat10?.name.substring(0, 2).toUpperCase()}
          </Box>
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
        {lobby?.seats?.seat8 ? (
          <Box
            // pink
            name="seat8"
            id="#D564D8"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#D564D8"
            borderWidth="5px"
            borderColor="#D564D8"
            color="#333"
            fontWeight="600"
            pos="relative"
            top="5"
            left="740"
          >
            {lobby?.seats?.seat8?.name.substring(0, 2).toUpperCase()}
          </Box>
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
        {lobby?.seats?.seat7 ? (
          <Box
            name="seat7"
            id="#582C71"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#582C71"
            borderWidth="5px"
            borderColor="#582C71"
            color="#fff"
            fontWeight="600"
            pos="relative"
            top="170"
            left="-2"
          >
            {lobby?.seats?.seat7?.name.substring(0, 2).toUpperCase()}
          </Box>
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
        {lobby?.seats?.seat9 ? (
          <Box
            name="seat9"
            id="#71362E"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#71362E"
            borderWidth="5px"
            borderColor="#71362E"
            color="#fff"
            fontWeight="600"
            pos="relative"
            top="170"
            left="740"
          >
            {lobby?.seats?.seat9?.name.substring(0, 2).toUpperCase()}
          </Box>
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
        {lobby?.seats?.seat3 ? (
          <Box
            name="seat3"
            id="#F5D74C"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#F5D74C"
            borderWidth="5px"
            borderColor="#F5D74C"
            color="#333"
            fontWeight="600"
            pos="relative"
            top="220"
            left="175"
          >
            {lobby?.seats?.seat3?.name.substring(0, 2).toUpperCase()}
          </Box>
        ) : (
          <Box
            name="seat3"
            id="#F5D74C"
            as="button"
            w="70px"
            h="70px"
            pos="relative"
            top="220"
            left="175"
          />
        )}
        {lobby?.seats?.seat5 ? (
          <Box
            name="seat5"
            id="#55BFDB"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#55BFDB"
            borderWidth="5px"
            borderColor="#55BFDB"
            color="#333"
            fontWeight="600"
            pos="relative"
            top="220"
            left="340"
          >
            {lobby?.seats?.seat5?.name.substring(0, 2).toUpperCase()}
          </Box>
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
        {lobby?.seats?.seat4 ? (
          <Box
            name="seat4"
            id="#54B877"
            as="button"
            w="70px"
            h="70px"
            borderRadius="full"
            background="#54B877"
            borderWidth="5px"
            borderColor="#54B877"
            color="#333"
            fontWeight="600"
            pos="relative"
            top="220"
            left="500"
          >
            {lobby?.seats?.seat4?.name.substring(0, 2).toUpperCase()}
          </Box>
        ) : (
          <Box
            name="seat4"
            id="#54B877"
            as="button"
            w="70px"
            h="70px"
            pos="relative"
            top="220"
            left="500"
          />
        )}
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
        {currentPlay}
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
      {lobby?.seats?.seat1 ? (
        <Box
          // red
          name="tokens1"
          pos="relative"
          left="185"
          bottom="330"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat1" />
        </Box>
      ) : (
        <Box
          // red
          name="tokens1"
          pos="relative"
          left="185"
          bottom="330"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat6 ? (
        <Box
          // blue
          name="tokens6"
          pos="relative"
          left="395"
          bottom="370"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat6" />
        </Box>
      ) : (
        <Box
          // blue
          name="tokens6"
          pos="relative"
          left="395"
          bottom="370"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat2 ? (
        <Box
          // orange
          name="tokens2"
          pos="relative"
          left="605"
          bottom="410"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat2" />
        </Box>
      ) : (
        <Box
          // orange
          name="tokens2"
          pos="relative"
          left="605"
          bottom="410"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat10 ? (
        <Box
          // black
          name="tokens10"
          pos="relative"
          left="50"
          bottom="370"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat10" />
        </Box>
      ) : (
        <Box
          // black
          name="tokens10"
          pos="relative"
          left="50"
          bottom="370"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat8 ? (
        <Box
          // pink
          name="tokens8"
          pos="relative"
          left="710"
          bottom="410"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat8" />
        </Box>
      ) : (
        <Box
          // pink
          name="tokens8"
          pos="relative"
          left="710"
          bottom="410"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat7 ? (
        <Box
          // purple
          name="tokens7"
          pos="relative"
          left="50"
          bottom="330"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat7" />
        </Box>
      ) : (
        <Box
          // purple
          name="tokens7"
          pos="relative"
          left="50"
          bottom="330"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat9 ? (
        <Box
          // brown
          name="tokens9"
          pos="relative"
          left="710"
          bottom="370"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat9" />
        </Box>
      ) : (
        <Box
          // brown
          name="tokens9"
          pos="relative"
          left="710"
          bottom="370"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat3 ? (
        <Box
          // yellow
          name="tokens3"
          pos="relative"
          left="185"
          bottom="330"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat3" />
        </Box>
      ) : (
        <Box
          // yellow
          name="tokens3"
          pos="relative"
          left="185"
          bottom="330"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat5 ? (
        <Box
          // lblue
          name="tokens5"
          pos="relative"
          left="395"
          bottom="370"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat5" />
        </Box>
      ) : (
        <Box
          // lblue
          name="tokens5"
          pos="relative"
          left="395"
          bottom="370"
          w="30px"
          h="40px"
        />
      )}
      {lobby?.seats?.seat4 ? (
        <Box
          // green
          name="tokens4"
          pos="relative"
          left="605"
          bottom="410"
        >
          <Tokens tokenSetter={tokenSetter} lobby={lobby} seat="seat4" />
        </Box>
      ) : (
        <Box
          // green
          name="tokens4"
          pos="relative"
          left="605"
          bottom="410"
          w="30px"
          h="40px"
        />
      )}
    </Box>
  );
}

export default GameTable;
