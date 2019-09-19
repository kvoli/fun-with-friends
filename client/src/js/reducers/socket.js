import SocketIOClient from 'socket.io-client';

const userID = () => Math.floor(Math.random() * 10e7) + 10;
const x = userID();

const socketClient = SocketIOClient('http://localhost:3000');
socketClient.emit('userJoined', userID);

const initialState = {
  chatSocket: socketClient,
  userID: x,
};

const socket = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default socket;
