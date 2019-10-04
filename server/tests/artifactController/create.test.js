const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../../controllers/user');
const artifactController = require('../../controllers/artifact');
const auth = require('../../middleware/auth');

let token1;
let userID1;
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

  // After executing all tests, stop the mock database
  afterAll(async () => {
    await mongoose.disconnect();
    await database.stop();
  });
});

describe('Artifact Controller - Create Artifact', () => {
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
  it('Should not create a new artifact if there is no authorisation token1', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        // purposely omit the user token1 to see if there is a 401 respones
        authorization: 'Bearer'
      },
      // create the mock request
      body: {
        id: "ash1h1h2jk3h1jp",
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
        // since user does not have authorisation token1, we should expect that the request is rejected, leading to a 401 response.
        expect(res.statusCode).toBe(401);
      })
  })
  it('Should not create a new artifact with the same artifactID as a previously created artifact', async () => {
    const req = httpMocks.createRequest({
      // create the mock request
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: {
        // use the same artifact ID as a previously created artifact
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
        // since an artifact with that ID is already in the database, it should reject the request and therefore give a 400 response
        expect(res.statusCode).toBe(400);
      })
  });
  it('Should not create a new artifact with without an ID since this is a non-null field', async () => {
    const req = httpMocks.createRequest({
      // create the mock request
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: {
        // artifact ID is omitted from the test
        title: "Grandma's Apple Pie Recipe",
        desc: "A recipe for grandma's famous apple pie.",
        text: "2 eggs, 4 cups of flour, 8 apples",
        date: "9/7/1982",
        origin: "Bloomington, Minnesota",
        tags: "recipe, apple pie, delicious",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        const body = await res._getData();
        // since the artifact ID is omitted, it should reject the request and therefore give a 400 response
        expect(res.statusCode).toBe(400);
      })
  });
  it('Should not create a new artifact with without a title since this is a non-null field', async () => {
    const req = httpMocks.createRequest({
      // create the mock request
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: {
        // using a different artifact ID from the artifact already in the mock database
        id: "dsgndskdser2431",
        // title is omitted from the test
        desc: "A recipe for grandma's famous apple pie.",
        text: "2 eggs, 4 cups of flour, 8 apples",
        date: "9/7/1982",
        origin: "Bloomington, Minnesota",
        tags: "recipe, apple pie, delicious",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        // since the artifact title is omitted, it should reject the request and therefore give a 400 response
        expect(res.statusCode).toBe(400);
      })
  });
  it('Should not create a new artifact with without a description since this is a non-null field', async () => {
    const req = httpMocks.createRequest({
      // create the mock request
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: {
        // using a different artifact ID from the artifact already in the mock database
        id: "dsgndskdser2431",
        title: "Grandma's Apple Pie Recipe",
        // description is omitted from the test
        text: "2 eggs, 4 cups of flour, 8 apples",
        date: "9/7/1982",
        origin: "Bloomington, Minnesota",
        tags: "recipe, apple pie, delicious",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        // since the artifact description is omitted, it should reject the request and therefore give a 400 response
        expect(res.statusCode).toBe(400);
      })
  });
  it('Should create a new artifact with without text, date, origin, src, tags, uploaded, uploader since these fields are allowed to be null', async () => {
    const req = httpMocks.createRequest({
      // create the mock request
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      body: {
        // using a different artifact ID from the artifact already in the mock database
        id: "309werwesjfkl3",
        title: "Grandma's Apple Pie Recipe",
        desc: "Grandmas Hummos recipe passed down for 19 generation",
        // remove all the fields that can be null to ensure that an artifact can be created without these fields. 
      }
    });
    // create the empty mock response
    const res = httpMocks.createResponse(req);
    // send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        const body = await res._getData();
        // since only fields that are allowed to be null are omitted and the artifact ID is unique, the test should be successful and give back a 201 response
        expect(res.statusCode).toBe(201);
        // check to see that the response is as expected
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('desc');
        // omitted fields should left as undefinited
        expect(body.origin).toBe(undefined);
        expect(body.tags).toBe(undefined);
        expect(body.date).toBe(undefined);
        expect(body.text).toBe(undefined);
        // uploader should be populated with the user ID
        expect(body.uploader).toBe(userID1);
        // uploaded should be populated since is uses a default value of Date.now. Therefore it should not be undefined
        expect(body.uploaded).not.toBe(undefined);
        // check that the details are correct of the fields that were entered (ie not null)
        expect(body.id).toBe(req.body._id);
        expect(body.title).toBe(req.body.title);
        expect(body.desc).toBe(req.body.desc);
      })
  });
});
