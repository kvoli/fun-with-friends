/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Intercepts a request and checks if an authorized JWT was supplied
const auth = async (req, res, next) => {
  try {
    // Extract just the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    // Verify that the token was created by this server
    const data = jwt.verify(token, process.env.SECRET_KEY || 'testing');
    // Check if the user and token from the request match a user and token in the database
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    // Handle no matches
    if (!user) {
      throw new Error();
    }
    // Update the request with the matched user and token
    req.user = user;
    req.token = token;
    // Continue with the original request
    await next(req, res);
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

module.exports = auth;
