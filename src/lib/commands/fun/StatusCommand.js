const { Command } = require("discord-akairo");
const Canvas = require("canvas")
const canvas = Canvas.createCanvas(1080, 1292)
const ctx = canvas.getContext("2d");
module.exports = class StatusCommand extends Command {
constructor() {
    super("status", {
      aliases: ["status", "zap"],
      category: "fun",
     description: {
        content: "Status do zap",
        usage: "status [user]",
        examples: ["status @zueirama"]
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
 const av = await Canvas.loadImage(avatar)

 let user = message.guild.member(member).nickname || member.user.username
  let limite = user.length >= 25
  ctx.drawImage(av, 97, 110, 140, 140)
if(user.length >= 25){
 var nome = user.substr(0, 25)+'...'
} else {
 var nome = user
}
/*  ctx.font = "20px Arial";
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(user, 239, 138)*/
  
  const bg = await Canvas.loadImage("https://media.discordapp.net/attachments/683449027446046761/887059288923721728/status.png")
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
  
  ctx.font = "57px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(nome, 250, 180)
  
  message.util.reply({
   files: [{
      name: "zap.png",
      attachment: canvas.toBuffer()   }]});
  }
}