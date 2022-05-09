import { Button, Input } from '@chakra-ui/react';

function Login({ handleFormChange, handleCreateLobby, handleJoinLobby }) {
  return (
    <div>
      <form>
        <Input
          type="text"
          size="sm"
          width="25%"
          placeholder="Enter your nickname"
          name="name"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <Input
          type="text"
          size="sm"
          width="25%"
          placeholder="Enter lobby name"
          name="lobby"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <Button size="sm" onClick={(e) => handleCreateLobby(e)}>
          Create Lobby
        </Button>
        <br />
        <Button size="sm" onClick={(e) => handleJoinLobby(e)}>
          Join Lobby
        </Button>
      </form>
    </div>
  );
}

export default Login;
