var mongoose = require('mongoose');

// Define the connection url and options
const DbConnection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}?${process.env.DB_OPTIONS}`;
const Options = {
  useNewUrlParser: true
}

// Connect to the database with the connection url and options
mongoose.connect(DbConnection, Options).then(
  () => {
    console.log('Connected to Database'); 
  }, (err) => {
    console.log('Failed to connected to Database');
  }
);

// Load schemas and map to Mongoose models
require('./user')
require('./artifact')
