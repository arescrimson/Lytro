const { SlashCommandBuilder } = require('discord.js');
const { createHelpEmbed } = require('../../utils/embed/createEmbeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('information about commands.'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const helpEmbed = createHelpEmbed();

      await interaction.editReply({
        embeds: [helpEmbed],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
