const { Command } = require("discord-akairo");
const arcadiaapi = require("arcadia-module")
const Discord = require("discord.js")
const { Canvas } = require("canvacord")
module.exports = class TriggeredCommand extends Command {
  constructor() {
    super("triggered", {
      aliases: ["triggered", "trigger"],
      category: "fun",
      description: {
        content: "triggered!",
        usage: "triggered [@usuário]",
        examples: ["triggered Megumin"]
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
    const gif = await Canvas.trigger(avatar)
    const attachment = new this.client.functions.embed(message.author)
    .setImage(gif)
    //.setTitle(message.author.username)
//let msg = await message.util.reply("produzindo a imagem...")
 message.channel.send('essa mensagem sera editada em 5 segundos').then(msg => setTimeout(()=>msg.edit(attachment), 5000))
  }
}
