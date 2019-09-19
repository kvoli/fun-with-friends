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
<<<<<<< HEAD
    res.status(400).send({
      error: 'Unable to create artifact.'
    });
  };
=======
    res.status(400).send({ error: 'Unable to create artifact.' });
  }
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
};

const updateArtifact = async (req, res) => {
  try {
<<<<<<< HEAD
    const query = {
      _id: req.params.id
    };
    const updates = req.body;
    await Artifact.updateOne(query, updates);
    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      error: 'Unable to update artifact.'
    });
  };
};

var getArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.find({
      id: req.params.id
    });
    res.status(200).send(artifacts);
  } catch (error) {
    res.status(400).send({
      error: 'Unable to get that artifact.'
    })
  };
=======
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
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
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
<<<<<<< HEAD
    res.status(400).send({
      error: 'Unable to get artifacts.'
    });
  };
=======
    res.status(400).send({ error: 'Unable to get artifacts.' });
  }
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
};

const deleteArtifact = async (req, res) => {
  try {
<<<<<<< HEAD
    await Artifact.deleteOne({
      _id: req.params.id
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      error: 'Unable to delete artifact.'
    })
  };
=======
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
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
};

module.exports = {
  createArtifact,
  updateArtifact,
  deleteArtifact,
  getArtifacts,
};
