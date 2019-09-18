const express = require('express');
var router = express.Router();

const userRouter = require('./user');
const imageRouter = require('./image');
const artifactRouter = require('./artifact');
const circleRouter = require('./circle');

router.use('/user', userRouter);
router.use('/image', imageRouter);
router.use('/artifact', artifactRouter);
router.use('/circle', circleRouter);

module.exports = router;
