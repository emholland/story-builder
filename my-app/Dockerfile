# Use full Node.js image (not Alpine) to avoid missing dependencies
FROM node:18

# Set the correct working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install all dependencies including devDependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Expose the Vite.js default port
EXPOSE 5173

# Start the app properly
CMD ["sh", "-c", "cd /app && npx concurrently \"vite\" \"nodemon server.js\" --host 0.0.0.0"]
