import { useTimer } from 'react-timer-hook';
import { useEffect } from 'react';

function Timer({ expiryTimestamp, updateTimer, lobby }) {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: (lobby.gameState==='mayorPick' ? false : true), onExpire: () => console.warn('onExpire called') });
  useEffect(() => {
    updateTimer({ minutes, seconds }, lobby);
  }, [seconds, minutes]);

  useEffect(() => {
    if (lobby.gameState === 'questionsRound') {
      // const time = new Date();
      // time.setSeconds(time.getSeconds() + Math.floor(lobby.settings.minutes * 60) + lobby.settings.seconds);
      start();
    } else if (lobby.gameState === 'outOfTokens' || lobby.gameState === 'outOfTime') {
      //condition for when people vote
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      restart(time);
    } else if (lobby.gameState === 'wordGuess') {
      //when werewolves vote
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      restart(time);
    }
  }, [lobby.gameState]);

  return (
    <div id="timerBox">
      <div id="timer">
        <span>{minutes}</span>
        :
        <span>{seconds < 10 ? ('0' + seconds) : seconds}</span>
      </div>
      {/* <button type="submit" onClick={start}>Start</button>
      <button type="submit" onClick={pause}>Pause</button>
      <button type="submit" onClick={resume}>Resume</button>
      <button
        type="submit"
        onClick={() => {
        // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </div>
  );
}

export default Timer;
