const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  label: { type: String, required: true },
  colour: { type: String }
},{
  _id: false
});

const relationSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String }
},{
  _id: false
});

// Define the artifact schema
const artifactSchema = mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String },
  location: { type: String },
  date: { type: Date },
  image: { type: String },
  uploaded: { type: Date, default: Date.now },
  uploader: { type: String },
  tags: { type: [tagSchema], required: false },
  relations: { type: [relationSchema] }
},{
  toObject: { versionKey: false, virtuals: true, transform: function (doc,ret) { delete ret._id } }
});

// Bind the artifact schema to a Mongoose model
const Artifact = mongoose.model('Artifact', artifactSchema);
module.exports = Artifact;