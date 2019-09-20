/* eslint-disable consistent-return */
const User = require('../models/user');

// Create a new user
const createUser = async (req, res) => {
  try {
    // Create a new user and save it in the database
    const user = new User(req.body);
    await user.save();
    // Generate a new JWT token for the user and save it in the database
    const token = await user.generateAuthToken();
    // Respond with the token and user data
    res.status(201).send({
      user: user.toObject(),
      token,
    });
  } catch (error) {
    // Handle different types of errors
    if (error.code === 11000) {
      res.status(400).send({
        error: 'Username or email already exists.',
      });
    } else {
      // Purposefully send an unknown error message
      res.status(400).send({
        error: 'An unknown error has occured.',
      });
    }
  }
};

// Login to an existing user
const loginUser = async (req, res) => {
  try {
    // Get the username and password from the request body and find the user in the database
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    // Return an error response if the user couldn't be found in the database
    if (!user) {
      return res.status(401).send({
        error: 'Incorrect username or password.',
      });
    }
    // Generate a new token and respond with the token and user data
    const token = await user.generateAuthToken();
    res.send({
      user: user.toObject(),
      token,
    });
  } catch (error) {
    // Purposefully send an unknown error message
    res.status(400).send({
      error: 'An unknown error as occured.',
    });
  }
};

// Get the current user
const getCurrentUser = async (req, res) => {
  res.status(200).send({
    user: await req.user.toObject(),
  });
};

// Logout the current user on the current device
const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    // Purposefully send an unknown error message
    res.status(400).send({
      error: 'An unknown error as occured.',
    });
  }
};

// Logout the current user on all devices
const logoutUserAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    // Purposefully send an unknown error message
    res.status(400).send({
      error: 'An unknown error as occured.',
    });
  }
};

// get all users in the database
const getAllUsers = async (req, res) => {
  try {
    // get all users
    const allUsers = await User.find();
    res.status(200).send(allUsers.map(user => user.toObject()));
  } catch (error) {
    req.status(400).send({
      error: 'Error found',
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  logoutUserAll,
  getAllUsers,
};
