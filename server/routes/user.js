const express = require('express');
const auth = require('../middleware/auth');

const userRouter = express.Router();
const userController = require('../controllers/user');

// Create a new user
userRouter.post('/signup', userController.createUser);

// Login to an existing user
userRouter.post('/login', userController.loginUser);

// Get the current user
userRouter.get('/me', auth, userController.getCurrentUser);

// Logout the current user on the current device
userRouter.post('/logout', auth, userController.logoutUser);

// Logout the current user on all devices
userRouter.post('/logout/all', auth, userController.logoutUserAll);

// Get all users
userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;
