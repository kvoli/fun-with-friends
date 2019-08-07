FROM mhart/alpine-node:12

COPY ./client/build/ ./client/build/
# COPY ./client/ ./client/
# WORKDIR ./client
# RUN npm install
# RUN npm run build

# WORKDIR ../

COPY ./server/ ./server/
WORKDIR /server
# RUN npm install

EXPOSE 8080
CMD ["npm", "start"]