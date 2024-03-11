const { SlashCommandBuilder } = require('@discordjs/builders');
const { runGemini, splitResponse } = require('../utils/gemini');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('GPT')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Texto a ser usado como prompt para o GPT')
                .setRequired(true)),

    async execute(interaction) {
        // Adiar a resposta inicial
        await interaction.deferReply({ ephemeral: true });

        const prompt = interaction.options.getString('prompt');

        try {
            const response = await runGemini(prompt);
            const results = splitResponse(response);

            let finalResponse = '';
            results.forEach(result => {
                finalResponse += result + '\n'; // Adiciona cada parte da resposta
            });

            await interaction.editReply(finalResponse);
        } catch (error) {
            await interaction.reply('Ocorreu um erro inesperado. Tente novamente mais tarde!');
        }
    }
};
