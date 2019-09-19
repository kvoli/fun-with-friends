/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the token schema
const tokenSchema = mongoose.Schema({
<<<<<<< HEAD
  token: {
    type: String,
    required: true
  }
});

// Define the acount schema
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  circleIds: {
    type: [String],
    required: false
  },
  tokens: [tokenSchema]
}, {
  toObject: {
    versionKey: false,
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.password;
    }
=======
  token: { type: String, required: true },
});

// Define the acount schema
const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 6 },
    tokens: [tokenSchema],
  },
  {
    toObject: {
      versionKey: false,
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.password;
      },
    },
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
  }
);

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
<<<<<<< HEAD
  const token = jwt.sign({
    _id: user._id
  }, process.env.SECRET_KEY);
  user.tokens = user.tokens.concat({
    token
  });
=======
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  user.tokens = user.tokens.concat({ token });
>>>>>>> ca5173897b24e774909d48cd7e5ee725c535cac0
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({
    username
  });
  if (!user) {
    return null;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }
  return user;
};

// Bind the user schema to a Mongoose model
const User = mongoose.model('User', userSchema);
module.exports = User;
