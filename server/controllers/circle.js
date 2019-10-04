/* eslint-disable no-underscore-dangle */
const Circle = require('../models/circle');

const createCircle = async (req, res) => {
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
      error: 'Unable to create circle.',
    });
  }
};

const getAllCircles = async (req, res) => {
  try {
    // get all the circles in the database that contain the user as a member, admin or that are public
    const circles = await Circle.find({
      $or: [{
          members: req.user.id
        },
        {
          admins: req.user.id
        },
        {
          public: true
        }
      ],
    });
    res.status(200).send(circles.map(circle => circle.toObject()));
  } catch (error) {
    res.status(400).send({
      error: 'Unable to get circles.',
    });
  }
};

const deleteCircle = async (req, res) => {
  try {
    // delete circle according to the id of the request
    await Circle.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      error: 'Unable to delete circle',
    });
  }
};

// add a member to a circle
// member details that should be included in payload: { member: string, admin: boolean }
// only added members that are not already members and admins that are not already admins to avoid unnecessary data storage
// This means that member IDs must be unique
const addMember = async (req, res) => {
  try {
    // extract values from request parameters and body
    const circleId = req.params.id;
    const memberId = req.body.id;
    const adminFlag = req.body.admin;

    // mongoose find and update parameters
    const query = {
      _id: req.params.id
    };
    const update = adminFlag ? {
      $addToSet: {
        admins: memberId
      }
    } : {
      $addToSet: {
        members: memberId
      }
    };
    const options = {
      useFindAndModify: false
    };

    // get the circle of interest
    const circle = await Circle.findOne(query);
    const members = circle.members;
    const admins = circle.admins;

    // check if the user being added is already a circle member or admin
    if (adminFlag) {
      if (circle.admins.includes(memberId)) {
        res.status(400).send({
          error: 'User is already an admin of this circle.'
        });
      };
    } else {
      if (circle.members.includes(memberId)) {
        res.status(400).send({
          error: 'User is already a member of this circle.'
        });
      }
    }

    // update the circle's members or admins by adding the current user
    await Circle.findOneAndUpdate(query, update, options);
    res.status(200).send();

  } catch (error) {

    res.status(400).send({
      error: 'unable to update circle',
    });
  };
};

const deleteMember = async (req, res) => {
  try {
    const deletedMember = req.body.id;
    await Circle.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $pull: {
        members: deletedMember,
      },
    }, {
      useFindAndModify: false,
    });
    await Circle.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $pull: {
        admins: deletedMember,
      },
    }, {
      useFindAndModify: false,
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).send({
      error: 'unable to update circle',
    });
  }
};

const addArtifact = async (req, res) => {
  try {
    // Check if the user is member or an admin of the circle
    const circle = await Circle.findOne({
      _id: req.params.id
    });
    if (circle.public === false && !circle.members.includes(req.user.id) && !circle.admins.includes(req.user.id)) {
      return res.status(400).send({
        error: 'You do not have permissions to add to this circle.'
      });
    };
    // Add the artifact to the circle (ignoring duplicates)
    await Circle.findOneAndUpdate({
      _id: req.params.id
    }, {
      $addToSet: {
        artifacts: req.body.id
      }
    }, {
      useFindAndModify: false
    });

    return res.status(200).send();
  } catch (error) {
    return res.status(400).send({
      error: 'Could not add artifact to circle.'
    });
  };
};

const deleteArtifact = async (req, res) => {
  try {
    // Check if the user is a member of the circle
    const circle = await Circle.findOne({
      _id: req.params.id
    });
    if (!circle.members.includes(req.user.id)) {
      return res.status(400).send({
        error: 'You do not have permissions to delete from this circle.'
      });
    };
    // Remove the artifact from the circle
    await Circle.updateOne({
      "_id": req.params.id
    }, {
      $pull: {
        artifacts: req.body.id
      }
    }, {
      useFindAndModify: false
    });
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send({
      error: 'Could not remove artifact from circle.'
    });
  };
};

module.exports = {
  createCircle,
  getAllCircles,
  deleteCircle,
  addMember,
  deleteMember,
  deleteArtifact,
  addArtifact,
};
