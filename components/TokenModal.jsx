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

function TokenModal({ player, setTokenType, tokenType }) {
  function onClick(currentToken) {
    setTokenType(currentToken);
  }

  function onCancel() {
    setTokenType(false);
  }

  return (
    <TokenModalContainer>
      <CloseButton onClick={() => onCancel()}>x</CloseButton>
      <ResponseContainer>
        <YesButton onClick={() => onClick('yes')}>Yes</YesButton>
        <NoButton onClick={() => onClick('no')}>No</NoButton>
        <MaybeButton onClick={() => onClick('maybe')}>Maybe</MaybeButton>
      </ResponseContainer>
      <TokenList>
        { player.player.tokens[tokenType].map((question) => (
          <IndividualQuestion question={question} />
        ))}
      </TokenList>
    </TokenModalContainer>
  );
}

export default TokenModal;
