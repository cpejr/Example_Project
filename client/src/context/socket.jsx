import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const BACK_END_URL = 'http://localhost:3333';

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(BACK_END_URL);

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
