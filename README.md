# Fun With Friends [![Build Status](https://travis-ci.com/kvoli/fun-with-friends.svg?branch=staging)](https://travis-ci.com/kvoli/fun-with-friends) [![License](https://img.shields.io/github/license/kvoli/fun-with-friends)](https://github.com/kvoli/fun-with-friends/blob/staging/LICENSE) [![GitHub issues](https://img.shields.io/github/issues-pr/kvoli/fun-with-friends)](https://github.com/kvoli/fun-with-friends/pulls) [![Activity](https://img.shields.io/github/commit-activity/m/kvoli/fun-with-friends)](https://github.com/kvoli/fun-with-friends/commits/staging)

An artifact registry for IT Project (COMP30022).

# Stack
Fun With Friends is built using the MERN stack, consisting of a React frontend served by a NodeJS backend running Express and connected to a MongoDB database.

# Build Pipeline
1. New pull requests trigger TravisCI to deploy a new worker
2. The worker pulls the repo, installs package dependencies, runs unit and integration tests and builds the React client 
3. On success, the worker then builds a Docker container of the React client and Express server and pushes it to DockerHub
4. On the production server running Ubuntu, Watchtower receives a notification that there is a new latest container. It then fetches the new latest container and gracefully runs the new container while stopping the old container.

# Development
1. Navigate to the server directory with `cd server`
2. Execute `npm start develop` to start both the React client and Express server in development mode allowing instant refreshes.
The React client listens on [port 3000](http://localhost:3000) and the Express server listens on [port 8080](http://localhost:8080). Any changes in the code will be displayed after a page refresh. 

# Production
1. From the root directory, navigate to the React client's directory with `cd client`
2. Update the React client's packages with `npm install`
3. Build the React client with `npm run build`
4. From the root directory, navigate to the Express server's directory with `cd server`
5. Set the environment variable `NODE_ENV` to `production` with `export NODE_ENV = production`
6. Start the express server with `npm start`.
The Express server listens on [port 8080](http://localhost:8080) and serves the static React client content that was built.

# Docker
1. From the root directory, run `docker image build -t fun-with-friends:server .` to build the container
2. From the root directory, run `docker run -p 8080:8080 fun-with-friends:server` to run the container

### Contributors
- [Alan Lewis](https://github.com/alanlewis764)
- [Austen McClernon](https://github.com/kvoli)
- [Ben Mitchell](https://github.com/Dezyh)
- [Kevin Lim](https://github.com/Ambient004)
