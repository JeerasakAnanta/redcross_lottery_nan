docker compose down 

docker build -t frontend:0.1.0 ./frontend

docker buildx build -t backend_api:0.1.0 ./backend

docker compose -f docker-compose.yml up -d