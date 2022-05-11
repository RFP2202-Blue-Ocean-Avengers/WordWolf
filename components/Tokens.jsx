import { Button, Box } from "@chakra-ui/react";

function Tokens({ tokenSetter, lobby, seat }) {
  const playerName = lobby?.seats[seat]?.name;

  return (
    <Box>
      <Button
        w="30px"
        h="40px"
        name="red"
        borderRadius="full"
        background="#BB1F1F"
        pos="relative"
        top="35"
        left="5"
        fontWeight="extrabold"
        onClick={() => tokenSetter(playerName, "no")}
      >
        {lobby?.players[playerName]?.tokens.no.length === 0
          ? 0
          : lobby?.players[playerName]?.tokens.no.length}
      </Button>
      <Button
        w="30px"
        h="40px"
        name="blue"
        borderRadius="full"
        background="#3A5DB6"
        pos="relative"
        fontWeight="extrabold"
        onClick={() => tokenSetter(playerName, "maybe")}
      >
        {lobby?.players[playerName]?.tokens.maybe.length === 0
          ? 0
          : lobby?.players[playerName]?.tokens.maybe.length}
      </Button>
      <Button
        w="30px"
        h="40px"
        name="green"
        borderRadius="full"
        background="#3C8F45"
        pos="relative"
        top="35"
        right="5"
        fontWeight="extrabold"
        onClick={() => tokenSetter(playerName, "yes")}
      >
        {lobby?.players[playerName]?.tokens.yes.length === 0
          ? 0
          : lobby?.players[playerName]?.tokens.yes.length}
      </Button>
    </Box>
  );
}

export default Tokens;
