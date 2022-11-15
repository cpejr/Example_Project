import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/global';
import App from './App';
import { SocketContextProvider } from './context/socket';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketContextProvider>
      <GlobalStyles />
      <App />
    </SocketContextProvider>
  </React.StrictMode>
);
