const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the acount schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

// Bind the user schema to a Mongoose model
const User = mongoose.model('User', userSchema);
module.exports = User;