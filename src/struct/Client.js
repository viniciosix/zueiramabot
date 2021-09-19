const { AkairoClient, CommandHandler, ListenerHandler } = require("discord-akairo");
const { join } = require("path");

module.exports = class ZueiramaClient extends AkairoClient {
  constructor(config) {
    super({
      ownerID: config.owners,
      disableMentions: "everyone"
    });

    this.config = config;
    this.functions = require("./functions");

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, "../lib", "listeners")
    });
    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, "../lib", "commands"),
      prefix: ".",
      channel: 'text',
      commandUtil: true,
      handleEdits: true,
      defaultCooldown: 3e4,
      argumentDefaults: {
        prompt: {
          modifyStart: (msg, str) => `${msg.author}, ${str}... Ou digite \`cancel\` para cancelar!`,
          modifyRetry: (msg, str) => `${msg.author}, ${str}... Tente novamente ou digite \`cancel\` para cancelar!`,
          modifyTimeout: (msg, str) => `${msg.author}, você demorou muito tempo para ${str}... Então o comando foi cancelado!`,
          ended: msg => `${msg.author}, você chegou ao limite de tentativas, então o comando foi cancelado!`,
          cancel: msg => `${msg.author}, você digitou \`cancel\` e o comando foi cancelado!`,
          retries: 3,
          time: 5e4
        },
        otherwise: ""
      },
      ignoreCooldown: this.config.owners,
      // ignorePermissions: this.config.owners,
    });
  }

  async _init() {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process
    });
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  async start() {
    this._init();
    super.login(process.env.TOKEN);
    console.log(`[Status] Client.js funcionando corretamente.`)
  }
};
