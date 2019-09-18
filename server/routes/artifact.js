const express = require('express');
const auth = require('../middleware/auth');
const artifactRouter = express.Router();
const artifactController = require('../controllers/artifact');

// Create a new artifact
artifactRouter.post('/', auth, artifactController.createArtifact);

// Update an existing artifact
artifactRouter.put('/:artifactId', auth, artifactController.updateArtifact);

// Get all artifacts
artifactRouter.get('/', auth, artifactController.getArtifacts);

// Delete an artifact
artifactRouter.delete('/:artifactId', auth, artifactController.deleteArtifact);

module.exports = artifactRouter;
