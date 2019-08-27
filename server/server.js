// Always try and load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const router = require('./routes/routes');

// Start the express server
const server = express();

// Connect to the database
require('./models/db');

// Setup middlewares 
server.use(express.json());
//server.use(formData.parse());
//server.use(cors({origin: process.env.CLIENT_ORIGIN}));
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   cloud_key: process.env.CLOUDINARY_KEY,
//   cloud_secret: process.env.CLOUDINARY_SECRET
// });

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
server.listen(port, () => {
  console.log(`Server Build: ${process.env.NODE_ENV}`);
  console.log(`Server Port: ${port}`);
});