import GameChat from './chat/GameChat';

function Game({
  lobby, onMayorPick, afterQuestionsRound, resetGame, loginData,
}) {
  return (
    <div>
      {' '}
      this is the game
      <GameChat players={lobby?.players} username={loginData?.name} lobby={loginData?.lobby} />
    </div>
  );
}

export default Game;
