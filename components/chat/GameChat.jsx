import { useState, useEffect, useContext } from 'react';
import { Button, Input } from '@chakra-ui/react';
import ReactScrollableFeed from 'react-scrollable-feed';
import uuid from 'react-uuid';
import { StoreContext } from '../../pages/api/contextStore';
import { socket } from '../../pages/api/service/socket';
import Message from './Message';

function GameChat({ players, username }) {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const { lobby } = useContext(StoreContext);
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
      id: uuid(), name: username, lobby: lobby.name, message,
    };
    if (isQuestion) { data.question = true; } else { data.question = false; }
    await socket.emit('newGameMessage', data, lobby.name);
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
        <div style={{
          display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: 'white',
        }}
        >
          {' '}
          <Input
            value={message}
            style={{
              backgroundColor: '#C4C4C4', width: '320px', height: '45px', marginRight: '10px', borderRadius: '0px',
            }}
            onChange={(e) => handleMessageOnChange(e.target.value)}
          />

          {(lobby.mayor?.name === username || lobby.gameState !== 'questionRound') ? '' : (
            <Button
              style={{
                backgroundColor: '#D19E61', color: 'black', width: '97px', height: '46px', marginRight: '10px', borderRadius: '0px',
              }}
              onClick={() => handleSubmitOnClick(true)}
            >
              ASK
            </Button>
          )}

          <Button
            style={{
              backgroundColor: 'black', color: 'white', width: '97px', height: '46px', borderRadius: '0px',
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
