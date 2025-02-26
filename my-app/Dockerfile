# Use a lightweight Node.js image for building the frontend
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY my-app/package.json my-app/package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the Vite app (this compiles the frontend for production)
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
