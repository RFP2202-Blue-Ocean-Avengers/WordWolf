import IndividualQuestion from "./IndividualQuestion";
import {
  TokenModalContainer,
  CloseButton,
  ResponseContainer,
  YesButton,
  NoButton,
  MaybeButton,
  TokenList,
} from "./ModalStyles/Tokens";

// props: player object as "player" & list of default tokens as "selectedTokens"

function TokenModal({ player, setplayerObj, tokenType }) {

  function onClick(currentToken) {
    setTokenType(player?[currentToken]);
  }

  function onCancel() {
    setplayerObj(null);
  }

  return (
    <TokenModalContainer>
      <CloseButton onClick={() => onCancel()}>x</CloseButton>
      <ResponseContainer>
        <YesButton onClick={() => onClick("yes")}>Yes</YesButton>
        <NoButton onClick={() => onClick("no")}>No</NoButton>
        <MaybeButton onClick={() => onClick("maybe")}>Maybe</MaybeButton>
      </ResponseContainer>
      <TokenList>
        {player?.tokens[tokenType].map((question) => (
          <IndividualQuestion question={question} />
        ))}
      </TokenList>
    </TokenModalContainer>
  );
}

export default TokenModal;
