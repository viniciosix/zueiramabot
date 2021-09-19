const Client = require("./struct/Client");
const config = require("./util/config");

const client = new Client(config);
client.start();
