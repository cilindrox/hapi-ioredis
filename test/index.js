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

    server.register(ioRedis, (err) => {

        expect(err).to.not.exist();
        expect(server.plugins['hapi-ioredis']).to.exist();
        expect(server.plugins['hapi-ioredis'].client).to.be.an.object();
        done();
    });
});


it('parses a given redis URL', (done) => {

    const server = new Hapi.Server();
    const register = {
        register: ioRedis,
        options: { url: 'redis://:@127.0.0.1:6379/' }
    };

    server.register(register, (err) => {

        expect(err).to.not.exist();
        expect(server.plugins['hapi-ioredis']).to.exist();
        expect(server.plugins['hapi-ioredis'].client).to.be.an.object();
        done();
    });
});
