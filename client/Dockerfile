FROM node:8.11.3-jessie

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./ .

RUN npm install

CMD [ "npm", "start" ]