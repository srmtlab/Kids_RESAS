FROM ruby:2.6.5-alpine3.10

LABEL maintainer="Ayaha Suenaga <a.suenaga.987@srmtlab.org>"

ENV APP_DIR /app
ENV DOCKERIZE_VERSION v0.6.1

RUN apk update \
    && apk add nodejs build-base mariadb-dev tzdata

# Gems are installed here
ADD ./Gemfile /Gemfile
ADD ./Gemfile.lock /Gemfile.lock
RUN bundle install

# install dockerize : https://github.com/jwilder/dockerize
RUN apk add --no-cache openssl
RUN wget https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
	&& tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
	&& rm dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz

COPY ./compose/development/rails/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/development/rails/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

WORKDIR ${APP_DIR}

ENTRYPOINT ["/entrypoint"]
