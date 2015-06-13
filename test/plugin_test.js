/* global describe, it */
var expect = require('chai').expect
var Hapi = require('hapi')

var ioRedis = require('../')

describe('Hapi-IORedis', function () {

  it('can be added as a plugin to Hapi', function (done) {

    var server = new Hapi.Server()

    server.register(ioRedis, function (err) {

      if (err) {
        return done(err)
      }

      expect(server.plugins).to.have.deep.property('hapi-ioredis.client')

      return done()
    })
  })

})
