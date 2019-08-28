var uploadImage = async (req, res) => {
  try {
    if (req.file) {
      res.status(201).send(req.file.url);
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({error:'Unable to upload image.'})
  }
};

module.exports = {
  uploadImage
};