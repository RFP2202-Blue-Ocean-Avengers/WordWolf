import {
  Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalBody, ModalFooter, Box,
} from '@chakra-ui/react';

function MayorPickModal({ lobby, onMayorPick, loginData }) {
  const onWordPick = (e) => {
    onMayorPick(e.target.name);
  };

  return (
    <Modal isOpen={lobby.gameState === 'mayorPick'}>
      <ModalOverlay />
      <ModalContent display="flex" flexDirection="column">
        <ModalHeader textAlign="center">
          {lobby?.mayor?.name === loginData.name
            ? <Box>Mayor! Choose a word!</Box> : <Box>Mayor is choosing a word!</Box>}
        </ModalHeader>
        <ModalBody>
          {lobby?.mayor?.name === loginData.name
            ? (
              <Box display="flex" justifyContent="space-evenly">
                <Button background="#D19E61" name={lobby.words[0]} onClick={(e) => onWordPick(e)}>{lobby.words[0]}</Button>
                <Button background="#D19E61" name={lobby.words[1]} onClick={(e) => onWordPick(e)}>{lobby.words[1]}</Button>
              </Box>
            ) : <Box display="flex" justifyContent="center">Please wait!</Box>}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default MayorPickModal;
