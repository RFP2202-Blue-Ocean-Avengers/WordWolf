<<<<<<< HEAD
import IndividualQuestion from './IndividualQuestion';
=======
import { useState, useEffect } from 'react';
import IndividualQuestion from './IndividualQuestion';

>>>>>>> main
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
<<<<<<< HEAD
  // function onClick(currentToken) {
  //   setTokenType(player?[currentToken]);
  // }
=======
  const [tokenTypeSelected, setTokenType] = useState();

  useEffect(() => {
    setTokenType(tokenType);
  }, [tokenType]);

  function onClick(currentToken) {
    setTokenType(currentToken);
  }
>>>>>>> main

  function onCancel() {
    setplayerObj(null);
  }

  return (
<<<<<<< HEAD
    <TokenModalContainer>
      <CloseButton onClick={() => onCancel()}>x</CloseButton>
      <ResponseContainer>
        <YesButton onClick={() => onClick('yes')}>Yes</YesButton>
        <NoButton onClick={() => onClick('no')}>No</NoButton>
        <MaybeButton onClick={() => onClick('maybe')}>Maybe</MaybeButton>
      </ResponseContainer>
      <TokenList>
        {player?.tokens[tokenType].map((question) => (
          <IndividualQuestion question={question} />
        ))}
      </TokenList>
    </TokenModalContainer>
=======
    player
      ? (
        <TokenModalContainer>
          <CloseButton onClick={() => onCancel()}>x</CloseButton>
          <ResponseContainer>
            <YesButton onClick={() => onClick('yes')}>Yes</YesButton>
            <NoButton onClick={() => onClick('no')}>No</NoButton>
            <MaybeButton onClick={() => onClick('maybe')}>Maybe</MaybeButton>
          </ResponseContainer>
          <TokenList>
            {player.tokens[tokenTypeSelected]?.map((question) => (
              <IndividualQuestion question={question.message} />
            ))}
          </TokenList>
        </TokenModalContainer>
      ) : null
>>>>>>> main
  );
}

export default TokenModal;
