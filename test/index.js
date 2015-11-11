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
