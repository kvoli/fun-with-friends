/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  colour: {
    type: String
  },
}, {
  _id: false,
});

const relationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
}, {
  _id: false,
});

// Define the artifact schema
const artifactSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  date: {
    type: String
  },
  origin: {
    type: String
  },
  src: {
    type: String
  },
  tags: {
    type: String
  },
  uploaded: {
    type: Date,
    default: Date.now
  },
  uploader: {
    type: String
  },
  // tags: { type: [tagSchema], required: false },
  // relations: { type: [relationSchema] }
}, {
  toObject: {
    versionKey: false,
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
    },
  },
});

// Bind the artifact schema to a Mongoose model
const Artifact = mongoose.model('Artifact', artifactSchema);
module.exports = Artifact;