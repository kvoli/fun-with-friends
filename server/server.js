const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
})

app.get('/', (req, res) => {
  res.send('Express Server <br> <a href="http://localhost:3000">React Client</a>');
});
