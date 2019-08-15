FROM composer:1.9

LABEL maintainer Akira Kamiya <a.kamiya.208@gmail.com>

ENV APP_DIR /opt/Kids_RESAS
ENV DOCKERIZE_VERSION v0.6.1

RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}

RUN docker-php-ext-configure pdo_mysql \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable pdo_mysql

# install dockerize
RUN apk add --no-cache openssl
RUN wget https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
	&& tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
	&& rm dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/docker-entrypoint.sh"]
