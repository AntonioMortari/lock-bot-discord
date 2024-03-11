const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const path = require('path');
const fs = require('fs');

const BOT_TOKEN = process.env.BOT_TOKEN;

class ExtendedClient extends Client {

    constructor() {
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
        this.commands = new Collection();
    }

    start() {
        this.registerCommands();
        this.login(BOT_TOKEN);
    }

    registerCommands() {
        // importação dos comandos
        const commandsPath = path.resolve(__dirname, '..', 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        commandFiles.forEach(file => {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(`Command in ${filePath} without data or execute`);
            }
        });
    }
}

module.exports = ExtendedClient;