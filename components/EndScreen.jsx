// display this screen only when the
// lobby.gameState === ('outOfTime' || 'outOfTokens' || 'wordGuessed')

import {
  useDisclosure, Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalBody, ModalFooter,
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
    if (lobby.werewolfVote.length > 0) {
      // check who the werewoles voted on
      // check vs who lobby.seer really was
      lobby.werewolfVote.forEach((vote) => {
        if (vote.name === lobby.seer.name) {
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
        // villagers win
        return false;
      }
      // wolves win
      return true;
    }
    return null;
  };

  const backToLobby = () => {
    onClose();
    resetGame();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Winner:
          {' '}
          {checkWinner() ? <h1>Wolves!</h1> : <h1>Villagers!</h1>}
        </ModalHeader>
        <ModalBody>
          <div>
            {lobby.werewolf.length > 1 ? <h1>Wolves:</h1> : <h1>Wolf:</h1>}
            {lobby.werewolf.map((wolf) => (<h2>{wolf.name}</h2>))}
          </div>
          <div>
            <h1>Seer:</h1>
            <h2>{lobby.seer}</h2>
          </div>
          {lobby.host === loginData.name ? <Button name="resetGame" onClick={backToLobby}>Reset Game</Button> : null }
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default EndScreen;
