# Use the official PHP image with Nginx
FROM php:8.2-fpm

# Install necessary PHP extensions for MySQL
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

RUN apt-get update && apt-get install -y nginx && apt-get upgrade -y

# Copy the PHP application files into the container
COPY . /var/www/html/

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start PHP-FPM and Nginx
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
