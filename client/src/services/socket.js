import { io } from 'socket.io-client';

class Socket {
  #socket = null;

  #error = null;

  constructor(roomName) {
    this.url = import.meta.env.VITE_BACKEND_URL;
    this.roomName = roomName;
  }

  connect() {
    const socket = io(this.url);

    socket.emit('join-room', this.roomName);
    ['connect_error', 'connect_failed'].map((errorEvent) =>
      socket.on(errorEvent, (err) => {
        this.#error = err;
      })
    );

    this.#socket = socket;
  }

  disconnect() {
    this.#socket.emit('leave-room');
    this.#socket.off();
    this.#socket.close();
  }

  on(event, func) {
    this.#socket?.on(event, func);
  }

  emit(event, data) {
    this.#socket?.emit(event, data);
  }
}

export default Socket;
