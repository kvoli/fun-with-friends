const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../../controllers/user');
const circleController = require('../../controllers/circle');
const artifactController = require('../../controllers/artifact');
const auth = require('../../middleware/auth');

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
