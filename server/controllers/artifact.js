/* eslint-disable no-cond-assign */
/* eslint-disable no-underscore-dangle */
const Artifact = require('../models/artifact');
const Circle = require('../models/circle');

const createArtifact = async (req, res) => {
  try {
    req.body._id = req.body.id;
    delete req.body.id;
    // Create an artifact from the details in the request
    const artifact = new Artifact(req.body);
    // Add the user's ID to the artifact objects uploader property
    artifact.uploader = req.user.id;
    // Wait for the artifact to be saved in the database
    await artifact.save();
    // Return the artifact back to the client
    res.status(201).send(artifact.toObject());
  } catch (error) {
    // Return an error message as the artfact was not able to be created
    res.status(400).send({ error: 'Unable to create artifact.' });
  }
};

const updateArtifact = async (req, res) => {
  try {
    const query = { _id: req.params.artifactId };
    const updated = req.body;
    // Get the requested artifact from the database
    const artifact = await Artifact.findOne(query);
    if ((artifact.uploader = req.user.id)) {
      // If the user is the uploader, update the artifact as requested
      await Artifact.updateOne(query, updated);
      res.status(200).send();
    } else {
      // Otherwise don't and return an error response
      res.status(400).send({ error: `You don't have permissions to update this artifact.` });
    }
  } catch (error) {
    res.status(400).send({ error: 'Unable to update artifact.' });
  }
};

// Helper function to merge any number of arrays and remove duplicates
const mergeArrays = (...arrays) => {
  let jointArray = [];
  arrays.forEach(array => {
    jointArray = [...jointArray, ...array];
  });
  const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index);
  return uniqueArray;
};

const getArtifacts = async (req, res) => {
  try {
    // Find all circles that the user is a member of
    const circles = await Circle.find({ members: req.user.id });
    // Find all artifact ids from within those circles (removing duplicates)
    const artifactIds = mergeArrays(circles.map(circle => circle.artifacts));
    // Get all artifacts with corresponding ids from the database
    const artifacts = await Artifact.find({
      $or: [{ _id: { $in: artifactIds } }, { uploader: req.user.id }],
    });
    res.status(200).send(artifacts.map(artifact => artifact.toObject()));
  } catch (error) {
    res.status(400).send({ error: 'Unable to get artifacts.' });
  }
};

const deleteArtifact = async (req, res) => {
  try {
    // Get the requested artifact
    const artifact = await Artifact.findOne({ _id: req.params.artifactId });
    if (artifact.uploader === req.user.id) {
      // If the user is the uploader then delete as requested
      await Artifact.deleteOne({ _id: req.params.id });
      res.status(200).send();
    } else {
      // Otherwise don't delete and return an error response
      res.status(400).send({ error: `You don't have permissions to delete this artifact` });
    }
  } catch (error) {
    res.status(400).send({ error: 'Unable to delete artifact.' });
  }
};

module.exports = {
  createArtifact,
  updateArtifact,
  deleteArtifact,
  getArtifacts,
};
