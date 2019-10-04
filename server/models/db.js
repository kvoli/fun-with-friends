const mongoose = require('mongoose');

const Options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const DbConnection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}?${process.env.DB_OPTIONS}`;

// Connect to the database with the connection url and options
mongoose.connect(DbConnection, Options).then(
  () => {
    console.log('Database: Connected');
  }, err => { 
    console.log('Database: Failed to Connect');
  }
);

// Load schemas and map to Mongoose models
require('./user');
require('./artifact');
require('./chat');
