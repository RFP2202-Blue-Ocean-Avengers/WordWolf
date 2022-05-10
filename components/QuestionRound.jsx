function QuestionRound({ lobby, afterQuestionRound, loginData }) {
  return (
    <div>
      This is the Question Round component, and this is the game state:
      {' '}
      {lobby.gameState}
    </div>
  );
}

export default QuestionRound;
