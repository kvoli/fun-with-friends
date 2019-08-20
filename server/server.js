const express = require('express');
const path = require('path');

// Start the express server
const server = express();

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode')

  // Serve built static react files
  const client_directory = path.join(__dirname, '../client/build/');
  server.use(express.static(client_directory));
  server.get('/', (req, res) => {
    res.sendFile(path.join(client_directory, 'index.html'));
  });

} else {
  console.log('Running in development mode')

  // Load environment variables from the .env file
  require('dotenv').config();
}

// Connect to the database
require('./models/db');

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
})
