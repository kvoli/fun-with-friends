# Fun With Friends

[![Build Status](https://travis-ci.com/kvoli/fun-with-friends.svg?branch=staging)](https://travis-ci.com/kvoli/fun-with-friends)

[![License](https://img.shields.io/github/license/kvoli/fun-with-friends)](https://github.com/kvoli/fun-with-friends/blob/staging/LICENSE)

[![GitHub issues](https://img.shields.io/github/issues-pr/kvoli/fun-with-friends)](https://github.com/kvoli/fun-with-friends/pulls)

[![Activity](https://img.shields.io/github/commit-activity/m/kvoli/fun-with-friends)](https://github.com/kvoli/fun-with-friends/commits/staging)

An artifact registry for IT Project (COMP30022).

### 1. Update Packages
Update the react client's packages by navigating to the client directory with `cd client` and executing `npm install`.<br>
Update the express server's packages by navigating to the server directory with `cd server` and executing `npm install`.

### 2. Build the Client
Build the react client by navigating to the client directory with `cd client` and executing `npm run build`.

### 3. Start the Server
Start the express server by navigating to the server directory with `cd server` and executing `npm start`.<br>
By default the server listens on [port 8080](http://localhost:8080).

# Dockerfile
From the root directory, run `docker image build -t fun-with-friends:server .` to build the container and `docker run -p 8080:8080 fun-with-friends:server` to run the container.

### Contributors
- [Alan Lewis](https://github.com/alanlewis764)
- [Austen McClernon](https://github.com/kvoli)
- [Ben Mitchell](https://github.com/Dezyh)

