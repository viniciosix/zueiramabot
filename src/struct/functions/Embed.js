const { MessageEmbed } = require("discord.js");

module.exports = class Embed extends MessageEmbed {
  constructor(user, data = {}) {
    super(data);
    this.setColor("#6A5ACD");
    if (user) {
      this.setFooter(user.tag, user.displayAvatarURL({ dynamic: true })).setTimestamp();
    }
  }

  setDescriptionArray(messages = []) {
    this.setDescription(
      messages
        .map(lines => lines.filter(x => !!x).join("\n"))
        .filter(x => !!x.length)
        .join("\n\n")
    );
    return this;
  }

  addFieldArray(name = "", value = [], inline = false) {
    this.addField(
      name,
      value
        .map(lines => lines.filter(x => !!x).join("\n"))
        .filter(x => !!x.length)
        .join("\n\n"),
      inline
    );
    return this;
  }

  setTitleURL(name, url) {
    this.setTitle(name).setURL(url);
    return this;
  }

  setTimeFooter(name, icon) {
    this.setFooter(name, icon).setTimestamp();
    return this;
  }
};
