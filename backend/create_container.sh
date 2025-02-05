docker build -t backend_api:0.1.1  . 

docker run -d --name backend_api -p  3000:3000 --env-file .env  backend_api:0.1.1