const mongoose = require('mongoose');

// Define the artifact schema
const artifactSchema = mongoose.Schema({
  'title': String,
  'description': String,
  'tags': [String],
  'listed': Date,
  'image': String,
});

// Bind the artifact schema to a Mongoose model
mongoose.model('artifact', artifactSchema);
