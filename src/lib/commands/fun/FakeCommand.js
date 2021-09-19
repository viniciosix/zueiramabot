const { Command } = require("discord-akairo");
const Canvas = require("canvas");
const canvas = Canvas.createCanvas(1068, 109);
const ctx = canvas.getContext("2d");
//const ctx2 = canvas.getContext('2d');

//const font = ctx.context.font = '72px sans-seriff'
module.exports = class FakeCommand extends Command {
  constructor() {
    super("fakemsg", {
      aliases: ["fakemsg", "fake"],
      category: "fun",
      description: {
        content: "Faça um print falso de seu amigo.",
        usage: "fakemsg [user]",
        examples: ["fakemsg @zueirama"]
      },
      args: [
        {
          id: "member",
          type: "member",
          match: "rest",
          default: msg => msg.member
        },
        {
          id: "search",
          type: "string",
          match: "rest"
          //      default: msg => msg.content.split(" ")
        }
      ],
      ratelimit: 3
    });
  }

  async exec(message, { member, search }) {
 //   let usuario = this.client.users.cache.get(member.user.id).username
   /* if (!member)
      return message.util.reply("você precisa mencionar alguém.");*/
    if (!search) return message.util.reply("você precisa dizer uma mensagem.");
    let user = message.guild.member(member).nickname || member.user.username
    let avatar = member.user.displayAvatarURL({
      size: 2048,
      format: "png",
      dynamic: true
    });
    //    ctx.drawImage(avatar, 100, 25, 200, 200)
    const av = await Canvas.loadImage(avatar);
    ctx.drawImage(av, 13, 14, 74, 69);
    let test = (new Date-user)/(user-user)*100

    const bg = await Canvas.loadImage(
      "https://media.discordapp.net/attachments/683449027446046761/883716132052287508/test_fake.png"
    );
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    ctx.font = "18px sans-serif"
    ctx.fillStyle = "#808080"
    ctx.fillText(`Hoje 15:47`, test*207, 39)
    /* -------*/
    ctx.font = "26px Arial"
    ctx.fillStyle = message.guild.member(member).displayHexColor
    ctx.fillText(`${user}`, 94, 39);
    /* -------*/
    ctx.font = "26px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(search, 96, 74)
    message.util.reply({
      files: [
        {
          name: "fakemsg.png",
          attachment: canvas.toBuffer()
        }
      ]
    });
}
}                                
