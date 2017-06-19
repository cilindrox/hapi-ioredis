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


it('can be added as a plugin to Hapi', (done) => {

    const server = new Hapi.Server();
    const plugin = {
        register: IoRedis,
        options: { url: 'redis://:@127.0.0.1:6379/' }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.app.redis).to.exist();
        expect(server.app.redis.disconnect).to.be.a.function();
        done();
    });
});


it('can be registered with a redis options config object', (done) => {

    const server = new Hapi.Server();
    const plugin = {
        register: IoRedis,
        options: {
            redis: { host: '127.0.0.1', port: '6379' }
        }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.app.redis).to.exist();
        expect(server.app.redis.disconnect).to.be.a.function();
        done();
    });
});


it('decorates the request object with a redis prop', (done) => {

    const server = new Hapi.Server();
    const plugin = {
        register: IoRedis,
        options: { url: 'redis://:@127.0.0.1:6379/' }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();

        server.connection();
        server.route({
            method: 'GET',
            path: '/',
            config: {
                handler: (request, reply) => {

                    expect(request.redis).to.exist();
                    expect(request.redis.disconnect).to.be.a.function();
                    return reply('GREAT SUCCESS!');
                }
            }
        });

        const payload = {
            method: 'GET',
            url: '/'
        };

        server.inject(payload, (response) => {

            expect(response.statusCode).to.equal(200);
            expect(response.result).to.equal('GREAT SUCCESS!');
            done();
        });
    });
});

it('can override the name of the redis instance on server.app', (done) => {

    const server = new Hapi.Server();
    const plugin = {
        register: IoRedis,
        options: {
            redis: { host: '127.0.0.1', port: '6379' },
            name: 'myRedisInstance'
        }
    };

    server.register(plugin, (err) => {

        expect(err).to.not.exist();
        expect(server.app.myRedisInstance).to.exist();
        expect(server.app.myRedisInstance.disconnect).to.be.a.function();
        done();
    });
});
