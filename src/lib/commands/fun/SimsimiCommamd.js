const { Command } = require("discord-akairo");
const got = require("got")
module.exports = class SimsimiCommand extends Command {
  constructor() {
    super("simsimi", {
      aliases: ["simsimi"],
      category: "fun",
      description: {
        content: "t!",
        usage: "simsimi",
        examples: ["simsimi"]
      },
      args: [{
        id: "member",
        type: "member",
        match: "rest",
        default: msg => msg.member
      }],
      ratelimit: 3
    });
  }

async exec(message, { member }) {
    const response = await got('https://simsumi.herokuapp.com/api?text=ola&lang=pt');
  return message.util.send(response.success)
  }
}
