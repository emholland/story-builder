# Use a lightweight Node.js image for building the frontend
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire my-app directory into the container
COPY . ./

# Move into the app directory
WORKDIR /app/my-app

# Build the Vite app (this compiles the frontend for production)
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine
COPY --from=build /app/my-app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
