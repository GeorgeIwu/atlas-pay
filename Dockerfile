FROM node:carbon

# use changes to package.json to force Docker not to use the cache
# when we change our application's node.js dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/atlas-pay-frontend && cp -a /tmp/node_modules /usr/src/atlas-pay-frontend

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible:
WORKDIR /usr/src/atlas-pay-frontend
ADD . /usr/src/atlas-pay-frontend

# Build Vue.js app
RUN npm run build

# Remove unused directories
RUN rm -rf ./src
RUN rm -rf ./build

# EXPOSE 4001
EXPOSE 4001
CMD [ "npm", "start" ]
