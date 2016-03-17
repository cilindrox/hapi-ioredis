'use strict';

const Redis = require('ioredis');
const Url = require('redis-url-parser');
const Hoek = require('hoek');

// Declare internals

const internals = {};


exports.register = (server, options, next) => {

    const opts = (options.url) ?
        Url.parse(options.url) :
        options.redis;

    Hoek.assert(opts, 'Invalid Redis URL settings provided.');

    internals.redis = new Redis(opts);
    server.app.redis = internals.redis;
    server.decorate('request', 'redis', internals.redis);

    let isFirstConnection = true;

    internals.redis.on('ready', () => {

        server.log(['info', 'hapi-ioredis'], 'connected to redis');

        // If this is the first connection to Redis on Server start,
        // wait until it's connected before continuing.

        // $lab:coverage:off$
        if (isFirstConnection) {
            isFirstConnection = false;
            return next();
        }
        // $lab:coverage:on$
    });
};


exports.register.attributes = {
    pkg: require('../package.json'),
    multiple: true
};
