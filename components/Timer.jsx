import { useTimer } from 'react-timer-hook';
import { useEffect } from 'react';

function Timer({
  expiryTimestamp, updateTimer, lobby, onTimeout, afterVotingRound,
}) {
  const {
    seconds,
    minutes,
    start,
    pause,
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
    if (seconds <= 10 && minutes < 1) {
      document.getElementById('timerBox').style.backgroundColor = '#9D373B';
    } else {
      document.getElementById('timerBox').style.backgroundColor = '#FFF';
    }
  }, [seconds]);

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
    } else if (lobby.gameState === 'endGame') {
      pause();
    }
  }, [lobby.gameState]);

  return (
    <div id="timerBox">
      <div id="timer">
        <span>{minutes}</span>
        :
        <span>{seconds < 10 ? (`0${seconds}`) : seconds}</span>
      </div>
    </div>
  );
}

export default Timer;
