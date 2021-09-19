const { Command } = require("discord-akairo");
const Canvas = require("canvas")
const canvas = Canvas.createCanvas(756, 499)
const ctx = canvas.getContext("2d");
module.exports = class BolsonaroCommand extends Command {
constructor() {
    super("bozo", {
      aliases: ["bozo"],
      category: "fun",
     description: {
        content: "gg!",
        usage: "bolsonaro [user]",
        examples: ["bolsonaro @zueirama"]
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
  ctx.drawImage(av, 157, 29, 412, 232)
  
  const bg = await Canvas.loadImage("https://media.discordapp.net/attachments/683449027446046761/883945792526753802/bolso_test.png")
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
  
  message.util.reply({
   files: [{
      name: "bolsonaro.png",
      attachment: canvas.toBuffer()
    }]});
  }
}