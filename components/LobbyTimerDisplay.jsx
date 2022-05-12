function LobbyTimerDisplay({ lobby }) {
  return (
    <div id="timerBox">
      <div id="timer">
        <span>{lobby.settings.minutes}</span>
        :
        <span>{lobby.settings.seconds < 10 ? (`0${lobby.settings.seconds}`) : lobby.settings.seconds}</span>
      </div>
    </div>
  );
}

export default LobbyTimerDisplay;
