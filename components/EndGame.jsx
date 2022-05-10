import { Button } from '@chakra-ui/react';

function EndGame({ lobby, resetGame, loginData }) {
  return (
    <div>
      <h1>
        This is the End Game component, and this is the game state:
        {' '}
        {lobby.gameState}
      </h1>
      {loginData.name === lobby.host
        ? <Button colorScheme="red" type="button" onClick={resetGame}>Reset Game</Button>
        : null}
    </div>
  );
}

export default EndGame;
