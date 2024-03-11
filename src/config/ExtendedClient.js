const { Client, GatewayIntentBits, Partials } = require('discord.js');

const BOT_TOKEN = process.env.BOT_TOKEN;

class ExtendedClient extends Client {

    constructor(){
        super({
            intents: GatewayIntentBits.Guilds,
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User
            ]
        });
    }

    start(){
        this.login(BOT_TOKEN);
    }
}

module.exports = ExtendedClient;