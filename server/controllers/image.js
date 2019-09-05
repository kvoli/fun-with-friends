var uploadImage = async (req, res) => {
  try {
    if (req.file) {
      res.status(201).send({'src':req.file.secure_url});
    } else {
      throw Error();
    }
  } catch (error) {
    res.status(400).send({error:'Unable to upload image.'})
  }
};

module.exports = {
  uploadImage
};