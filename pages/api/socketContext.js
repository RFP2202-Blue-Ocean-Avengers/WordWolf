import io from 'socket.io-client';
import React, { useContext } from 'react';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const ENDPOINT = 'localhost';
  const socket = io();

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketProvider, SocketContext };
