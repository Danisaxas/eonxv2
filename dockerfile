FROM php:8.2-fpm

WORKDIR /app

COPY . /app

# Instalar Nginx
RUN apt-get update && apt-get install -y nginx && apt-get clean

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD service nginx start && php-fpm
