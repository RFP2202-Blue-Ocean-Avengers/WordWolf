import io from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { SocketContext } from './api/socketContext';
import { StoreContext } from './api/contextStore';
import { Button, Input, UnorderedList, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function Login() {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const { lobby, setLobby, player, setPlayer } = useContext(StoreContext);
  const [loginData, setLoginData] = useState({
    name: null,
    lobby: null,
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const handleCreateLobby = (e) => {
    e.preventDefault();
    socket.emit('createLobby', { name: loginData.name, lobby: loginData.lobby });
    socket.on('connectedToLobby', async (data) => {
      console.log(data);
      await setLobby(data.lobbyData);
      await setPlayer(data.playerData);
      router.push(`/lobby/${loginData.lobby}`);
    });
  }

  const handleJoinLobby = (e) => {
    e.preventDefault();
    socket.emit('joinLobby', { name: loginData.name, lobby: loginData.lobby});
    socket.on('connectedToLobby', async (data) => {
      console.log(data)
      await setLobby(data.lobbyData);
      await setPlayer(data.playerData);
      router.push(`/lobby/${loginData.lobby}`);
    });
  }

  return(
    <div>
      <form>
        <Input type="text" size="sm" placeholder="Enter your nickname" name="name" onChange={(e) => handleFormChange(e)}/>
        <br/>
        <Input type="text" size="sm" placeholder="Enter lobby name" name="lobby" onChange={(e) => handleFormChange(e)}/>
        <br/>
        <Button size="sm" onClick={(e) => handleCreateLobby(e)}>Create Lobby</Button>
        <br/>
        <Button size="sm" onClick={(e) => handleJoinLobby(e)}>Join Lobby</Button>
      </form>
    </div>
  )
}

export default Login;
