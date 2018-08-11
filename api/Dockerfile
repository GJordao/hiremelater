FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/files
WORKDIR /usr/src/app

COPY ./ .

RUN npm install

CMD [ "npm", "start" ]