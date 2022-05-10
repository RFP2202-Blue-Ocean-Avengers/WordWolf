import React from 'react';

function Message({ message }) {
  return (
    <div style={{ fontSize: '24px' }}>
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
