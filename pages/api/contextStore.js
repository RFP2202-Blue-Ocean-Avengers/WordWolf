import React, { useState, useContext } from 'react';

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const [lobby, setLobby] = useState();
  const [loginData, setLoginData] = useState({
    name: null,
    lobby: null,
  });

  const store = {
    lobby,
    setLobby,
    loginData,
    setLoginData,
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider };