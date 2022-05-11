import {
  useDisclosure, Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalBody, ModalFooter,
} from '@chakra-ui/react';

import { useEffect } from 'react';

function MayorPickModal({ lobby, onMayorPick }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onWordPick = (e) => {
    onClose();
    onMayorPick(e.target.name);
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent display="flex" flexDirection="column">
        <ModalHeader textAlign="center">Mayor! Choose a word!</ModalHeader>
        <ModalBody display="flex" justifyContent="space-evenly">
          <Button background="#D19E61" name={lobby.words[0]} onClick={(e) => onWordPick(e)}>{lobby.words[0]}</Button>
          <Button background="#D19E61" name={lobby.words[1]} onClick={(e) => onWordPick(e)}>{lobby.words[1]}</Button>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default MayorPickModal;
