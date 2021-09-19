const { Command } = require("discord-akairo");

module.exports = class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "ajuda"],
      category: "bot",
      description: {
        content: "Veja todos os meus comandos.",
        usage: "help [comando]",
        examples: ["help", "help ping", "help avatar"]
      },
      args: [{
        id: "command",
        type: "commandAlias"
      }],
      ratelimit: 3
    });
  }

  exec(message, { command }) {
    let obj = this.client.commandHandler.modules.map(a => "`"+a.id+"`").join(" | ")
   
    const embed = new this.client.functions.embed(message.author).setThumbnail(this.client.user.displayAvatarURL());
    if (!command) {
      embed
        .setDescription(obj)
        .setTitle(`[${this.client.commandHandler.modules.size}] Comandos:`)
        .setFooter("utilize .help [comando] para mais informações.")
      return message.util.send(embed);
    } else {
      embed
        .setAuthor(`${command.aliases[0].replace(/^(\b\w)/gi, (char) => char.toUpperCase())}`)
        .setDescriptionArray([
        [
        `Descrição: \`${command.description.content || "Não possui descrição."}\``,
        `Aliases: \`${command.aliases.slice(1).join(" | ") || "Não possui alternativa."}\``,
        `Exemplos:\` ${command.description.examples.join("\n")}\``
        ]
        ])
      
   /*   if (command.aliases.length > 1) embed.addField("Sinônimo", `\`${command.aliases.slice(1).join("`, `")}\``);
      if (command.description.examples.length > 0) embed.addField("Exemplos", command.description.examples.join("\n"));*/
      
      return message.util.send(embed);
    }
  }
};
