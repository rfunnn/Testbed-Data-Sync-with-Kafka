# Use an official Node.js runtime as a parent image
FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set environment variable
ENV NODE_ENV production

# Expose port
EXPOSE 3000

# Start command
CMD [ "npm", "run", "start:prod" ]
