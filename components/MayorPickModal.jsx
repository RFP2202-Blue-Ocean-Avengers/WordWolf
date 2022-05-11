import {
  useDisclosure, Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';

function MayorPickModal({ lobby, onMayorPick }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onWordPick = (e) => {
    // close modal
    onMayorPick(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mayor! Choose a word!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button onClick={(e) => onWordPick(e)}>{lobby.words[0]}</Button>
          <Button onClick={(e) => onWordPick(e)}>{lobby.words[1]}</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MayorPickModal;
