import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from '@chakra-ui/react';
import { socket } from '../../pages/api/service/socket';
import Message from './Message';

function GameChat({ username, lobby }) {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  // get the message whenever there is new message sent
  useEffect(() => {
    socket.on('allGameMessages', (data) => {
      console.log(data)
      setAllMessages(data);
    });
  }, [socket]);

  const handleMessageOnChange = (input) => {
    setMessage(input);
  };

  const handleSubmitOnClick = async (isQuestion) => {
    const data = { name: username, lobby, message };
    if (isQuestion) { data.question = true } else {data.question = false}
    await socket.emit('newGameMessage', data, lobby);
    setMessage('');
  };
  return (
    <div style={{ width: '542px', height: '181px', backgroundColor: 'white', border: 'solid'}}>
      <div style={{
        height: '60%',
        width: '100%',
        backgroundColor: 'white',
        // marginLeft: '13px',
        overflow: 'auto',
      }}
      >
        {allMessages?.map((message) => <Message message={message} />)}
      </div>
      <div style={{ display: 'flex', padding: '10px' }}>
        <Input
          value={message}
          style={{
            backgroundColor: '#C4C4C4', width: '320px', height: '45px', marginRight: '10px',
          }}
          onChange={(e) => handleMessageOnChange(e.target.value)}
        />
        <Button
          style={{
            backgroundColor: '#D19E61', color: 'black', width: '97px', height: '46px', marginRight: '10px',
          }}
          onClick={() => handleSubmitOnClick(true)}
        >
          ASK
        </Button>
        <Button
          style={{
            backgroundColor: 'black', color: 'white', width: '97px', height: '46px',
          }}
          onClick={() => handleSubmitOnClick()}
        >
          SEND
        </Button>
      </div>
    </div>
  );
}

export default GameChat;
