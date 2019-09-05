const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../controllers/user');

let mockDatabase;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
}

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

  it('Succeed with Status Code 201', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
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
    await userController.createUser(req,res).then(async () => {
      expect(res.statusCode).toBe(201);
    });
  });

  it('Body contains the user\'s details', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
      method: 'POST',
      body: {
        firstname: 'Bob',
        lastname: 'Johnson',
        username: 'bobby',
        email: 'bobby@johnson.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res).then(async () => {
      const body = await res._getData();
      expect(body.user).toHaveProperty('firstname', 'lastname', 'username', 'email');
    });
  });

  it('Body doesn\'t contain the user\'s password', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
      method: 'POST',
      body: {
        firstname: 'Sarah',
        lastname: 'Willis',
        username: 'sarah',
        email: 'sarah@willis.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res).then(async () => {
      const body = await res._getData();
      expect(body.user).not.toHaveProperty('password');
    });
  });

  it('Body contains the user\'s ID', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
      method: 'POST',
      body: {
        firstname: 'Mike',
        lastname: 'Miller',
        username: 'mike',
        email: 'mike@miller.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res).then(async () => {
      const body = await res._getData();
      expect(body.user).toHaveProperty('id');
    });
  });

  it('Body contains a JWT token', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
      method: 'POST',
      body: {
        firstname: 'Steve',
        lastname: 'Jobs',
        username: 'steve',
        email: 'steve@jobs.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res).then(async () => {
      const body = await res._getData();
      expect(body).toHaveProperty('token');
    });
  });
  
  
  it('Fail with Status Code 400', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
      method: 'POST',
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res).then(async () => {
      expect(res.statusCode).toBe(400);
    });
  });

  it('Fail with Status Code 400 when re-using an existing username', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
      method: 'POST',
      body: {
        firstname: 'Tyler',
        lastname: 'One',
        username: 'steve',
        email: 'tyler@one.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res).then(async () => {
      expect(res.statusCode).toBe(400);
    });
  });

  it('Succeed with Status Code 201 when re-using an existing email', async () => {
    const req = httpMocks.createRequest({
      url: '/api/user',
      method: 'POST',
      body: {
        firstname: 'Adam',
        lastname: 'Phillips',
        username: 'adam',
        email: 'tyler@one.com',
        password: 'password',
      }
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req,res).then(async () => {
      expect(res.statusCode).toBe(201);
    });
  });

});