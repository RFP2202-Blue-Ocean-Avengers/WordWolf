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
  }, []);
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
    const data = {
      name: username, lobby, message, id: uuid(),
    };
    await socket.emit('newMessage', data, lobby);
    setMessage('');
  };
  const is16 = (typeof window !== 'undefined' && window.innerWidth > 1500);
  return (
    <div
      style={{
        width: '22vw',
        height: '90vh',
        backgroundColor: '#C4C4C4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '15px',
      }}
    >
      <h2 style={{
        position: 'relative',
        textAlign: 'center',
        fontSize: '32px',
        padding: '10px',
        fontWeight: 'bold',
      }}
      >
        CHAT
      </h2>
      <div style={is16
        ? {
          height: '70vh',
          width: '19.8vw',
          backgroundColor: 'white',
        }
        : {
          height: '66vh',
          width: '19.8vw',
          backgroundColor: 'white',
        }}
      >
        <ReactScrollableFeed>
          {allMessages?.map((msg) => <Message key={msg.id} players={players} message={msg} />)}
        </ReactScrollableFeed>
      </div>
      <div style={{ display: 'flex', marginTop: '15px', width: '90%' }}>
        <Input
          value={message}
          style={{
            backgroundColor: 'white', height: '60px', borderRadius: '0px', marginRight: '10px',
          }}
          onChange={(e) => handleMessageOnChange(e.target.value)}
        />
        <Button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '25%',
            height: '60px',
            fontSize: '18px',
            borderRadius: '0px',
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
