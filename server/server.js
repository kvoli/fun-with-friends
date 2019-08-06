const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'production') {
  const client_directory = path.join(__dirname, '../client/build/');
  app.use(express.static(client_directory));
  app.get('/', (req, res) => {
    res.sendFile(path.join(client_directory, 'index.html'));
  });
  console.log('Running in production mode')
} else {
  console.log('Running in development mode')
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
})
