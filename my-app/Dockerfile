# Use an official Node.js image as a base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port React runs on
EXPOSE 5173

# Command to start the application (for Vite)
CMD ["npm", "run", "dev", "--", "--host"]