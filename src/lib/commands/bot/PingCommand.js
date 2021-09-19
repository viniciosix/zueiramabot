const { Command } = require("discord-akairo");

module.exports = class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "latency", "ms"],
      category: "bot",
      description: {
        content: "Veja a minha latência",
        usage: "ping",
        examples: ["ping"]
      },
      ratelimit: 3
    });
  }

  exec(message) {
    return message.util.reply(`🏓 Latência: \`${this.client.ws.ping}\`ms`);
  }
};
