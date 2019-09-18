const express = require('express');
const circleRouter = express.Router();
const circleController = require('../controllers/circle');

// Create a new circle
circleRouter.post('/', circleController.createCircle);

// Get all circles
circleRouter.get('/', circleController.getAllCircles);

// Delete an circle
circleRouter.delete('/:id', circleController.deleteCircle);

// Add a member to a circle
circleRouter.post('/:id/member', circleController.addMember);

// delete a member to a circle
circleRouter.delete('/:id/member', circleController.deleteMember);

module.exports = circleRouter