var Circle = require('../models/circle');

var createCircle = async (req, res) => {
  try {
    req.body._id = req.body.id;
    delete req.body.id;
    // Create a circle from the details in the request
    const circle = new Circle(req.body);
    // Wait for the circle to be saved in the database
    await circle.save();
    // Return the circle back to the client
    res.status(201).send(circle.toObject());
  } catch (error) {
    // Return an error message as the artfact was not able to be created
    res.status(400).send({
      error: 'Unable to create circle.'
    });
  };
};

var getAllCircles = async (req, res) => {
  try {
    //get all the circles in the database that contain the user as a member
    const circles = await Circle.find({ members: req.user.id });
    
    res.status(200).send(circles.map(circle => circle.toObject()));
  } catch (error) {
    res.status(400).send({
      error: 'Unable to get circles.',
    });
  };
};

var deleteCircle = async (req, res) => {
  try {
    //delete circle according to the id of the request
    await Circle.deleteOne({
      _id: req.params.id
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      error: 'Unable to delete circle'
    });
  };
};

//add a member to a circle
//member details that should be included in payload: { memberId: string, admin: boolean }
//only added members that are not already members and admins that are not already admins to avoid unnecessary data storage
//This means that member IDs must be unique
var addMember = async (req, res) => {
  try {
    const addedMember = req.body.id;
    const isAdmin = req.body.admin;
    await Circle.findOneAndUpdate({
      _id: req.params.id
    }, {
      $addToSet: {
        members: addedMember
      }
    }, {
      useFindAndModify: false
    });
    if (isAdmin) {
      await Circle.findOneAndUpdate({
        _id: req.params.id
      }, {
        $addToSet: {
          admins: addedMember
        }
      }, {
        useFindAndModify: false
      });
    }
    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      error: 'unable to update circle'
    });
  }
}

var deleteMember = async (req, res) => {
  try {
    const deletedMember = req.body.id;
    console.log(deletedMember);
    await Circle.findOneAndUpdate({
      _id: req.params.id
    }, {
      $pull: {
        members: deletedMember
      }
    }, {
      useFindAndModify: false
    });
    await Circle.findOneAndUpdate({
      _id: req.params.id
    }, {
      $pull: {
        admins: deletedMember
      }
    }, {
      useFindAndModify: false
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      error: 'unable to update circle'
    });
  }
}

module.exports = {
  createCircle,
  getAllCircles,
  deleteCircle,
  addMember,
  deleteMember
};
