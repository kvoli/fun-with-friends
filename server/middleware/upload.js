const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

console.log(process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_KEY, process.env.CLOUDINARY_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads',
  allowedFormats: ['jpg','jpeg','png'],
  transformations: [{width:500, height:500, crop:'limit'}]
});

const parse = multer({storage});

module.exports = parse;