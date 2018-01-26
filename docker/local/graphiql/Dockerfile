FROM node:boron

# Create app directory
RUN mkdir -p /var/www/app
WORKDIR /var/www/app

# Install app dependencies
COPY package.json /var/www/app
RUN npm install

# Bundle app source
COPY . /var/www/app

EXPOSE 8081
ENTRYPOINT [ "npm", "start" ]