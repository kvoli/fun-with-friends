const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const userController = require('../../../controllers/user');
const artifactController = require('../../../controllers/artifact');
const auth = require('../../../middleware/auth');

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

describe('Artifact Controller - Update Artifact', () => {
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
