var User = require('../models/user')

// Create a new user
var createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login to an existing user
var loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res.status(401).send({error: 'Login failed! Check authentication credentials'});
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get the current user
var getCurrentUser = async (req, res) => {
  res.send(req.user);
};

// Logout the current user on the current device
var logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Logout the current user on all devices
var logoutUserAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send()
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  loginUser, 
  getCurrentUser,
  logoutUser,
  logoutUserAll
};