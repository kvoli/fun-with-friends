/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable no-underscore-dangle */
const chatDB = require('../models/chat');

const { ChatLog } = chatDB;
const { Message } = chatDB;

const addMessage = async messageData => {
  try {
    const message = new Message(messageData);
    await ChatLog.update({ _id: messageData.circleID }, { $push: { messages: message } }, { upsert: true }, function(err, data) {});
  } catch (error) {
    console.log(error);
  }
};

const getChatLog = async circleID => {
  try {
    const chatLog = await ChatLog.find({ _id: circleID });
    return chatLog;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addMessage,
  getChatLog,
};
