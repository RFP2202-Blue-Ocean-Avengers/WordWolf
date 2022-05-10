import { Box } from '@chakra-ui/react';

function LobbyTable({ toggleJoin, lobby }) {
  return (
    <Box w="900px" h="485px" background="#3A4171" borderWidth="10px" borderColor="#D19E61" borderRadius="full" bgGradient="linear(to-r, #3A4171, #2d3664)">
      <Box name="seat1" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat1 ? '#E6474E' : '#C4C4C4'} borderWidth="5px" borderColor="#E6474E" pos="relative" top="-10" left="175" onClick={(e) => toggleJoin(e)} />
      <Box name="seat2" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#F18E35" pos="relative" top="7" left="655" />
      <Box name="seat3" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#F5D74C" pos="absolute" top="490" left="175" />
      <Box name="seat4" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#54B877" pos="absolute" top="490" left="655" />
      <Box name="seat5" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#55BFDB" pos="absolute" top="490" left="415" />
      <Box name="seat6" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#164186" pos="absolute" top="5" left="415" />
      <Box name="seat7" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#582C71" pos="absolute" top="370" left="2" />
      <Box name="seat8" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#D564D8" pos="absolute" top="140" left="825" />
      <Box name="seat9" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#71362E" pos="absolute" top="370" left="825" />
      <Box name="seat10" w="70px" h="70px" borderRadius="full" background="#C4C4C4" borderWidth="5px" borderColor="#333333" pos="absolute" top="140" left="2" />
    </Box>
  );
}

export default LobbyTable;
