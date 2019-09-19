/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

// Define the connection url and options
const DbConnection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}?${process.env.DB_OPTIONS}`;
const Options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Connect to the database with the connection url and options
mongoose.connect(DbConnection, Options).then(
  () => {
    console.log('Database: Connected');
  },
  _err => {
    console.log('Database: Failed to Connect');
  }
);

// Load schemas and map to Mongoose models
require('./user');
require('./artifact');
require('./chat');
