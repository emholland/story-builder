# Use a lightweight Node.js image for building the frontend
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 
RUN npm install axios

# Copy the entire app directory (excluding files in .dockerignore)
COPY . ./

# Build the Vite app (this compiles the frontend for production)
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Copy the built files from /app/dist (not /my-app/dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
