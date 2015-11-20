'use strict';

const Redis = require('ioredis');
const Url = require('redis-url-parser');

// Declare internals

const internals = {};


exports.register = (server, options, next) => {

    const opts = (options.url) ?
        Url.parse(options.url) :
        options.redis;

    internals.redis = new Redis(opts);

    server.expose('client', internals.redis);

    internals.redis.on('ready', () => {

        server.log(['info', 'hapi-ioredis'], 'connected to redis');
        return next();
    });
};


exports.register.attributes = {
    pkg: require('../package.json'),
    multiple: true
};
