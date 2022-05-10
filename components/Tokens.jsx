import { Button, UnorderedList, ListItem, Box } from '@chakra-ui/react';

function Tokens() {
  return (
    <Box>
      <Button w="30px" h="40px" name="red" borderRadius="full" background="#BB1F1F"
      pos="relative" top="35" left="5" fontWeight="extrabold">
        5
      </Button>
      <Button w="30px" h="40px" name="blue" borderRadius="full" background="#3A5DB6" pos="relative" fontWeight="extrabold">
        3
      </Button>
      <Button w="30px" h="40px" name="green" borderRadius="full" background="#3C8F45" pos="relative" top="35" right="5" fontWeight="extrabold">
        2
      </Button>
    </Box>
  );
}

export default Tokens;
