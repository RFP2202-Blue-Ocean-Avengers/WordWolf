import React, { useState, useContext } from 'react';

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const [lobby, setLobby] = useState();
  const [player, setPlayer] = useState();

  const store = {
    lobby,
    setLobby,
    player,
    setPlayer,
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider };