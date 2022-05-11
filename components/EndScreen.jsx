import {
  useDisclosure, Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalBody, ModalFooter,
} from '@chakra-ui/react';

import { useEffect } from 'react';

function EndScreen({ lobby, resetGame, loginData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const checkWinner = () => {
    if (lobby.gameState === 'outOfTime' || lobby.gameState === 'outOfTokens') {
      // check who the werewoles voted on
      // check vs who lobby.seer really was
      lobby.werewolfVote.forEach((vote) => {
        if (vote.name === lobby.seer.name) {
          return 'werewolf';
        }
        return 'villager';
      });
    } else if (lobby.gameState === 'wordGuessed') {
      // check array of villagerVotes to see who was voted the most
      // compare most voted to lobby.werewolf
      const voteCounts = {};
      lobby.villagerVotes.forEach((vote) => {
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
        return 'villager';
      }
      return 'werewolf';
    }
    return null;
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mayor! Choose a word!</ModalHeader>
        <ModalBody>
          {lobby.host === loginData.name ? <Button name="resetGame" onClick={(e) => resetGame(e)}>RESET GAME</Button> : null }
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default EndScreen;
