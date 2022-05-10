import { useState, useEffect, React } from 'react';
import IndividualQuestion from './IndividualQuestion.jsx';
import {
  TokenModalContainer,
  CloseButton,
  ResponseContainer,
  YesButton,
  NoButton,
  MaybeButton,
  TokenList,
} from './modalStyles/Tokens.js';

// props: player object as "player" & list of default tokens as "selectedTokens"

function TokenModal({ player, selectedTokens }) {
  const [currentTokenList, setTokenList] = useState(null);

  useEffect(() => {
    setTokenList(selectedTokens);
  }, [selectedTokens]);

  function onClick(tokenType) {
    setTokenList(player.tokens[tokenType]);
  }
  return (
    <TokenModalContainer>
      <CloseButton>x</CloseButton>
      <ResponseContainer>
        <YesButton onClick={() => onClick('yes')}>Yes</YesButton>
        <NoButton onClick={() => onClick('no')}>No</NoButton>
        <MaybeButton onClick={() => onClick('maybe')}>Maybe</MaybeButton>
      </ResponseContainer>
      <TokenList>
        { currentTokenList
          ? currentTokenList.map((question) => (
            <IndividualQuestion question={question} />
          ))
          : null }
      </TokenList>
    </TokenModalContainer>
  );
}

export default TokenModal;
