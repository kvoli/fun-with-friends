const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Create the in memory mock database and get the connection string
const database = new MongoMemoryServer();

database.getConnectionString().then(connection =>  {
  mongoose.connect(connection, options, 
  success => {
    console.log('Database: Connected (Memory)');
  }, 
  error => {
    console.log('Database: Failed to Connected (Memory)');
  });
});

// Load schemas and map to Mongoose models
require('./user');
require('./artifact');
require('./chat');
