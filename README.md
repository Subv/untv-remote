UNTV Remote
===========

This module exposes an instance of the `RemoteClient` class to UNTV, containing bindings to an Express/Socket.io server for the smartphone interface. 

## Usage

For using programmatically (from the UNTV `Remote` class):

```coffeescript
class Remote extends EventEmitter
  constructor: (@port=8080) ->
    # import remote interface
    { @app, @server, @sockets } = require "untv-remote"
```

For testing standalone server:

```
~# node test.js [port]
```
