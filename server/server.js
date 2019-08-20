const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config')
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
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    cloud_key: process.env.CLOUDINARY_KEY,
    cloud_secret: process.env.CLOUDINARY_SECRET
  })
}

// use cors middleware, if prod - route to funwithfriends.net
app.use(cors({ 
  origin: CLIENT_ORIGIN 
})) 

app.use(formData.parse())

// API (POST) request -> image upload
app.post('/image-upload', (req, res) => {

  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))
  
  Promise
    .all(promises)
    .then(results => res.json(results))
})


// Connect to the database
require('./models/db');

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
})
