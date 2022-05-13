import { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import IndividualQuestion from './IndividualQuestion';
import {
  TokenModalContainer,
  CloseButton,
  ResponseContainer,
  YesButton,
  NoButton,
  MaybeButton,
  TokenListYes,
  TokenListNo,
  TokenListMaybe,
} from './ModalStyles/Tokens';

// props: player object as "player" & list of default tokens as "selectedTokens"

function TokenModal({ player, setplayerObj, tokenType }) {
  const [tokenTypeSelected, setTokenType] = useState();
  const yesRef = useRef(null);
  const noRef = useRef(null);
  const maybeRef = useRef(null);

  function onClick(currentToken) {
    setTokenType(currentToken);
  }

  function onCancel() {
    setplayerObj(null);
  }

  useEffect(() => {
    setTokenType(tokenType);
    if (tokenType === 'yes') {
      yesRef.current?.focus();
    }
    if (tokenType === 'no') {
      noRef.current?.focus();
    }
    if (tokenType) {
      maybeRef.current?.focus();
    }
  }, [tokenType]);

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
            <YesButton onClick={() => onClick('yes')} ref={yesRef}>Yes</YesButton>
            <NoButton onClick={() => onClick('no')} ref={noRef}>No</NoButton>
            <MaybeButton onClick={() => onClick('maybe')} ref={maybeRef}>Maybe</MaybeButton>
          </ResponseContainer>
          {tokenTypeSelected === 'yes'
            ? (
              <TokenListYes>
                {player?.tokens[tokenTypeSelected]?.map((question) => (
                  <IndividualQuestion question={question.message} />
                ))}
              </TokenListYes>
            ) : null}
          {tokenTypeSelected === 'no'
            ? (
              <TokenListNo>
                {player?.tokens[tokenTypeSelected]?.map((question) => (
                  <IndividualQuestion question={question.message} />
                ))}
              </TokenListNo>
            ) : null}
          {tokenTypeSelected === 'maybe'
            ? (
              <TokenListMaybe>
                {player?.tokens[tokenTypeSelected]?.map((question) => (
                  <IndividualQuestion question={question.message} />
                ))}
              </TokenListMaybe>
            ) : null}
        </TokenModalContainer>
      </ModalContent>
    </Modal>
  );
}

export default TokenModal;
