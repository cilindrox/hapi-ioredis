'use strict';

const Redis = require('ioredis');

// Declare internals

const internals = {};


exports.register = (server, options, next) => {

    internals.redis = new Redis(options.redis);

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
