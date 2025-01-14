import io from 'socket.io-client';


// Create a function to get or initialize the socket
let socket: any = null;


export const getSocket = () => {
  if (!socket) {
    socket = io("wss://hi-lo-backend.onrender.com", {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};