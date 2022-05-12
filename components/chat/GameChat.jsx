import { useState, useEffect } from 'react';
import { Button, Input } from '@chakra-ui/react';
import ReactScrollableFeed from 'react-scrollable-feed';
import uuid from 'react-uuid';
import { socket } from '../../pages/api/service/socket';
import Message from './Message';

function GameChat({ players, username, lobby }) {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  // get the message whenever there is new message sent
  useEffect(() => {
    socket.on('allGameMessages', (data) => {
      setAllMessages(data);
    });
  }, [socket]);

  const handleMessageOnChange = (input) => {
    setMessage(input);
  };

  const handleSubmitOnClick = async (isQuestion) => {
    if (message.length === 0) {
      alert('message can not be blank');
      return;
    }
    const data = {
      id: uuid(), name: username, lobby, message,
    };
    if (isQuestion) { data.question = true; } else { data.question = false; }
    await socket.emit('newGameMessage', data, lobby);
    setMessage('');
  };

  return (
    <div style={{
      width: '542px', height: '181px', backgroundColor: 'white',
    }}
    >
      <ReactScrollableFeed>
        {allMessages?.map((msg) => <Message key={msg.id} message={msg} players={players} />)}
      </ReactScrollableFeed>

      {(!players || !players[username].spectator) ? (
        <div style={{ display: 'flex', padding: '10px', backgroundColor: 'white' }}>
          {' '}
          <Input
            value={message}
            style={{
              backgroundColor: '#C4C4C4', width: '320px', height: '45px', marginRight: '10px',
            }}
            onChange={(e) => handleMessageOnChange(e.target.value)}
          />

          {(players[username].mayor === true || lobby.gameState === 'questionRound') ? '' : (
            <Button
              style={{
                backgroundColor: '#D19E61', color: 'black', width: '97px', height: '46px', marginRight: '10px',
              }}
              onClick={() => handleSubmitOnClick(true)}
            >
              ASK
            </Button>
          )}

          <Button
            style={{
              backgroundColor: 'black', color: 'white', width: '97px', height: '46px',
            }}
            onClick={() => handleSubmitOnClick()}
          >
            SEND
          </Button>
        </div>
      ) : ''}
    </div>
  );
}

export default GameChat;
