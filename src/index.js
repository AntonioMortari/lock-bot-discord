require('dotenv/config');

const ExtendedClient = require('./config/ExtendedClient');
const { Events } = require('discord.js');

const client = new ExtendedClient();

client.start();

client.on('ready', () => console.log('Bot is online'));

// listener de interação
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.log('Command not found');
        return;
    }

    try {
        command.execute(interaction);
    } catch (error) {
        console.log(error);
        await interaction.reply('Erro ao executar o comando');
    }
});

module.exports = client;