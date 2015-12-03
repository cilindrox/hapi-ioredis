'use strict';

// Load modules

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');
const ioRedis = require('../');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;


it('can be added as a plugin to Hapi', (done) => {

    const server = new Hapi.Server();
    const plugin = {
        register: ioRedis,
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
        register: ioRedis,
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
