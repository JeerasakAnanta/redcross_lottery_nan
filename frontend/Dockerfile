# Use the official PHP image with Apache
FROM php:8.2-apache

# Install necessary PHP extensions for MySQL
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

RUN apt-get update && apt-get upgrade -y

# Enable Apache rewrite module (optional, for URL rewriting)
RUN a2enmod rewrite

# Copy the PHP application files into the container
COPY . /var/www/html/

# Expose port 80 for Apache
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]