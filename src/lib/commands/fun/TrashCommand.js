const { Command } = require("discord-akairo");
const arcadiaapi = require("arcadia-module")
const dcGen = require("image-generation-for-discord")
module.exports = class TrashCommand extends Command {
  constructor() {
    super("trash", {
      aliases: ["trash"],
      category: "fun",
      description: {
        content: "t!",
        usage: "trash [@usuário]",
        examples: ["trash Megumin"]
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
    const avatar = member.user.displayAvatarURL({ size: 2048, format: 'png', dynamic: true });
    const img = await dcGen.trash(avatar)
    return message.util.reply({ files: [{
      name: "trash.png",
      attachment: img
    }]});
  }
}
