import GameTable from './GameTable';
import GameChat from './chat/Chat';

function Game(lobby, onMayorPick, afterQuestionsRound, resetGame, loginData) {
  return (
    <div>
      <GameTable loginData={loginData} lobby={lobby} />
      <GameChat
        players={lobby?.players}
        username={loginData.name}
        lobby={loginData.lobby}
      />
    </div>
  );
}

export default Game;
