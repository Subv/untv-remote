var port = process.argv[2] || 8080;

require("./index.js").server.listen(port, function() {
  console.log("untv-remote: test server listening on port " + port);
});
