const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../../controllers/user');

let mockDatabase;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

beforeAll(async () => {
  mockDatabase = new MongoMemoryServer();
  const dbUri = await mockDatabase.getConnectionString();
  await mongoose.connect(dbUri, options, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mockDatabase.stop();
});

describe('User Controller - Create User', () => {
  it('Should successfully create a new user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        firstname: 'John',
        lastname: 'Smith',
        username: 'johnsmith',
        email: 'john@smith.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res)
      .then(async () => {
        const body = await res._getData();
        expect(res.statusCode).toBe(201);
        expect(body).toHaveProperty('user');
        expect(body).toHaveProperty('token');
        expect(body.user).toHaveProperty('firstname');
        expect(body.user).toHaveProperty('lastname');
        expect(body.user).toHaveProperty('username');
        expect(body.user).toHaveProperty('email');
        expect(body.user).toHaveProperty('id');
        expect(body.user).not.toHaveProperty('password');
        expect(body.user).not.toHaveProperty('__v');
        expect(body.user.firstname).toBe('John');
        expect(body.user.lastname).toBe('Smith');
        expect(body.user.username).toBe('johnsmith');
        expect(body.user.email).toBe('john@smith.com');
      });
  });
  it('Should fail to create a new user with an existing username', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        firstname: 'John',
        lastname: 'Smith',
        username: 'johnsmith',
        email: 'john@smith.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res)
      .then(async () => {
        const body = await res._getData();
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Username or email already exists.');
      });
  });
});

describe('User Controller - Login User', () => {
  it('Should successfully login to an existing user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'johnsmith',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.loginUser(req,res)
      .then(async () => {
        const body = await res._getData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('user');
        expect(body).toHaveProperty('token');
        expect(body.user).toHaveProperty('firstname');
        expect(body.user).toHaveProperty('lastname');
        expect(body.user).toHaveProperty('username');
        expect(body.user).toHaveProperty('email');
        expect(body.user).toHaveProperty('id');
        expect(body.user).not.toHaveProperty('password');
        expect(body.user).not.toHaveProperty('__v');
        expect(body.user.firstname).toBe('John');
        expect(body.user.lastname).toBe('Smith');
        expect(body.user.username).toBe('johnsmith');
        expect(body.user.email).toBe('john@smith.com');
      });
  });
  it('Should fail to login to an unknown user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'unknown',
        password: 'invalid',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.loginUser(req,res)
      .then(async () => {
        const body = await res._getData();
        expect(res.statusCode).toBe(401);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Incorrect username or password.');
      });
  });
});