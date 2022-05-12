// display this screen only when the
// lobby.gameState === ('outOfTime' || 'outOfTokens' || 'wordGuessed')

import {
  useDisclosure, Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalBody, ModalFooter,
  Box,
} from '@chakra-ui/react';

import { useEffect } from 'react';

function EndScreen({ lobby, resetGame, loginData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  // check winner of the game based on gameState
  // if winners are wolves return true
  // if winners are villagers return false
  const checkWinner = () => {
    if (lobby?.werewolfVote?.length > 0) {
      // check who the werewoles voted on
      // check vs who lobby.seer really was
      lobby?.werewolfVote.forEach((vote) => {
        if (vote.name === lobby?.seer.name) {
          // wolves win
          return true;
        }
        // villagers win
        return false;
      });
    } else {
      // check array of villagerVotes to see who was voted the most
      // compare most voted to lobby.werewolf
      const voteCounts = {};
      lobby?.villagerVotes?.forEach((vote) => {
        if (voteCounts[vote.name]) {
          voteCounts[vote.name] += 1;
        } else {
          voteCounts[vote.name] = 1;
        }
      });

      const names = [];
      const sortedVals = Object.values(voteCounts).sort((a, b) => b - a);
      Object.keys(voteCounts).forEach((key) => {
        if (voteCounts[key] === sortedVals[0]) {
          names.push(key);
        }
      });

      if (names.length === 1) {
        // villagers win
        return false;
      }
      // wolves win
      return true;
    }
    return null;
  };

  const backToLobby = (e) => {
    e.preventDefault();
    onClose();
    resetGame();
  };

  return (
    <Modal
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center">
        <ModalHeader display="flex" flexDirection="column" alignItems="center">
          <Box fontSize="30px" textDecoration="underline">Winners</Box>
          {checkWinner() ? <Box fontSize="25px">Wolves</Box> : <Box fontSize="25px">Villagers</Box>}
        </ModalHeader>
        <ModalBody
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Box backgroundColor="#9D373B" color="#FFF"
            borderRadius="25px" display="flex" w="200px" h="25px" textAlign="center" justifyContent="center" marginBottom="10px">
              {lobby?.werewolf.length > 1 ? <div>Wolves:</div> : <div>Wolf:</div>}
              &nbsp;
              {lobby?.werewolf.map((wolf) => (<div>{wolf.name}</div>))}
            </Box>
            <Box backgroundColor="#D19E61"
            borderRadius="25px" display="flex" w="200px" h="25px" textAlign="center" justifyContent="center" marginBottom="10px">
              Seer:
              &nbsp;
              {lobby?.seer.name}
            </Box>
          </Box>
          {lobby?.host === loginData?.name ? <Button name="resetGame" onClick={(e) => backToLobby(e)}>Reset Game</Button> : null}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default EndScreen;
