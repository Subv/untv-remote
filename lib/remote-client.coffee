###
UNTV RemoteClient
Author: Gordon Hall
###

{createServer} = require "http"
express        = require "express"
socket_io      = require "socket.io"

class RemoteClient
  constructor: ->
    # create express server instance
    @app    = do express
    @server = createServer @app
    # setup express configuration
    @app.configure =>
      @app.set "views", "#{__dirname}/../views"
      @app.set "view engine", "jade"
      @app.use do express.bodyParser
      @app.use do express.methodOverride
      # @app.use express.favicon """
      #   #{__dirname}/remote-client/static/images/favicon.png
      # """
      @app.use express.static """
        #{__dirname}/../static
      """
    # bind application route
    @app.get "/", (req, res) ->
      res.render "remote"
      
    # open socket connection to client
    @sockets = (socket_io.listen @server).sockets

module.exports = RemoteClient
