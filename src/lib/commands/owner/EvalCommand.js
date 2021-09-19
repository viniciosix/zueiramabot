const { Command } = require("discord-akairo");

module.exports = class EvalCommand extends Command {
  constructor() {
    super("eval", {
      aliases: ["eval", "e"],
      category: "owner",
      description: {
       content: "Um terminal no discord ¯\\_(ツ)_/¯",
        usage: "eval <code>",
        examples: ["message.author.tag"]
      },
      ownerOnly: true,
      args: [
        {
          id: "code",
          type: "string",
          match: "content",
          prompt: {
            start: "digite algum código"
          }
        }
      ],
      ratelimit: 5
    });
  }

  async exec(message, { code }) {

    const _user = _id => this.client.users.cache.find(user => user.id == _id);
    code = code
      .replace(/^`{3}(js)?|`{3}$/g, "")
      .replace(/<@!?(\d{16,18})>/g, "_user($1)");

    try {
      var result = require("util").inspect(eval(code), { depth: 0 });
    } catch (error) {
      result = error;
    }
    return message.channel

      .send(result, { code: "js", split: true })

      .catch(err => message.channel.send(err, { code: "js", split: true }));

  }

};

