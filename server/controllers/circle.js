var Circle = require('../models/circle');

var createCircle = async (req, res) => {
  try {
    console.log(req.Circle);
    req.body._id = req.body.id;
    delete req.body.id;
    // Create a circle from the details in the request
    const circle = new Circle(req.body);
    // Wait for the circle to be saved in the database
    await circle.save();
    // Return the circle back to the client
    res.status(201).send(circle.toObject());
  } catch (error) {
    console.log(error);
    // Return an error message as the artfact was not able to be created
    res.status(400).send({error:'Unable to create circle.'});
  };
};

var getAllCircles = async (req, res) => {
  try {
    //get all the circles in the database that contain the user as a member
    const circles = await Circle.find({ members : req.body.id });
    res.status(200).send(circles.map(circle => circle.toObject()));
  } catch (error) {
    res.status(400).send({error:'Unable to get circles.'});
  };
};

var deleteCircle = async (req, res) => {
  try {
    console.log(req.body);
    //delete circle according to the id of the request
    await Circle.deleteOne({_id:req.body.id});
    res.status(200).send();
  } catch (error) {
    res.status(400).send({error: "Unable to delete circle"});
  };
};


module.exports = {createCircle, getAllCircles, deleteCircle};







