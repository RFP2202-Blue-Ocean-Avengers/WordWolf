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
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.warn('onExpire called') });
  useEffect(() => {
    updateTimer({ minutes, seconds }, lobby);
  }, [seconds, minutes]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '100px' }}>
        <span>{minutes}</span>
        :
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button type="submit" onClick={start}>Start</button>
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
      </button>
    </div>
  );
}

export default Timer;
