const express = require('express');
var router = express.Router();

const userRouter = require('./user')

router.use('/user', userRouter);

module.exports = router;