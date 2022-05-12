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
          {lobby.words.map((word) => (
            <Button key={word} background="#D19E61" name={word} onClick={(e) => onWordPick(e)}>{word}</Button>))}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default MayorPickModal;
