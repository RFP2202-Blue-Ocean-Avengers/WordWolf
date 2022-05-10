import { useState, useContext, useEffect } from 'react';
import { socket } from '../../pages/api/service/socket';
import { StoreContext } from '../../pages/api/contextStore';

function Message({ message }) {
  const { lobby } = useContext(StoreContext);
  const { name } = message;
  const [color, setColor] = useState('black');

  useEffect(() => {
    if (lobby.players[name]?.color) {
      setColor(lobby.players[name].color);
    }
  }, [socket]);

  return (
    <div style={{ fontSize: '24px', color }}>
      {(!message.question)
        ? (
          <div>
            {message.name}
            {': '}
            {message.message}
          </div>
        )
        : (
          <div style={{ display: 'flex', fontSize: '24px' }}>
            {message.name}
            {': '}
            <div style={{
              backgroundColor: color, color: 'white', width: '208px', height: '41px', fontSize: '24px', borderRadius: '20px', textAlign: 'center', marginTop: '3px',
            }}
            >
              {message.message}
            </div>
          </div>
        )}
    </div>
  );
}

export default Message;
