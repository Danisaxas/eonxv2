# Dockerfile para un bot PHP en Railway
FROM php:8.2-cli-alpine

WORKDIR /app
COPY . /app

# Instala extensiones necesarias (curl)
RUN docker-php-ext-install curl

EXPOSE 8080
CMD [ "php", "-S", "0.0.0.0:8080", "bot.php" ]
