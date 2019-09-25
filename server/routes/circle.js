const express = require('express');
const auth = require('../middleware/auth');

const circleRouter = express.Router();
const circleController = require('../controllers/circle');

// Create a new circle
circleRouter.post('/', auth, circleController.createCircle);

// Get all circles
circleRouter.get('/', auth, circleController.getAllCircles);

// Delete an circle
circleRouter.delete('/:id', auth, circleController.deleteCircle);

// Add a member to a circle
circleRouter.post('/:id/member', auth, circleController.addMember);

// delete a member to a circle
circleRouter.delete('/:id/member', auth, circleController.deleteMember);

// Adds an artifact to a circle
circleRouter.post('/:id/artifact', auth, circleController.addArtifact);

// Deletes an artifact from a circle
circleRouter.delete('/:id/artifact', auth, circleController.deleteArtifact);


module.exports = circleRouter;
