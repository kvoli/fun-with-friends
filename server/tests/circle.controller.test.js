const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../controllers/user');
const circleController = require('../controllers/circle');
const auth = require('../middleware/auth');

const users = require('./constants/users');
const circles = require('./constants/circles');

let token1;
let token2;
let database;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// before executing any tests, create a mock database
beforeAll(async () => {
  // create the in memory mock database and get the connection string
  database = new MongoMemoryServer();
  const dbUri = await database.getConnectionString();
  // connect to the mock database
  await mongoose.connect(dbUri, options, error => {
    if(error) console.error(error);
  });
  // create a user and token to test circle actions that require authentication
  const req1 = httpMocks.createRequest({
    method: 'POST',
    body: users.john
  });
  const res1 = httpMocks.createResponse(req1);
  await userController.createUser(req1, res1)
    .then(async () => {
      const body = await res1._getData();
      token1 = body.token;
    });

  // create a 2nd user and token to test circle actions that require different users
  const req2 = httpMocks.createRequest({
    method: 'POST',
    body: {
      firstname: 'Jacob',
      lastname: 'Parks',
      username: 'jacobparks',
      email: 'jacob@parks.com',
      password: 'password',
    }
  });
  const res2 = httpMocks.createResponse(req2);
  await userController.createUser(req2, res2)
    .then(async () => {
      const body = await res2._getData();
      token2 = body.token;
    });
});

// after executing all tests, stop the mock database
afterAll(async () => {
  await mongoose.disconnect();
  await database.stop();
});

describe('createCircle', () => {

  it('Should successfully create a new public circle', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: circles.publicCircle
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.createCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(201);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('description');
        expect(body).toHaveProperty('src');
        expect(body).toHaveProperty('previewImage');
        expect(body).toHaveProperty('members');
        expect(body).toHaveProperty('admins');
        expect(body).toHaveProperty('artifacts');
        expect(body).toHaveProperty('public');
        expect(body).toHaveProperty('date');
        expect(body.id).toBe(req.body._id);
        expect(body.title).toBe(req.body.title);
        expect(body.description).toBe(req.body.description);
        expect(body.src).toBe(req.body.src);
        expect(body.previewImage).toBe(req.body.previewImage);
        expect(body.members).toStrictEqual(req.body.members);
        expect(body.admins).toStrictEqual(req.body.admins);
        expect(body.artifacts).toStrictEqual(req.body.artifacts);
        expect(body.public).toBe(req.body.public);
      });
  });

  it('Should successfully create a new private circle', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: circles.privateCircle
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.createCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(201);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('description');
        expect(body).toHaveProperty('src');
        expect(body).toHaveProperty('previewImage');
        expect(body).toHaveProperty('members');
        expect(body).toHaveProperty('admins');
        expect(body).toHaveProperty('artifacts');
        expect(body).toHaveProperty('public');
        expect(body).toHaveProperty('date');
        expect(body.id).toBe(req.body._id);
        expect(body.title).toBe(req.body.title);
        expect(body.description).toBe(req.body.description);
        expect(body.src).toBe(req.body.src);
        expect(body.previewImage).toBe(req.body.previewImage);
        expect(body.members).toStrictEqual(req.body.members);
        expect(body.admins).toStrictEqual(req.body.admins);
        expect(body.artifacts).toStrictEqual(req.body.artifacts);
        expect(body.public).toBe(req.body.public);
      });
  });

  it('Should fail to create a circle with a non-unique id', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: circles.nonUniqueId
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.createCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Unable to create circle.');
      });
  });

  it('Should fail to create a circle without an id', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: circles.noId
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.createCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Unable to create circle.');
      });
  });

  it('Should fail to create a circle without a title', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: circles.noTitle
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.createCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Unable to create circle.');
      });
  });

  it('Should fail to create a circle without a description', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: circles.noDescription
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.createCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Unable to create circle.');
      });
  });
});

describe('deleteCircle', () => {

  it('should successfully delete a circle that you are an admin of', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      params: { id: circles.publicCircle._id }
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.deleteCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(200);
      });
  });

  it('should fail to delete a circle that you are not an admin of', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token2}`
      },
      params: {id: circles.privateCircle._id}
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.deleteCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('You do not have permissions to delete this circle.');
      });
  });

  it('should fail to delete a circle that does not exist', async () => {
    // create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      params: {id: 'doesNotExistId'}
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, circleController.deleteCircle)
      .then(async () => {
        const body = await res._getData();
        // check that the response is as expected
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Circle does not exist.');
      });
  });

});
