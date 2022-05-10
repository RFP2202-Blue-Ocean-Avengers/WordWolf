import { useContext, useEffect } from 'react';
import { StoreContext } from '../../pages/api/contextStore';

function Message({ message }) {
  const { lobby } = useContext(StoreContext);
  const { name } = message;
  // const color = (lobby.players.name.color) ? lobby.player.color : 'black';
  useEffect(() => {
    console.log(lobby.players, name)
  }, []);

  return (
    <div style={{ fontSize: '24px'}}>
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
              backgroundColor: '#2534BA', color: 'white', width: '208px', height: '41px', fontSize: '24px', borderRadius: '20px', textAlign: 'center', marginTop: '3px',
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
