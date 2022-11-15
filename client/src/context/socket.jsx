import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io();

    setSocket(newSocket);
    return () => {
      socket?.off();
      socket?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
