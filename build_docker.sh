#!/bin/bash 

# Build the docker images 
docker compose down 

# build the images frontend 
docker build -t frontend:0.1.0 ./frontend

# build the images backend 
docker buildx build -t backend_api:0.1.0 ./backend

# use docker compose to start the containers 
docker compose -f docker-compose.yml up -d 