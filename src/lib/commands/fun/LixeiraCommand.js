const { Command } = require("discord-akairo");
const Canvas = require("canvas")
const canvas = Canvas.createCanvas(324, 132)
const ctx = canvas.getContext("2d");
module.exports = class LixeiraCommand extends Command {
constructor() {
    super("lixeira", {
      aliases: ["lixeira"],
      category: "fun",
     description: {
        content: "veja como a lixeira atualizou ao longo dos anos",
        usage: "lixeira [user]",
        examples: ["lixeira @zueirama"]
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
//    ctx.drawImage(avatar, 100, 25, 200, 200)
  const av = await Canvas.loadImage(avatar)
  ctx.drawImage(av, 258, 51, 37, 39)

  const bg = await Canvas.loadImage("https://media.discordapp.net/attachments/683449027446046761/884121084889288735/lixeira.png")
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
  
  message.util.reply({
   files: [{
      name: "lixeira.png",
      attachment: canvas.toBuffer()
    }]});
  }
}