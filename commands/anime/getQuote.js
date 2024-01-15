const { SlashCommandBuilder } = require('discord.js');
const { getQuote } = require('../../utils/misc/getQuote');

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('quote')
            .setDescription('return random quote')
    ,
    async execute(interaction) {
        try {
            await interaction.deferReply()
            const quoteEmbed = await getQuote();

            if (!quoteEmbed) {
                await interaction.editReply('Something went wrong getting that quote - quote functionality is currently down :((')
            }

            await interaction.editReply({
                embeds: [quoteEmbed]
            })

        } catch (error) {
            //await interaction.editReply('Something went wrong getting that quote.');
            console.error('Error in getQuote', error);
        }
    }
};