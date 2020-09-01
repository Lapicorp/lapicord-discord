FROM node:lts-alpine

# Workdir for the app
RUN mkdir -p /usr/src/lapicord-discord
WORKDIR /usr/src/lapicord-discord

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "src/app.js" ]