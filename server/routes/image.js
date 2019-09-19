const express = require('express');

const imageRouter = express.Router();
const imageController = require('../controllers/image');
const parse = require('../middleware/upload');

imageRouter.post('/upload', parse.single('image'), imageController.uploadImage);

module.exports = imageRouter;
