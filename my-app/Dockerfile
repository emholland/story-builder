# ---- Step 1: Build Frontend with Vite ----
    FROM node:18-alpine AS frontend

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    
    # ---- Step 2: Set up Backend and Serve App ----
    FROM node:18-alpine
    
    WORKDIR /app
    
    # Copy backend-related files (and we'll use full copy here for simplicity)
    COPY . .
    
    # ✅ Copy the .env file explicitly
    COPY .env .env
    
    # Copy built frontend from previous stage into Express public dir
    COPY --from=frontend /app/dist ./dist
    
    # Install backend dependencies
    RUN npm install
    
    EXPOSE 5001
    
    CMD ["node", "server.js"]
    