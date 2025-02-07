#!/bin/bash 

# copy the .env files to the docker container 
cp -r .env ./backend/.env 

cp -r .env ./admin/.env 

# Build the docker images 
docker-compose down 

# build the images frontend 
docker build -t frontend:0.1.0 ./frontend

# build the images backend 
docker build -t backend_api:0.1.0 ./backend

# build the images admin dashboard 
docker build -t admin_dashboard:0.1.0 ./admin

# use docker compose to start the containers 
docker-compose -f docker-compose.yml up -d 