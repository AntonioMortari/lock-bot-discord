const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpa todas as mensagens do chat'),

    async execute(interaction) {
        interaction.channel.bulkDelete(100)
            .then(messages => interaction.reply(`Foram deletadas ${messages.size} mensagens.`))
            .catch(error => console.error('Erro ao deletar mensagens:', error));
    }
};