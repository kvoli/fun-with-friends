const mongoose = require('mongoose');

// Define the acount schema
const accountSchema = mongoose.Schema({
  'email': String,
  'username': String,
  'password': String, 
  'firstname': String,
  'lastname': String,
  'session': String,
  'salt': String
})

// Bind the account schema to a Mongoose model
mongoose.model('account', accountSchema);