const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'uploads',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformations: [{ width: 500, height: 500, crop: 'limit' }],
});

const parse = multer({ storage });

module.exports = parse;
