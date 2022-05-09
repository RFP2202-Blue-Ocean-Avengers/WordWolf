import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "./api/contextStore";
import Login from '../components/Login';

function Home() {
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
    <Login
      handleFormChange={handleFormChange}
      handleCreateLobby={handleCreateLobby}
      handleJoinLobby={handleJoinLobby}/>
  );
}

export default Home;
