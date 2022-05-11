import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import { Button, Input } from '@chakra-ui/react';
import ReactScrollableFeed from 'react-scrollable-feed';
import { socket } from '../../pages/api/service/socket';
import Message from './Message';

function Chat({ players, username, lobby }) {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  // get the message before type
  useEffect(() => {
    axios(`/messages/${lobby}`)
      .then((data) => setAllMessages(data.data))
      .catch();
  }, [socket]);
  // get the message whenever there is new message sent
  useEffect(() => {
    socket.on('allMessages', (data) => {
      setAllMessages(data);
    });
  }, [socket]);

  const handleMessageOnChange = (input) => {
    setMessage(input);
  };
  const handleSubmitOnClick = async () => {
    const data = { name: username, lobby, message, id:uuid() };
    await socket.emit('newMessage', data, lobby);
    setMessage('');
  };
  return (
    <div style={{
      width: '350px',
      height: '700px',
      backgroundColor: '#C4C4C4',
    }}
    >
      <h2 style={{
        position: 'relative',
        left: '25%',
        fontSize: '50px',
        padding: '10px',
        fontWeight: 'bold',
      }}
      >
        CHAT
      </h2>
      <div style={{
        height: '488px',
        width: '322px',
        backgroundColor: 'white',
        marginLeft: '13px',
        overflow: 'auto',
      }}
      >
        <ReactScrollableFeed>
          {allMessages?.map((msg) => <Message key={msg.id} players={players} message={msg} />)}
        </ReactScrollableFeed>
      </div>
      <div style={{ display: 'flex', padding: '20px' }}>
        <Input
          value={message}
          style={{
            backgroundColor: 'white', width: '246px', height: '85px', marginRight: '13px',
          }}
          onChange={(e) => handleMessageOnChange(e.target.value)}
        />
        <Button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '65px',
            height: '85px',
          }}
          onClick={() => handleSubmitOnClick()}
        >
          SEND
        </Button>
      </div>
    </div>
  );
}

export default Chat;
