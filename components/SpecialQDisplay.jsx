import styled from 'styled-components';
import {
  Box, Flex, Text, HStack,
} from '@chakra-ui/react';
import { GrStar } from 'react-icons/gr';
import { BsExclamationLg } from 'react-icons/bs';
import { MdDoDisturb } from 'react-icons/md';

function SpecialQDisplay({ lobby }) {
  return (
    <Box w="500px" h="250px" backgroundColor="white" display="flex" flexDirection="column" justifyContent="center" paddingLeft="20px">
      <HStack alignItems="center" color="white">
        <CorrectToken><GrStar id="displayQCorrect" size={30} style={{ margin: '0px auto' }} /></CorrectToken>
        <Text fontSize="xl" color="black">
          {lobby?.correct?.message}
        </Text>
      </HStack>
      <HStack alignItems="center" color="white">
        <CloseToken><BsExclamationLg id="displayQClose" size={30} style={{ margin: '0px auto' }} /></CloseToken>
        <Text fontSize="xl" color="black">
          {lobby?.soClose?.message}
        </Text>
      </HStack>
      <HStack alignItems="center" color="white">
        <WayOffToken><MdDoDisturb id="displayQWayOff" size={30} style={{ margin: '0px auto' }} /></WayOffToken>
        <Text fontSize="xl" color="black">
          {lobby?.wayOff?.message}
        </Text>
      </HStack>
    </Box>
  );
}

export default SpecialQDisplay;

const CorrectToken = styled.button`
width: 45px;
height: 45px;
background-color: #F1CB00;
border-radius: 45px;
margin: 10px;
`;

const CloseToken = styled.button`
width: 45px;
height: 45px;
background-color: #C3E600;
border-radius: 45px;
margin: 10px;
`;

const WayOffToken = styled.button`
width: 45px;
height: 45px;
background-color: #714124;
border-radius: 45px;
margin: 10px;
`;
