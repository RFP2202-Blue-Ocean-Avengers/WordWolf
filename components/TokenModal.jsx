import { useState, useEffect } from 'react';
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

function TokenModal({ player, selectedTokens, lobby }) {
  const [currentTokenList, setTokenList] = useState(null);

  useEffect(() => {
    setTokenList(selectedTokens);
  }, [selectedTokens]);

  function onClick(tokenType) {
    setTokenList(player?.tokens[tokenType]);
  }

  function onCancel() {
    setTokenList(null);
  }

  return (
    <div>
      { currentTokenList
        ? (
          <TokenModalContainer>
            <CloseButton onClick={() => onCancel()}>x</CloseButton>
            <ResponseContainer>
              <YesButton onClick={() => onClick('yes')}>Yes</YesButton>
              <NoButton onClick={() => onClick('no')}>No</NoButton>
              <MaybeButton onClick={() => onClick('maybe')}>Maybe</MaybeButton>
            </ResponseContainer>
            <TokenList>
              { currentTokenList.map((question) => (
                <IndividualQuestion question={question} />
              ))}
            </TokenList>
          </TokenModalContainer>
        )
        : null }
    </div>
  );
}

export default TokenModal;
