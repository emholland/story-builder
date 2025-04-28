# ---- Step 1: Build Frontend ----
    FROM node:18-alpine AS frontend

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    # Copy frontend code and .env
    COPY . .
    COPY .env .env   
    RUN npm run build
    
    
    # ---- Step 2: Set up Backend ----
    FROM node:18-alpine
    
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    COPY --from=frontend /app/dist ./dist
    
    EXPOSE 5001
    
    CMD ["node", "server.js"]
    