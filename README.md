<p align="center">
	<img src="https://raw.githubusercontent.com/kvoli/fun-with-friends/staging/github-banner.png" width="250">
</p>
<p align="center">An artifact registry for IT Project (COMP30022).</p>

<p align="center">
  <a href="https://travis-ci.com/kvoli/fun-with-friends">
    <img alt="TravisCI" src="https://img.shields.io/travis/com/kvoli/fun-with-friends" />
  </a>
  <a href="https://cloud.docker.com/repository/docker/kvoli/fun-with-friends/general">
    <img alt="Docker-Image" src="https://images.microbadger.com/badges/version/kvoli/fun-with-friends.svg">
  </a>
  <a href="https://github.com/kvoli/fun-with-friends/blob/staging/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/kvoli/fun-with-friends" />
  </a>
  <a href="https://microbadger.com/images/kvoli/fun-with-friends">
    <img alt="Docker-Layers" src="https://images.microbadger.com/badges/image/kvoli/fun-with-friends.svg">
  </a>
  <a href="https://github.com/kvoli/fun-with-friends/pulls">
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues-pr/kvoli/fun-with-friends" />
  </a>
  <a href="https://github.com/kvoli/fun-with-friends/commits/staging">
    <img alt="Activity" src="https://img.shields.io/github/commit-activity/m/kvoli/fun-with-friends" />
  </a>
  <a href="https://www.codacy.com/app/kvoli/fun-with-friends?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kvoli/fun-with-friends&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy" src="https://api.codacy.com/project/badge/Grade/2c082bb69c6a4c6381168b46aa44b6d7" />
  </a>
</p>

## Stack

Fun With Friends is built using the MERN stack, consisting of a React frontend served by a NodeJS backend running Express and connected to a MongoDB database.

## Build Pipeline

1. New pull requests trigger TravisCI to deploy a new worker
2. The worker pulls the repo, installs package dependencies, runs unit and integration tests and builds the React client
3. On success, the worker then builds a Docker container of the React client and Express server and pushes it to DockerHub
4. On the production server running Ubuntu, Watchtower receives a notification that there is a new latest container. It then fetches the new latest container and gracefully runs the new container while stopping the old container.

## Development

1. Navigate to the server directory with `cd server`
2. Execute `npm run dev` to start both the React client and Express server in development mode allowing instant refreshes.
   The React client listens on [port 3000](http://localhost:3000) and the Express server listens on [port 8080](http://localhost:8080). Any changes in the code will be displayed after a page refresh.

## Production

1. From the root directory, navigate to the React client's directory with `cd client`
2. Update the React client's packages with `npm install`
3. Build the React client with `npm run build`
4. From the root directory, navigate to the Express server's directory with `cd server`
5. Set the environment variable `NODE_ENV` to `production` with `export NODE_ENV = production`
6. Start the express server with `npm start`.
   The Express server listens on [port 8080](http://localhost:8080) and serves the static React client content that was built.

## Docker

1. To build the docker container of the server, use `docker image build -t <name>:<tag> .` while in the root directory
2. To run the docker container, use `docker run -p 80:8080 -e NODE_ENV=production <name>:<tag>` after building

## Contributors

- [Alan Lewis](https://github.com/alanlewis764)
- [Austen McClernon](https://github.com/kvoli)
- [Ben Mitchell](https://github.com/Dezyh)
- [Kevin Lim](https://github.com/Ambient004)
