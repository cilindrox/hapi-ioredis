
'use strict';

const Redis = require('ioredis');
const Hoek = require('hoek');

// Declare internals

const internals = {};


exports.register = (server, options, next) => {

    const opts = (options.url)
        ? options.url
        : options.redis;

    Hoek.assert(opts, 'Invalid Redis URL settings provided.');

    // Check to see if a Redis instance already exists at `server.app[name]`
    const name = options.name || 'redis';
    const existingInstance = Hoek.reach(server, `app.${name}`);

    Hoek.assert(!existingInstance, `Redis instance already exists at 'server.app.${name}'. Use the 'name' option to create a separate instance located at 'server.app.[name]'`);

    // Create the Redis instance at `server.app.[name]`
    internals.redis = new Redis(opts);
    server.app[name] = internals.redis;
    server.decorate('request', name, internals.redis);

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
