FROM ruby:2.6.5-alpine3.10

LABEL maintainer="Ayaha Suenaga <a.suenaga.987@srmtlab.org>"

ENV APP_DIR /app

RUN apk update \
    && apk add nodejs build-base mariadb-dev tzdata

# Gems are installed here
ADD ./Gemfile /Gemfile
ADD ./Gemfile.lock /Gemfile.lock
RUN bundle install

COPY ./compose/production/rails/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/development/rails/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

WORKDIR ${APP_DIR}

ENTRYPOINT ["/entrypoint"]
