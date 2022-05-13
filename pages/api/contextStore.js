import React, { useState } from 'react';

const StoreContext = React.createContext();

function StoreProvider({ children }) {
  const [lobby, setLobby] = useState();
  const [loginData, setLoginData] = useState({
    name: null,
    lobby: null,
  });
  const [soClose, setSoClose] = useState(false);
  const [wayOff, setWayOff] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [voted, setVoted] = useState(false);

  const store = {
    lobby,
    setLobby,
    loginData,
    setLoginData,
    soClose,
    setSoClose,
    wayOff,
    setWayOff,
    correct,
    setCorrect,
    voted,
    setVoted,
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
