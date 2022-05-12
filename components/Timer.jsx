import { useTimer } from 'react-timer-hook';
import { useEffect } from 'react';

function Timer({
  expiryTimestamp, updateTimer, lobby, onTimeout, afterVotingRound,
}) {
  const {
    seconds,
    minutes,
    start,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: (!(lobby.gameState === 'mayorPick' || lobby.gameState === 'lobby')),
    onExpire: () => {
      if (lobby.gameState === 'questionRound') {
        onTimeout();
      } else {
        afterVotingRound();
      }
    },
  });

  useEffect(() => {
    updateTimer({ minutes, seconds }, lobby);
  }, [seconds, minutes]);

  useEffect(() => {
    if (lobby.gameState === 'questionRound') {
      start();
    } else if (lobby.gameState === 'outOfTokens' || lobby.gameState === 'outOfTime') {
      // condition for when people vote
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      restart(time);
    } else if (lobby.gameState === 'wordGuessed') {
      // when werewolves vote
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
        <span>{seconds < 10 ? (`0${seconds}`) : seconds}</span>
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
