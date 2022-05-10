import React from 'react';
import IndividualQuestion from './IndividualQuestion.jsx'
import {
  TokenModalContainer,
  CloseButton,
  ResponseContainer,
  YesButton,
  NoButton,
  MaybeButton,
  TokenList,
} from './ModalStyles/Tokens.js';

function TokenModal() {
  return (
    <TokenModalContainer>
      <CloseButton>x</CloseButton>
      <ResponseContainer>
        <YesButton>Yes</YesButton>
        <NoButton>No</NoButton>
        <MaybeButton>Maybe</MaybeButton>
      </ResponseContainer>
      <TokenList>
        <IndividualQuestion />
      </TokenList>
    </TokenModalContainer>
  );
}

export default TokenModal;
