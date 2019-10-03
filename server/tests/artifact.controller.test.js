const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../controllers/user');
const artifactController = require('../controllers/artifact');
const auth = require('../middleware/auth');

let token;
let database;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Before executing any tests, create a mock database
beforeAll(async () => {
  // Create the in memory mock database and get the connection string
  database = new MongoMemoryServer();
  const dbUri = await database.getConnectionString();
  // Connect to the mock database
  await mongoose.connect(dbUri, options, error => {
    if(error) console.error(error);
  });
  // Create a new user and token to test artifact actions that require authentication
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
  await userController.createUser(req, res)
    .then(async () => {
      const body = await res._getData();
      token = body.token;
    });
});

// After executing all tests, stop the mock database
afterAll(async () => {
  await mongoose.disconnect();
  await database.stop();
});

describe('Artifact Controller - Create Artifact', () => {
  it('Should successfully create a new artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        id: "ash1h1h2jk3h1jk",
        title: "Grandma's Apple Pie Recipe",
        desc: "A recipe for grandma's famous apple pie.",
        text: "2 eggs, 4 cups of flour, 8 apples",
        date: "9/7/1982",
        origin: "Bloomington, Minnesota",
        tags: "recipe, apple pie, delicious",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(201);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('date');
        expect(body).toHaveProperty('origin');
        expect(body).toHaveProperty('tags');
        expect(body).toHaveProperty('desc');
        expect(body).toHaveProperty('text');
        expect(body).toHaveProperty('uploaded');
        expect(body).toHaveProperty('uploader');
        expect(body.id).toBe(req.body._id);
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
});
