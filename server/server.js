const express = require('express');
const path = require('path');

const app = express();

const client_directory = path.join(__dirname, '../client/build/');

app.use(express.static(client_directory));

app.get('/', (req, res) => {
  res.send('Express Server <br> <a href="http://localhost:3000">React Client</a>');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(client_directory, 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
})
