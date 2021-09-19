const { Command } = require("discord-akairo");
const Canvas = require("canvas")
const canvas = Canvas.createCanvas(540, 547)
const ctx = canvas.getContext("2d");
module.exports = class EdnaldoCommand extends Command {
constructor() {
    super("ednaldo", {
      aliases: ["ednaldo"],
      category: "fun",
     description: {
        content: "Veja sua foto na bandeira do Ednaldo Pereira. Ednaldo Pereira",
        usage: "ednaldo [user]",
        examples: ["ednaldo @zueirama"]
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
  ctx.drawImage(av, 50, 177, 422, 330)
  
  const bg = await Canvas.loadImage("https://media.discordapp.net/attachments/529064545478508544/883608254075265094/786t.png")
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
  
  message.util.reply({
   files: [{
      name: "ednaldo.png",
      attachment: canvas.toBuffer()
    }]});
  }
}