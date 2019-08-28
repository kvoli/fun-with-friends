const express = require('express');
//const auth = require('../middleware/auth');
const artifactRouter = express.Router();
const artifactController = require('../controllers/artifact');

// Create a new artifact
artifactRouter.post('/', artifactController.createArtifact);

// Update an existing artifact
artifactRouter.put('/:id', artifactController.updateArtifact);

// Logout the current user on the current device
artifactRouter.get('/:id', artifactController.getArtifact);

// Get all artifacts
artifactRouter.get('/', artifactController.getArtifacts);

// Delete an artifact
artifactRouter.delete('/:id', artifactController.deleteArtifact);

module.exports = artifactRouter