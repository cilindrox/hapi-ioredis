var Redis = require('ioredis')

var internals = {}

exports.register = function (server, options, next) {

  internals.redis = new Redis(options.redis)

  server.expose('client', internals.redis)

  internals.redis.on('ready', function notifyReady () {

    server.log(['info', 'hapi-ioredis'], 'connected to redis')

    return next()
  })

  internals.redis.on('error', function handleError (err) {
    server.log(['error', 'hapi-ioredis'], { err: err })
  })
}

exports.register.attributes = {
  pkg: require('../package.json'),
  multiple: true
}
