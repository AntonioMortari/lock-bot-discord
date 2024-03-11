const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('GPT')
        .addStringOption(option =>
            option.setName('input')),

    async execute(interaction) {
        await interaction.reply('pong');
    }
};