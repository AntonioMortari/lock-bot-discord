require('dotenv/config');
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Importa os comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.data) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`Erro: ${file} não contém dados de comando válidos.`);
    }
}

// Instância REST
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

// Função para registrar os comandos
const registerCommands = async () => {
    try {
        console.log(`Resetando ${commands.length} comandos...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log('Comandos registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
};

// Chama a função para registrar os comandos
registerCommands();
