// table, the modals for each player etc etc

function MayorPick({ lobby, onMayorPick, loginData }) {
  return (
    <div>
      This is the MayorPick component, and this is the game state:
      {' '}
      {lobby.gameState}
    </div>
  );
}

export default MayorPick;
