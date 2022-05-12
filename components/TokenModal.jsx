import { useState, useEffect } from 'react';
import {
  useDisclosure, Button, Modal, ModalContent, ModalOverlay,
  ModalHeader, ModalBody, ModalFooter,
} from '@chakra-ui/react';
import IndividualQuestion from './IndividualQuestion';

import {
  TokenModalContainer,
  CloseButton,
  ResponseContainer,
  YesButton,
  NoButton,
  MaybeButton,
  TokenList,
} from './ModalStyles/Tokens';

// props: player object as "player" & list of default tokens as "selectedTokens"

function TokenModal({ player, setplayerObj, tokenType }) {
  const [tokenTypeSelected, setTokenType] = useState();

  useEffect(() => {
    setTokenType(tokenType);
  }, [tokenType]);

  function onClick(currentToken) {
    setTokenType(currentToken);
  }

  function onCancel() {
    setplayerObj(null);
  }

  return (
    <Modal isOpen={player}>
      <ModalOverlay />
      <ModalContent
      background="none"
      w="fit-content"
      >
        <TokenModalContainer>
          <CloseButton onClick={() => onCancel()}>x</CloseButton>
          <ResponseContainer>
            <YesButton onClick={() => onClick('yes')}>Yes</YesButton>
            <NoButton onClick={() => onClick('no')}>No</NoButton>
            <MaybeButton onClick={() => onClick('maybe')}>Maybe</MaybeButton>
          </ResponseContainer>
          <TokenList>
            {player?.tokens[tokenTypeSelected]?.map((question) => (
              <IndividualQuestion question={question.message} />
            ))}
          </TokenList>
        </TokenModalContainer>
      </ModalContent>
    </Modal>
  );
}

export default TokenModal;
