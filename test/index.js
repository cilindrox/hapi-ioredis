'use strict';

// Load modules

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');
const IoRedis = require('../');

// Declare internals

const internals = {};

// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;


it('can be added as a plugin to Hapi', async () => {

    const server = new Hapi.Server();
    const plugin = {
        plugin: IoRedis,
        options: { url: 'redis://:@127.0.0.1:6379/' }
    };

    await server.register(plugin);

    expect(server.app.redis).to.exist();
    expect(server.app.redis.disconnect).to.be.a.function();
});


it('can be registered with a redis options config object', async () => {

    const server = new Hapi.Server();
    const plugin = {
        plugin: IoRedis,
        options: {
            redis: { host: '127.0.0.1', port: '6379' }
        }
    };

    await server.register(plugin);

    expect(server.app.redis).to.exist();
    expect(server.app.redis.disconnect).to.be.a.function();
});


it('decorates the request object with a redis prop', async () => {

    const server = new Hapi.Server();
    const plugin = {
        plugin: IoRedis,
        options: { url: 'redis://:@127.0.0.1:6379/' }
    };

    await server.register(plugin);

    server.route({
        method: 'GET',
        path: '/',
        config: {
            handler: (request, h) => {

                expect(request.redis).to.exist();
                expect(request.redis.disconnect).to.be.a.function();
                return 'GREAT SUCCESS!';
            }
        }
    });

    await server.start();

    const payload = {
        method: 'GET',
        url: '/'
    };

    const response = await server.inject(payload);

    expect(response.statusCode).to.equal(200);
    expect(response.result).to.equal('GREAT SUCCESS!');
});

it('can override the name of the redis instance on server.app', async () => {

    const server = new Hapi.Server();
    const plugin = {
        plugin: IoRedis,
        options: {
            redis: { host: '127.0.0.1', port: '6379' },
            name: 'myRedisInstance'
        }
    };

    await server.register(plugin);

    expect(server.app.myRedisInstance).to.exist();
    expect(server.app.myRedisInstance.disconnect).to.be.a.function();
});
