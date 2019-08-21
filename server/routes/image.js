const express = require('express');
const auth = require('../middleware/auth');
const imageRouter = express.Router();
const imageController = require('../controllers/image');

imageRouter.post('/upload', imageController.uploadImage);

module.exports = userRouter