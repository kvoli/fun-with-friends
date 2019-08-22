var uploadImage = async (req, res) => {
  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))
  Promise
    .all(promises)
    .then(results => res.send(json(results)))
}

module.exports = {
  uploadImage
};
