const mongoose = require('mongoose');

const httpMocks = require('node-mocks-http');
const {
  MongoMemoryServer
} = require('mongodb-memory-server');
const artifactController = require('../controllers/artifact');
const userController = require('../controllers/user');

let mockDatabase;
let token;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

beforeAll(async () => {
  mockDatabase = new MongoMemoryServer();
  const dbUri = await mockDatabase.getConnectionString();
  await mongoose.connect(dbUri, options, err => {
    if (err) console.error(err);
  });
});

// sign up and login a user to the mockDatabase such that there is a valid token that can be used for all the calls which need authorisation
beforeAll(async () => {
  const req = httpMocks.createRequest({
    method: 'POST',
    body: {
      firstname: 'John',
      lastname: 'Smith',
      username: 'johnsmith',
      email: 'john@smith.com',
      password: 'password',
    },
  });
  const res = httpMocks.createResponse(req);
  await userController.createUser(req, res);

  const req1 = httpMocks.createRequest({
    method: 'POST',
    body: {
      username: 'johnsmith',
      password: 'password',
    },
  });
  const res1 = httpMocks.createResponse(req1);
  await userController.loginUser(req1, res1).then(async () => {
    const body = await res1._getData();
    token = body.token;
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mockDatabase.stop();
});

describe('Artifact Controller - Create Artifact', () => {
  it('Should successfully create a new artifact', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: {
        id: '12345',
        title: 'clock',
        desc: 'passed known from the grandparents',
        text: 'Blurb blurb blurb',
        date: '1969',
        origin: 'Bethlehem',
        src: 'funwithfriends',
        tags: 'fun',
        uploaded: null,
      },
    });
    const res = httpMocks.createResponse(req);
    await artifactController.createArtifact(req, res).then(async () => {
      const body = await res._getData();
      console.log(body);
      expect(res.statusCode).toBe(201);

      // expect(body).toHaveProperty('title');
      // expect(body).toHaveProperty('desc');
      // expect(body).toHaveProperty('text');
      // expect(body).toHaveProperty('origin');
      // expect(body).toHaveProperty('uploaded');
      // expect(body.title).toBe('John');
      // expect(body.user.lastname).toBe('Smith');
      // expect(body.user.username).toBe('johnsmith');
      // expect(body.user.email).toBe('john@smith.com');
    });
  });
  // it('Should fail to create a new user with an existing username', async () => {
  //   const req = httpMocks.createRequest({
  //     method: 'POST',
  //     body: {
  //       firstname: 'John',
  //       lastname: 'Smith',
  //       username: 'johnsmith',
  //       email: 'john@smith.com',
  //       password: 'password',
  //     },
  //   });
  //   const res = httpMocks.createResponse(req);
  //   await userController.createUser(req, res).then(async () => {
  //     const body = await res._getData();
  //     expect(res.statusCode).toBe(400);
  //     expect(body).toHaveProperty('error');
  //     expect(body.error).toBe('Username or email already exists.');
  //   });
  // });
});