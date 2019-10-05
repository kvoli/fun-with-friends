// Always try and load environment variables from a .env file
require('dotenv').config();

// Load dependencies
const express = require('express');
const path = require('path');
const router = require('./routes/routes');
const chatController = require('./controllers/chat');

// Start the express server
const server = express();

// Connect to the database
if (process.env.NODE_ENV === 'local') {
  require('./models/mockdb');
} else {
  require('./models/db');
}

// Setup middlewares
server.use(express.json());

// Setup routes
server.use('/api', router);

// Setup client
const build = path.join(__dirname, '../client/build/');
server.use(express.static(build));
server.get('*', (req, res) => {
  res.sendFile(path.join(build, 'index.html'));
});

// Setup listener
const port = process.env.PORT || 8080;
const s = server.listen(port, () => {
  console.log(`Server Build: ${process.env.NODE_ENV}`);
  console.log(`Server Port: ${port}`);
});

const io = require('socket.io')(s);

const { addMessage } = chatController;
const { getChatLog } = chatController;
const clients = {};
const users = {};
const allClients = [];

io.on('connection', socket => {
  console.log('connection', socket.id);
  clients[socket.id] = socket;
  socket.on('userJoined', userId => onUserJoined(userId, socket));
  socket.on('message', message => onMessageReceived(message, socket));
  socket.on('disconnect', function() {
    console.log('Got disconnect!');

    const i = allClients.indexOf(socket);
    allClients.splice(i, 1);
  });
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, circleID, socket) {
  console.log('REGISTER USER', userId);
  users[socket.id] = userId;
  allClients.push(socket);
  socket.emit(getChatLog(circleID));
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  console.log('MESSAGE RECEIVE', message);
  const userId = users[senderSocket.id];
  // Safety check.
  if (!userId) return;
  _sendAndSaveMessage(message, senderSocket);
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket) {
  addMessage(message);
  // If the message is from the server, then send to everyone.
  socket.broadcast.emit('message', message);
}