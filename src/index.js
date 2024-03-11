require('dotenv/config');
const path = require('path');
const fs = require('fs');

const ExtendedClient = require('./config/ExtendedClient');
const { Collection, Events } = require('discord.js');

const client = new ExtendedClient();
client.commands = new Collection();

// importação dos comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }else{
        console.log(`Command in ${filePath} without data or execute`);
    }
});

console.log(client.commands);

client.start();

client.on('ready', () => console.log('Bot is online'));

// listener de interação
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command){
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