const express = require('express');
const path = require('path');

const router = require('./routes/routes');

// Start the express server
const server = express();

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  // Serve built static react files
  const client_directory = path.join(__dirname, '../client/build/');
  server.use(express.static(client_directory));
  server.get('/', (req, res) => {
    res.sendFile(path.join(client_directory, 'index.html'));
  });

} else {
  console.log('Running in development mode');

  // Load environment variables from the .env file
  require('dotenv').config();
  console.log(process.env.SECRET_KEY);
}

// Connect to the database
require('./models/db');

server.use(express.json());
server.use(router);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
