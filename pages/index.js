import axios from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from './api/contextStore';
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
    if (loginData.name && loginData.lobby) {
      axios
        .get('/createLobby', { params: { loginData } })
        .then((res) => {
          if (res.data === 'ok') {
            setLoginData({ ...loginData, create: true });
            router.push(`/${loginData.lobby}/lobby`);
          } else {
            alert('lobby name already taken');
          }
        })
        .catch((err) => new Error(err));
    } else {
      alert('one of the fields is missing');
    }
  };

  const handleJoinLobby = async (e) => {
    e.preventDefault();
    if (loginData.name && loginData.lobby) {
      axios
        .get('/joinLobby', { params: { loginData } })
        .then((res) => {
          if (res.data === 'ok') {
            setLoginData({ ...loginData, create: false });
            router.push(`/${loginData.lobby}/lobby`);
          } else {
            alert('lobby does not exist');
          }
        })
        .catch((err) => new Error(err));
    } else {
      alert('one of the fields is missing');
    }
  };

  return (
    <>
      <h1>Word Wolf</h1>
      <Login
        handleFormChange={handleFormChange}
        handleCreateLobby={handleCreateLobby}
        handleJoinLobby={handleJoinLobby}
      />
    </>
  );
}

export default Home;
