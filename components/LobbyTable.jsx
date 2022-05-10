import { Box, HStack } from '@chakra-ui/react';

function LobbyTable({ toggleJoin, lobby, player }) {
  let player1 = '';
  const selectP1 = (e) => {
    toggleJoin(e);
    player1 = player;
  };
  return (
    <>
      <Box h="100px" />
      <Box w="900px" h="485px" background="#3A4171" borderWidth="10px" borderColor="#D19E61" borderRadius="full" bgGradient="linear(to-r, #3A4171, #2d3664)" marginRight="200px" justify="center">
        <HStack>
          <Box name={player1} as="button" w="70px" h="70px" borderRadius="full" background={!player1 === '' ? '#E6474E' : '#C4C4C4'} borderWidth="5px" borderColor="#E6474E" pos="relative" top="-10" left="175" onClick={(e) => selectP1(e)} />
          {player1}
          <Box name="seat6" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#164186" pos="relative" top="-10" left="350" onClick={(e) => toggleJoin(e)} />
          <Box name="seat2" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#F18E35" pos="relative" top="-10" left="500" onClick={(e) => toggleJoin(e)} />
        </HStack>
        <HStack>
          <Box name="seat10" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#333333" pos="relative" top="5" left="-2" onClick={(e) => toggleJoin(e)} />
          <Box name="seat8" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#D564D8" pos="relative" top="5" left="740" onClick={(e) => toggleJoin(e)} />
        </HStack>
        <HStack>
          <Box name="seat7" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#582C71" pos="relative" top="170" left="-2" onClick={(e) => toggleJoin(e)} />
          <Box name="seat9" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#71362E" pos="relative" top="170" left="740" onClick={(e) => toggleJoin(e)} />
        </HStack>
        <HStack>
          <Box name="seat3" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#F5D74C" pos="relative" top="220" left="175" onClick={(e) => toggleJoin(e)} />
          <Box name="seat5" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#55BFDB" pos="relative" top="220" left="350" onClick={(e) => toggleJoin(e)} />
          <Box name="seat4" as="button" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#54B877" pos="relative" top="220" left="500" onClick={(e) => toggleJoin(e)} />
        </HStack>
      </Box>
    </>
  );
}

export default LobbyTable;
