const users = require('./users');

const publicCircle = {
  id: 'circle1',
  title: 'Public Circle',
  description: 'A public circle',
  src: 'Some link to an image',
  previewImage: 'Some link to an image',
  members: [],
  admins: [users.john.username],
  artifacts: [],
  public: true,
};

const privateCircle = {
  id: 'circle2',
  title: 'Family Circle',
  description: 'Our families circle for sharing artifacts.',
  src: 'Some link to an image',
  previewImage: 'Some link to a preview image',
  members: [],
  admins: [users.john.username],
  artifacts: [],
  public: false,
};

const nonUniqueId = {
  id: 'circle2',
  title: 'Non Unique Circle',
  description: 'A circle that is not unique.',
  src: 'Some link to an image',
  previewImage: 'Some link to a preview image',
  members: [],
  admins: [users.john.username],
  artifacts: [],
  public: false,
};

const noId = {
  title: 'No Id Circle',
  description: 'Does not matter',
  src: 'Some link to an image',
  previewImage: 'Some link to a preview image',
  members: [],
  admins: [users.john.username],
  artifacts: [],
  public: false,
};

const noTitle = {
  id: 'circle3',
  description: 'Does not matter',
  src: 'Some link to an image',
  previewImage: 'Some link to a preview image',
  members: [],
  admins: [users.john.username],
  artifacts: [],
  public: false,
};

const noDescription = {
  id: 'circle3',
  title: 'No Description Circle',
  src: 'Some link to an image',
  previewImage: 'Some link to a preview image',
  members: [],
  admins: [users.john.username],
  artifacts: [],
  public: false,
};

module.exports = {
  publicCircle,
  privateCircle,
  nonUniqueId,
  noId,
  noTitle,
  noDescription,
};