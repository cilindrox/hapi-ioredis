# hapi-ioredis

  An [ioredis] hapi plugin

[![Build Status](https://travis-ci.org/cilindrox/hapi-ioredis.svg)](https://travis-ci.org/cilindrox/hapi-ioredis)

## Installation

```
npm install --save hapi-ioredis
```

## Compatability
This plugin is compatible with Hapy v17+.

For usage with older versions of Hapi, please use version 3.x.

## Quick start

This pretty much works as a regular node-redis/ioredis client, with the addition of providing an easily accessible instance via the [`server.app`](http://hapijs.com/api#serverapp) common namespace.

## Examples

```js
const Hapi = require('hapi');
const server = new Hapi.Server();

const options = {
    // you can override the name of the instance (defaults to 'redis') available on server.app
    // name: 'myRedisInstance'

    // ioRedis config options
    // See: https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new
};

// Register the plugin
await server.register({
    plugin: require('hapi-ioredis'),
    options: options
});

// Declare a route that uses it
server.route( {
    'method': 'GET',
    'path': '/stats',
    'handler': usersHandler
});

// Access the ioRedis instance
function usersHandler (request, h) {

    var client = request.redis;     // also available via request.server.app.redis

    // Do something with it
    client.hgetall('users', function (err, obj) {

        if (err) {
            // handle error (https://github.com/luin/ioredis#error-handling)
        }

        return { result: obj };
    });
};

await server.start();
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Acknowledgements

This module borrows heavily from [hapi-redis], so kudos to @sandfox.

[ioredis]: https://github.com/luin/ioredis
[hapi-redis]: https://github.com/sandfox/node-hapi-redis

## License

(The MIT License)

Copyright (c) 2015 Gaston Festari &lt;cilindrox@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
