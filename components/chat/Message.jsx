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
  }, [lobby]);

  return (
    <div style={{ fontSize: '24px' }}>
      {(!message.question)
        ? (
          <div style={{ display: 'flex', paddingLeft: '10px' }}>
            <p style={{ color }}>
              {message.name}
              :
              {'\u00A0'}
            </p>
            {message.message}
          </div>
        )
        : (
          <div style={{
            display: 'flex', fontSize: '24px', padding: '10px', lineHeight: 'initial',
          }}
          >
            <p style={{ color }}>
              {message.name}
              :
              {'\u00A0'}
            </p>
            <div style={{
              backgroundColor: color, color: 'white', width: 'auto', height: 'auto', fontSize: '24px', borderRadius: '20px', textAlign: 'center', marginTop: '3px', lineHeight: '41px',
            }}
            >
              <p style={{ padding: '0px 10px' }}>{message.message}</p>
            </div>
          </div>
        )}
    </div>
  );
}

export default Message;
