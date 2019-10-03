const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../controllers/user');
const circleController = require('../controllers/circle');
const artifactController = require('../controllers/artifact');
const auth = require('../middleware/auth');

let token1;
let token2;
let userID1;
let userID2;
let circleID1;
let circleID2;
let cricleID3;
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
  // create a private circle so that the user can join the circle for testing getArtifacts endpoint
  const req2 = httpMocks.createRequest({
    method: 'POST',
    body: {
      id: "testcircleid",
      title: 'Private Test Circle',
      description: 'Private Circle Created for testing',
    }
  });
  const res2 = httpMocks.createResponse(req2);
  await circleController.createCircle(req2, res2)
    .then(async () => {
      const body = await res2._getData();
      circleID1 = body.id;
    });
  // create a public circle for testing getArtifacts endpoint
  const req3 = httpMocks.createRequest({
    method: 'POST',
    body: {
      id: "publictestcircleid",
      title: 'Public Test Circle',
      description: 'Public Circle Created for testing',
      public: true,
    }
  });
  const res3 = httpMocks.createResponse(req3);
  await circleController.createCircle(req3, res3)
    .then(async () => {
      const body = await res3._getData();
      circleID2 = body.id;
    });
  // create a private circle for testing getArtifacts endpoint such that mock user is not a admin but a member
  const req4 = httpMocks.createRequest({
    method: 'POST',
    body: {
      id: "privatetestcircleid2",
      title: 'Private Test Circle 2',
      description: 'Private Circle Created for testing 2',
    }
  });
  const res4 = httpMocks.createResponse(req4);
  await circleController.createCircle(req4, res4)
    .then(async () => {
      const body = await res4._getData();
      circleID3 = body.id;
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

describe('Artifact Controller - Delete Artifact', () => {
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
  it('Should now successfully be able to readd an artifact with that ID to the databases since it has been succcesfully deleted', async () => {
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

describe('Artifact Controller - Update Artifact', () => {
  it('Should successfully update the title of an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change title of the artifact
      body: {
        title: "A recipe passed down from Grandpa",
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
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        // check to see that the title is updated correctly and nothing else is changed
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
  it('Should successfully update the desc of an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change desc of the artifact
      body: {
        title: "A recipe passed down from Grandpa",
        desc: "Recipe sent down from grandpa",
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
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        // check to see that the desc is updated correctly and nothing else is changed
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
  it('Should successfully update the text of an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change text of the artifact
      body: {
        title: "A recipe passed down from Grandpa",
        desc: "Recipe sent down from grandpa",
        text: "Two raw eggs and a bucket of concrete",
        date: "9/7/1982",
        origin: "Bloomington, Minnesota",
        tags: "recipe, apple pie, delicious",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        // check to see that the text is updated correctly and nothing else is changed
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
  it('Should successfully update the date of an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change date of the artifact
      body: {
        title: "A recipe passed down from Grandpa",
        desc: "Recipe sent down from grandpa",
        text: "Two raw eggs and a bucket of concrete",
        date: "2/9/1932",
        origin: "Bloomington, Minnesota",
        tags: "recipe, apple pie, delicious",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        // check to see that the date is updated correctly and nothing else is changed
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
  it('Should successfully update the origin of an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change origin of the artifact
      body: {
        title: "A recipe passed down from Grandpa",
        desc: "Recipe sent down from grandpa",
        text: "Two raw eggs and a bucket of concrete",
        date: "9/7/1982",
        origin: "Russia",
        tags: "recipe, apple pie, delicious",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        // check to see that the origin is updated correctly and nothing else is changed
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
  it('Should successfully update the tags of an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change tags of the artifact
      body: {
        title: "A recipe passed down from Grandpa",
        desc: "Recipe sent down from grandpa",
        text: "Two raw eggs and a bucket of concrete",
        date: "9/7/1982",
        origin: "Russia",
        tags: "toughen up, go hard",
        src: "http://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        // check to see that the tags is updated correctly and nothing else is changed
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
  it('Should successfully update the src of an artifact where the user is the uploader of the artifact', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is in the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change src of the artifact
      body: {
        title: "A recipe passed down from Grandpa",
        desc: "Recipe sent down from grandpa",
        text: "Two raw eggs and a bucket of concrete",
        date: "9/7/1982",
        origin: "Russia",
        tags: "toughen up, go hard",
        src: "https://www.google.com/search?tbm=isch&q=concrete+image&chips=q:concrete+image,g_1:cement:kQ02qAixwNw%3D&usg=AI4_-kQUiFBQxOb5iJMg2R3QgXDaKrGMvw&sa=X&ved=0ahUKEwj2s7j29P_kAhVz8XMBHZfeDwMQ4lYIMygE&biw=1680&bih=971&dpr=2#imgrc=XqevjafXiRTe6M:"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        // check to see that the src is updated correctly and nothing else is changed
        expect(body.title).toBe(req.body.title);
        expect(body.date).toBe(req.body.date);
        expect(body.origin).toBe(req.body.origin);
        expect(body.tags).toBe(req.body.tags);
        expect(body.desc).toBe(req.body.desc);
        expect(body.text).toBe(req.body.text);
      });
  });
  it('Should not be able to update an artifact that does not exist', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is notin the database
      params: {
        artifactId: 'artifactIDThatDoesNotExist'
      },
      // change title of the artifact
      body: {
        title: "This artifact does not exist",
        desc: "Recipe sent down from grandpa",
        text: "Two raw eggs and a bucket of concrete",
        date: "9/7/1982",
        origin: "Russia",
        tags: "toughen up, go hard",
        src: "https://www.google.com/search?tbm=isch&q=concrete+image&chips=q:concrete+image,g_1:cement:kQ02qAixwNw%3D&usg=AI4_-kQUiFBQxOb5iJMg2R3QgXDaKrGMvw&sa=X&ved=0ahUKEwj2s7j29P_kAhVz8XMBHZfeDwMQ4lYIMygE&biw=1680&bih=971&dpr=2#imgrc=XqevjafXiRTe6M:"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the update artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        // Check that the response is as expected
        expect(res.statusCode).toBe(400);
      });
  });
  it('Should not be able to update an artifact without including a title since it is a required field', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is notin the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change src of the artifact
      body: {
        title: null,
        desc: "Making a change to the description",
        text: "Two raw eggs and a bucket of concrete",
        date: "9/7/1982",
        origin: "Russia",
        tags: "toughen up, go hard",
        src: "https://www.google.com/search?tbm=isch&q=concrete+image&chips=q:concrete+image,g_1:cement:kQ02qAixwNw%3D&usg=AI4_-kQUiFBQxOb5iJMg2R3QgXDaKrGMvw&sa=X&ved=0ahUKEwj2s7j29P_kAhVz8XMBHZfeDwMQ4lYIMygE&biw=1680&bih=971&dpr=2#imgrc=XqevjafXiRTe6M:"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the update artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        // Check that the response is as expected
        expect(res.statusCode).toBe(400);
      });
  });
  it('Should not be able to update an artifact without including a desc since it is a required field', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'PUT',
      // set the token to be the same token as the user who uploaded the artifact: ie token1.
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set artifact ID to be an artifact that is notin the database
      params: {
        artifactId: 'ash1h1h2jk3h1jk'
      },
      // change src of the artifact
      body: {
        title: "A title",
        desc: null,
        text: "Two raw eggs and a bucket of concrete",
        date: "9/7/1982",
        origin: "Russia",
        tags: "toughen up, go hard",
        src: "https://www.google.com/search?tbm=isch&q=concrete+image&chips=q:concrete+image,g_1:cement:kQ02qAixwNw%3D&usg=AI4_-kQUiFBQxOb5iJMg2R3QgXDaKrGMvw&sa=X&ved=0ahUKEwj2s7j29P_kAhVz8XMBHZfeDwMQ4lYIMygE&biw=1680&bih=971&dpr=2#imgrc=XqevjafXiRTe6M:"
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the update artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.updateArtifact)
      .then(async () => {
        // Check that the response is as expected
        expect(res.statusCode).toBe(400);
      });
  });
});

describe('Artifact Controller - Get Artifacts', () => {
  it('Should successfully add the user to the first private circle and make them an admin',
    // First we need to add the user to the relevant circles
    async () => {
      // Create the mock request
      const req = httpMocks.createRequest({
        method: 'POST',
        // set the token to be the same token as the user who we want to add to the circle
        headers: {
          'Authorization': `Bearer ${token1}`
        },
        params: {
          id: `${circleID1}`
        },
        body: {
          id: `${userID1}`,
          admin: true
        }
      });
      const res = httpMocks.createResponse(req);
      // Send the request to the update circle controller to add the member to the circle
      await auth(req, res, circleController.addMember)
        .then(async () => {
          // Check that the response is as expected
          expect(res.statusCode).toBe(200);
        });
    }
  );
  it('Should create an artifact which can be added to the circle', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // create the mock request
      body: {
        id: 'privateCircleArtifact1',
        title: 'Private Circle Artifact 1',
        desc: 'testing get all circles.',
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        // since user does not have authorisation token1, we should expect that the request is rejected, leading to a 401 response.
        expect(res.statusCode).toBe(201);
      });
  });
  it('Should upload the artifact to the circle', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      // set the token to be the same token as the user
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set the circleID to be the relevant circle
      params: {
        id: `${circleID1}`
      },
      user: {
        id: `${userID1}`
      },
      body: {
        id: 'privateCircleArtifact1'
      }
    });
    const res = httpMocks.createResponse(req);
    // Send the request to the update circle controller to add the member to the circle
    await auth(req, res, circleController.addArtifact)
      .then(async () => {
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
      });
  });

  // we do not need to add the user to public circle
  it('Should create an artifact which can be added to the public circle', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // create the mock request
      body: {
        id: 'publicCircleArtifact1',
        title: 'Public Circle Artifact 1',
        desc: 'testing get all circles.',
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        // since user does not have authorisation token1, we should expect that the request is rejected, leading to a 401 response.
        expect(res.statusCode).toBe(201);
      });
  });
  it('Should upload the artifact to the public circle', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      // set the token to be the same token as the user
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set the circleID to be the relevant circle
      params: {
        id: `${circleID2}`
      },
      body: {
        id: 'publicCircleArtifact1'
      }
    });
    const res = httpMocks.createResponse(req);
    // Send the request to the update circle controller to add the member to the circle
    await auth(req, res, circleController.addArtifact)
      .then(async () => {
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
      });
  });
  it('Should successfully add the user to the second private circle circle and not make them an admin',
    // First we need to add the user to the relevant circles
    async () => {
      // Create the mock request
      const req = httpMocks.createRequest({
        method: 'POST',
        // set the token to be the same token as the user who we want to add to the circle
        headers: {
          'Authorization': `Bearer ${token1}`
        },
        params: {
          id: `${circleID3}`
        },
        body: {
          id: `${userID1}`,
          admin: false
        }
      });
      const res = httpMocks.createResponse(req);
      // Send the request to the update circle controller to add the member to the circle
      await auth(req, res, circleController.addMember)
        .then(async () => {
          const body = await res._getData();
          // Check that the response is as expected
          expect(res.statusCode).toBe(200);
        });
    }
  );
  it('Should create an artifact which can be added to the second private circle where the user is not a member', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      headers: {
        // make the second user upload the artifact, so that the first user can be restricted from accessing the artifact later.
        'Authorization': `Bearer ${token2}`
      },
      // create the mock request
      body: {
        id: 'privateCircleArtifact2',
        title: 'Private Circle Artifact 2',
        desc: 'testing get all circles.',
      }
    });
    // Create the empty mock response
    const res = httpMocks.createResponse(req);
    // Send the request to the create artifact controller to handle and populate the response object 
    await auth(req, res, artifactController.createArtifact)
      .then(async () => {
        const body = await res._getData();
        // since user does not have authorisation token1, we should expect that the request is rejected, leading to a 401 response.
        expect(res.statusCode).toBe(201);
      });
  });
  it('Should upload the artifact to the second private circle', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      // set the token to be the same token as the user
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      // set the circleID to be the relevant circle
      params: {
        id: `${circleID3}`
      },
      body: {
        id: 'privateCircleArtifact2',
        user: `${userID1}`
      }
    });
    const res = httpMocks.createResponse(req);
    // Send the request to the update circle controller to add the member to the circle
    await auth(req, res, circleController.addArtifact)
      .then(async () => {
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
      });
  });
  // finally we are ready to test getArtifact endpoint
  it('Should return all the artifacts available to the user. That is, the three artifacts added to the three relevant circles and the two others that were created in previous testing', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      // set the token to be the same token as the user
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      params: {
        user: {
          id: `${userID1}`
        }
      },
    });
    const res = httpMocks.createResponse(req);
    // Send the request to the getAll artifacts controller to add the member to the circle
    await auth(req, res, artifactController.getArtifacts)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        const artifactIDs = [];
        // map all artifact IDs into an array
        body.forEach(element => {
          artifactIDs.push(element.id);
        });
        // ensure that the three relevant artifacts are in the artifact array 
        const privatecricle1 = artifactIDs.indexOf('privateCircleArtifact1');
        expect(privatecricle1).not.toBe(-1);
        const publiccricle = artifactIDs.indexOf('publicCircleArtifact1');
        expect(publiccricle).not.toBe(-1);
        const privatecricle2 = artifactIDs.indexOf('privateCircleArtifact2');
        expect(privatecricle2).not.toBe(-1);
      });
  });
  it('Should successfully remove the user from the second private circle circle taking away access to the artifacts in that circle',
    async () => {
      // Create the mock request
      const req = httpMocks.createRequest({
        method: 'POST',
        // set the token to be the same token as the user who we want to add to the circle
        headers: {
          'Authorization': `Bearer ${token1}`
        },
        params: {
          id: `${circleID3}`
        },
        body: {
          id: `${userID1}`,
        }
      });
      const res = httpMocks.createResponse(req);
      // Send the request to the update circle controller to remove the member to the circle
      await auth(req, res, circleController.deleteMember)
        .then(async () => {
          // Check that the response is as expected
          expect(res.statusCode).toBe(200);
        });
    }
  );
  it('Should return all the artifacts available to the user. Now there should only be two artifacts since the user is no longer a member of the second private circle', async () => {
    // Create the mock request
    const req = httpMocks.createRequest({
      method: 'POST',
      // set the token to be the same token as the user
      headers: {
        'Authorization': `Bearer ${token1}`
      },
      params: {
        user: {
          id: `${userID1}`
        }
      },
    });
    const res = httpMocks.createResponse(req);
    // Send the request to the getAll artifacts controller to add the member to the circle
    await auth(req, res, artifactController.getArtifacts)
      .then(async () => {
        const body = await res._getData();
        // Check that the response is as expected
        expect(res.statusCode).toBe(200);
        const artifactIDs = [];
        // map all artifact IDs into an array
        body.forEach(element => {
          artifactIDs.push(element.id);
        });

        // ensure that the three relevant artifacts are in the artifact array 
        const privatecricle1 = artifactIDs.indexOf('privateCircleArtifact1');
        expect(privatecricle1).not.toBe(-1);
        const publiccricle = artifactIDs.indexOf('publicCircleArtifact1');
        expect(publiccricle).not.toBe(-1);
        const privatecricle2 = artifactIDs.indexOf('privateCircleArtifact2');
        expect(privatecricle2).toBe(-1);
      });
  });
});
