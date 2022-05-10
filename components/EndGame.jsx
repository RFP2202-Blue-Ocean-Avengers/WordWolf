function EndGame({ lobby, resetGame, loginData }) {
  return (
    <div>
      <h1>{lobby.gameState}</h1>
      {loginData.name === lobby.host
        ? <button type="button" onClick={resetGame}>Reset Game</button>
        : null}
    </div>
  );
}

export default EndGame;
