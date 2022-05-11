import { Box, HStack } from '@chakra-ui/react';

function LobbyTable({ toggleJoin, lobby }) {
  return (
    <Box w="900px" h="485px" background="#3A4171" borderWidth="10px" borderColor="#D19E61" borderRadius="full" bgGradient="linear(to-r, #3A4171, #2d3664)" marginRight="200px" justify="center">
      <HStack>
        <Box name="seat1" id="#E6474E" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat1 ? '#E6474E' : '#C4C4C4'} borderWidth="5px" borderColor="#E6474E" color="#333" fontWeight="600" pos="relative" top="-10" left="175" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat1?.name.substring(0, 2).toUpperCase()}</Box>
        <Box name="seat6" id="#164186" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat6 ? '#164186' : '#C4C4C4'} borderWidth="5px" borderColor="#164186" color="#fff" fontWeight="600" pos="relative" top="-10" left="340" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat6?.name.substring(0, 2).toUpperCase()}</Box>
        <Box name="seat2" id="#F18E35" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat2 ? '#F18E35' : '#C4C4C4'} borderWidth="5px" borderColor="#F18E35" color="#333" fontWeight="600" pos="relative" top="-10" left="500" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat2?.name.substring(0, 2).toUpperCase()}</Box>
      </HStack>
      <HStack>
        <Box name="seat10" id="#333333" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat10 ? '#333333' : '#C4C4C4'} borderWidth="5px" borderColor="#333333" color="#fff" fontWeight="600" pos="relative" top="5" left="-2" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat10?.name.substring(0, 2).toUpperCase()}</Box>
        <Box name="seat8" id="#D564D8" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat8 ? '#D564D8' : '#C4C4C4'} borderWidth="5px" borderColor="#D564D8" color="#333" fontWeight="600" pos="relative" top="5" left="740" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat8?.name.substring(0, 2).toUpperCase()}</Box>
      </HStack>
      <HStack>
        <Box name="seat7" id="#582C71" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat7 ? '#582C71' : '#C4C4C4'} borderWidth="5px" borderColor="#582C71" color="#fff" fontWeight="600" pos="relative" top="170" left="-2" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat7?.name.substring(0, 2).toUpperCase()}</Box>
        <Box name="seat9" id="#71362E" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat9 ? '#71362E' : '#C4C4C4'} borderWidth="5px" borderColor="#71362E" color="#fff" fontWeight="600" pos="relative" top="170" left="740" onClick={(e) => toggleJoin(e)}>
          {lobby?.seats?.seat9?.name.substring(0, 2).toUpperCase()}
        </Box>
      </HStack>
      <HStack>
        <Box name="seat3" id="#F5D74C" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat3 ? '#F5D74C' : '#C4C4C4'} borderWidth="5px" borderColor="#F5D74C" color="#333" fontWeight="600" pos="relative" top="220" left="175" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat3?.name.substring(0, 2).toUpperCase()}</Box>
        <Box name="seat5" id="#55BFDB" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat5 ? '#55BFDB' : '#C4C4C4'} borderWidth="5px" borderColor="#55BFDB" color="#333" fontWeight="600" pos="relative" top="220" left="340" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat5?.name.substring(0, 2).toUpperCase()}</Box>
        <Box name="seat4" id="#54B877" as="button" w="70px" h="70px" borderRadius="full" background={lobby.seats.seat4 ? '#54B877' : '#C4C4C4'} borderWidth="5px" borderColor="#54B877" color="#333" fontWeight="600" pos="relative" top="220" left="500" onClick={(e) => toggleJoin(e)}>{lobby?.seats?.seat4?.name.substring(0, 2).toUpperCase()}</Box>
      </HStack>
    </Box>
  );
}

export default LobbyTable;
