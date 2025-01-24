# Use the official PHP image with Apache
FROM php:8.2-apache

# Set the working directory to the Apache document root
WORKDIR /var/www/html/

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip pdo_mysql


# Set correct permissions for Apache
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Enable Apache rewrite module (for .htaccess)
RUN a2enmod rewrite

# Copy your PHP application files into the container
COPY . .

# Expose port 80 for Apache
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]