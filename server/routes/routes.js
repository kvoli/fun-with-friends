const express = require('express');
var router = express.Router();

const userRouter = require('./user')
const imageRouter = require('./image')

router.use('/user', userRouter);
router.use('/image', imageRouter);

module.exports = router;