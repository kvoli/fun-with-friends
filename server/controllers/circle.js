const Circle = require('../models/circle');

const fixId = body => {
  body._id = body.id;
  delete body.id;
  return body;
};

const createCircle = async (req, res) => {
  try {
    const circle = new Circle(fixId(req.body));

    await circle.save();
    return res.status(201).send(circle.toObject());
    
  } catch (error) {
    return res.status(400).send({ error: 'Unable to create circle.' });
  };
};

const getAllCircles = async (req, res) => {
  try {
    const query = { $or: [ { members: req.user.id }, { admins: req.user.id }, { public: true } ]};
    const circles = await Circle.find(query);
    
    return res.status(200).send(circles.map(circle => circle.toObject()));

  } catch (error) {
    return res.status(400).send({ error: 'Unable to get circles.' });
  };
};

const deleteCircle = async (req, res) => {
  try {
    const circle = await Circle.findById(req.params.id);

    const exists = circle != null;
    if (!exists) {
      return res.status(400).send({ error: 'Circle does not exist.' });
    };

    const permission = circle.admins.includes(req.user.username);
    if (!permission) {
      return res.status(400).send({ error: 'You do not have permissions to delete this circle.' });
    };

    await Circle.findByIdAndDelete(req.params.id);
    return res.status(200).send();

  } catch (error) {
    return res.status(400).send({ error: 'Unable to delete circle' });
  };
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
    const query = { _id: req.params.id };
    const update = adminFlag ? { $addToSet: { admins: memberId } } : { $addToSet: { members: memberId } };
    const options = { useFindAndModify: false };

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

// 
const deleteMember = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const update = { $pull: { members: req.body.id } };
    const options = { useFindAndModify: false };
    const circle = await Circle.findOne(query);

    const permission = req.user.id === req.body.id || req.user.adminOf(circle);
    if (!permission) {
      return res.status(400).send('You do not have permission to delete this member. ');
    };

    await Circle.findOneAndUpdate(query, update, options);
    return res.status(200).send();

  } catch (error) {
    return res.status(400).send({ error: 'Unable to delete member.' });
  };
};

// deletes an admin from a circle if the user is an admin of the circle and the admin is not the last admin of the circle
const deleteAdmin = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const update = { $pull: { admins: req.body.id } };
    const options = { useFindAndModify: false };
    const circle = await Circle.findOne(query);

    const permission = req.user.adminOf(circle);
    if (!permission) {
      return res.status(400).send({ error: 'You do not have permissions to delete this admin. '});
    };

    const lastAdmin = circle.admins.length === 1;
    if (lastAdmin) {
      return res.status(400).send({ error: 'Cannot delete the last admin.' });
    };

    Circle.findOneAndUpdate(query, update, options);
    return res.status(200).send();

  } catch (error) {
    return res.status(400).send({ error: 'Unable to delete admin.' });
  };
};

// adds an artifact to a circle if the circle is public or the user is a member/admin of the circle
const addArtifact = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const update = { $addToSet: { artifacts: req.body.id } };
    const options = { useFindAndModify: false };
    const circle = await Circle.findOne(query);

    const permission = circle.public || req.user.memberOf(circle) || req.user.adminOf(circle);
    if (!permission) {
      return res.status(400).send({ error: 'You do not have permissions to add to this circle.' });
    };

    await Circle.findOneAndUpdate(query, update, options);
    return res.status(200).send();
    
  } catch (error) {
    return res.status(400).send({ error: 'Could not add artifact to circle.' });
  };
};

// deletes an artifact from a circle if the circle is public or the user as a member/admin of the circle
const deleteArtifact = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const update = { $pull: { artifacts: req.body.id } };
    const options = { useFindAndModify: false };
    const circle = await Circle.findOne(query);

    const permission = circle.public || req.user.memberOf(circle) || req.user.adminOf(circle);
    if (!permission) {
      return res.status(400).send({ error: 'You do not have permissions to delete from this circle.' });
    };

    await Circle.updateOne(query, update, options);
    return res.status(200).send();

  } catch (error) {
    return res.status(400).send({ error: 'Could not remove artifact from circle. '});
  };
};

module.exports = {
  createCircle,
  getAllCircles,
  deleteCircle,
  addMember,
  deleteMember,
  deleteAdmin,
  deleteArtifact,
  addArtifact,
};
