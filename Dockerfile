FROM node:6.2.0

RUN npm install webpack -g

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app/
RUN npm install

# Bundle app source
ADD . /usr/src/app

EXPOSE 7777

CMD [ "npm", "run", "production" ]
