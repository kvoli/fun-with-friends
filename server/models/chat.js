/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    userID: { type: String, required: true },
    username: { type: String },
    circleID: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
  },
  {
    _id: false,
  }
);

const chatLogSchema = mongoose.Schema(
  {
    circleID: { type: String },
    messages: [messageSchema],
    _id: { type: String, required: true },
  },
  {
    toObject: {
      versionKey: false,
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);

const ChatLog = mongoose.model('ChatLog', chatLogSchema);
const Message = mongoose.model('Message', messageSchema);
module.exports = {
  ChatLog,
  Message,
};
