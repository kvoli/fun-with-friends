/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const circleSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    src: {
      type: String,
    },
    previewImage: {
      type: String,
    },
    admins: {
      type: [String],
    },
    members: {
      type: [String],
      default: [],
    },
    artifacts: {
      type: [String],
      default: [],
    },
    public: {
      type: Boolean,
      default: false,
    },
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

const Circle = mongoose.model('Circle', circleSchema);
module.exports = Circle;
