import {
  Flex, Text,
  Button, Stack,
} from '@chakra-ui/react';
import Image from 'next/image';
import FarOffIcon from '../assets/FarOff.svg';
import SoCloseIcon from '../assets/SoClose.svg';
import CorrectIcon from '../assets/Correct.svg';

function SpecialQDisplay({ lobby }) {
  return (
    <Stack
      w="500px"
      h="250px"
      backgroundColor="white"
      justifyContent="space-evenly"
      paddingLeft="10"
    >
      <Flex alignItems="center">
        <Button id="correct" bg="#F1CB00" borderRadius="full" w="45px" h="45px" padding="0" _hover={{ bg: '#c5af34' }}><Image id="correct" src={CorrectIcon} /></Button>
        <Image src={CorrectIcon} />
        <Text fontSize="30" color="black" marginLeft="20px">
          {lobby.correct && lobby.correct.message}
        </Text>
      </Flex>
      <Flex alignItems="center">
        <Button id="soClose" bg="#C3E600" borderRadius="full" w="45px" h="45px" padding="1" _hover={{ bg: '#abc903' }}><Image id="soClose" src={SoCloseIcon} /></Button>
        <Text fontSize="30" color="black" marginLeft="20px">
          {lobby.soClose && lobby.soClose.message}
        </Text>
      </Flex>
      <Flex alignItems="center">
        <Button id="wayOff" bg="#714124" borderRadius="full" w="45px" h="45px" padding="2" _hover={{ bg: '#56321c' }}><Image id="wayOff" src={FarOffIcon} /></Button>
        <Text fontSize="30" color="black" marginLeft="20px">
          {lobby.wayOff && lobby.wayOff.message}
        </Text>
      </Flex>
    </Stack>
  );
}

export default SpecialQDisplay;
