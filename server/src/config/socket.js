import http from 'node:http';
import { Server } from 'socket.io';

export default function socketConfig(app) {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log(`Socket with id ${socket.id} connected.`);
  });

  return server;
}
