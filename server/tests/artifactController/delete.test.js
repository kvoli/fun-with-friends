const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../../controllers/user');
const artifactController = require('../../controllers/artifact');
const auth = require('../../middleware/auth');

let token1;
let token2;
let userID1;
let userID2;
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
  await mongoose.connect(dbUri, options, error => {});
  // Create a new user and token1 to test artifact actions that require authentication
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
      userID1 = body.user.id;
      token1 = body.token;
    });
  // Create a second user and token2 to test artifact actions that require testing artifact manipulation by an incorrect user
  const req1 = httpMocks.createRequest({
    method: 'POST',
    body: {
      firstname: 'Adam',
      lastname: 'Johnson',
      username: 'adamjohnson',
      email: 'adam@johnson.com',
      password: 'password1',
    }
  });
  const res1 = httpMocks.createResponse(req1);
  await userController.createUser(req1, res1)
    .then(async () => {
      const body = await res1._getData();
      userID2 = body.user.id;
      token2 = body.token;
    });
});

// After executing all tests, stop the mock database
afterAll(async () => {
  await mongoose.disconnect();
  await database.stop();
});


describe('Artifact Controller - Delete Artifact', () => {
  // first need to create an artifact so that it can be deleted from the database
  it('Should successfully create a new artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
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
      });
  });
  // now test that the artifact can be deleted
  it('Should successfully delete an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token1}`,
      },
      // set the artifact ID to match an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // set a user ID to match the current user of the app
      user: {
        id: userID1
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.deleteArtifact)
      .then(async () => {
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
      });
  });
  it('Should now successfully be able to re-add an artifact with that ID to the databases since it has been succcesfully deleted', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
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
        // Check that the response is as expected
        expect(res.statusCode).toBe(201);
      });
  });
  it('Should not be able to delete an artifact that is not in the data base', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token1}`,
      },
      params: {
        // give an artifact ID that is not in the database
        artifactId: 'artifactIDthatisnotinthedatabase'
      },
      user: {
        id: userID1
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.deleteArtifact)
      .then(async () => {
        // response should be 400 since an artifact that does not exist cannot be deleted
        expect(res.statusCode).toBe(400);
      });
  });
  it('Should not be able to delete an artifact that the user does not have authorisation to delete', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'DELETE',
      headers: {
        // set the token to be token2 and therefore incorrect since the artifact is uploaded by the user with token1. Therefore the user does not have permission to delete the artifact
        'Authorization': `Bearer ${token2}`,
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.deleteArtifact)
      .then(async () => {
        // Check that the response 400 since the token1 is incorrect and therefore the userID1 is incorrect preventing the user from deleting the artifact from the database
        expect(res.statusCode).toBe(400);
      });
  });
});
