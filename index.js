require("coffee-script");
// create a RemoteClient instance and expose
RemoteClient   = require("./lib/remote-client")
module.exports = new RemoteClient();
