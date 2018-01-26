FROM php:7.1.3-fpm
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng12-dev \
        git \
        zlib1g-dev \
        g++ \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install -j$(nproc) iconv mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && pecl install xdebug \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_autostart=off" >> /usr/local/etc/php/conf.d/xdebug.ini

COPY icu4c-58_2-src.tgz /var/icu4c-58_2-src.tgz

RUN cd /var && tar -xvf /var/icu4c-58_2-src.tgz \
    && cd /var/icu/source \
    && ./configure --prefix=/opt/icu4c \
    && make \
    && make install

RUN docker-php-ext-configure intl --with-icu-dir=/opt/icu4c \
    && docker-php-ext-install intl

COPY php.ini /usr/local/etc/php/php.ini

WORKDIR /var/www/html/telemed

RUN apt-get install zip unzip

RUN composer global require --no-progress "fxp/composer-asset-plugin:^1.3.1"

CMD ["php-fpm"]

