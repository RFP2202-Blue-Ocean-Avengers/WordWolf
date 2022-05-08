import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Button, Input, UnorderedList, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { StoreContext } from "./api/contextStore";

function Login() {
  const router = useRouter();
  const { loginData, setLoginData } = useContext(StoreContext);

  const handleFormChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleCreateLobby = async (e) => {
    e.preventDefault();
    axios
      .get('/createLobby', { params: { loginData } })
      .then((res) => {
        console.log(res);
        if (res.data === 'ok') {
          setLoginData({ ...loginData, create: true })
          router.push(`/${loginData.lobby}/lobby`);
        } else {
          alert('lobby name already taken');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleJoinLobby = async (e) => {
    e.preventDefault();
    axios
      .get('/joinLobby', { params: { loginData } })
      .then((res) => {
        if (res.data === 'ok') {
          setLoginData({ ...loginData, create: false })
          router.push(`/${loginData.lobby}/lobby`);
        } else {
          alert('lobby does not exist');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <Input
          type="text"
          size="sm"
          placeholder="Enter your nickname"
          name="name"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <Input
          type="text"
          size="sm"
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
