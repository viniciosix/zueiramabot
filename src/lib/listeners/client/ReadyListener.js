const { Listener } = require("discord-akairo");

module.exports = class ReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client"
    });
  }

  exec() {
    this.client.user.setPresence({
      activity: {
        name: `.help | ${this.client.guilds.cache.size} servers`,
        type: "STREAMING",
        url: "https://www.twitch.tv/zueirama"
      }
    });
    return console.log("[Zueirama] Iniciado.");
  }
};

