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
<<<<<<< HEAD
circleRouter.post('/:id/member', circleController.addMember);

// delete a member to a circle
circleRouter.delete('/:id/member', circleController.deleteMember);
=======
circleRouter.post('/:id/member', auth, circleController.addMember);

// delete a member to a circle
circleRouter.delete('/:id/member', auth, circleController.deleteMember);
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0

module.exports = circleRouter;
