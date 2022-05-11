import { Button, Input } from '@chakra-ui/react';
import Image from 'next/image';
import LoginLogo from '../assets/LoginLogo.svg';
import LoginBanner from '../assets/LoginBanner.svg';

function Login({ handleFormChange, handleCreateLobby, handleJoinLobby }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#211E32', height: '100vh', paddingTop: '20px',
    }}
    >
      <Image src={LoginLogo} />
      <form style={{
        width: '500px', height: '500px', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 80px', marginTop: '10px',
      }}
      >
        <span style={{ alignSelf: 'center', background: '#fff', fontSize: '30px' }}>Welcome</span>
        {/* Login Pic */}
        <Image src={LoginBanner} style={{ borderRadius: '30px' }} />
        <span style={{ background: '#fff', marginTop: '20px' }}>Enter Username:</span>
        <Input
          type="text"
          size="sm"
          width="25%"
          placeholder="Username"
          name="name"
          onChange={(e) => handleFormChange(e)}
          style={{ width: '100%' }}
        />
        <br />
        <span style={{ background: '#fff' }}>Enter Lobby Name:</span>
        <Input
          type="text"
          size="sm"
          width="25%"
          placeholder="Lobby Name"
          name="lobby"
          onChange={(e) => handleFormChange(e)}
          style={{ width: '100%' }}
        />
        <br />
        <Button h="40px" w="100%" onClick={(e) => handleJoinLobby(e)} style={{ marginBottom: '15px' }}>
          Join
        </Button>
        <Button h="40px" w="100%" onClick={(e) => handleCreateLobby(e)}>
          Create
        </Button>
      </form>
    </div>
  );
}

export default Login;
