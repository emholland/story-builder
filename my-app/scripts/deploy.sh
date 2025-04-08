#!/bin/bash

set -e

PROJECT_DIR="project-003-story-builder-team-2"
APP_NAME="storybuilderdemo1"
TEMP_NAME="${APP_NAME}-temp"
LIVE_PORT=5001
TEMP_PORT=5002

echo "🔄 Changing to project directory..."
cd ~/$PROJECT_DIR

echo "📥 Pulling latest changes from main branch..."
git pull origin main

echo "🐳 Building temporary Docker image..."
docker build -t $TEMP_NAME -f my-app/Dockerfile my-app

echo "🚀 Running temporary container on port $TEMP_PORT..."
docker run -d --name $TEMP_NAME -p $TEMP_PORT:$LIVE_PORT $TEMP_NAME

echo "⏳ Waiting for container to initialize..."
sleep 5

echo "🧪 Health checking temporary container..."
if curl -fs http://localhost:$TEMP_PORT > /dev/null; then
    echo "✅ Health check passed. Deploying new version..."

    echo "🛑 Stopping existing container..."
    docker stop $APP_NAME || true
    docker rm $APP_NAME || true

    echo "📦 Tagging new image and starting on live port..."
    docker tag $TEMP_NAME $APP_NAME
    docker run -d --name $APP_NAME -p $LIVE_PORT:$LIVE_PORT $APP_NAME

    echo "🧹 Cleaning up temporary container and image..."
    docker stop $TEMP_NAME || true
    docker rm $TEMP_NAME || true
    docker image rm $TEMP_NAME || true

    echo "🎉 Deployment successful and live at http://<your-ec2-ip>:$LIVE_PORT"
else
    echo "❌ Health check failed. Rolling back..."
    docker stop $TEMP_NAME || true
    docker rm $TEMP_NAME || true
    docker image rm $TEMP_NAME || true
    echo "🔁 Live container remains untouched."
    exit 1
fi
