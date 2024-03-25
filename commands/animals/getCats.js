const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js');
const { CAT_CLIENT } = require('../../utils/animals/animalClients');
const { createCatsEmbed } = require('../../utils/embed/createEmbeds');
const { newImageText } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cats')
    .setDescription('random cat pictures'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const catsObj = await CAT_CLIENT.images.searchImages();
      await CAT_CLIENT.images.searchImages();
      if (!catsObj || catsObj.length === 0) return;

      const catsEmbed = createCatsEmbed(catsObj);

      const newImage = new ButtonBuilder()
        .setCustomId('newImage')
        .setLabel(newImageText)
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(newImage);

      const response = await interaction.editReply({
        embeds: [catsEmbed],
        components: [row],
      });

      const collector = response.createMessageComponentCollector({
        time: 60000,
      });

      collector.on('collect', async (buttonInteraction) => {
        try {
          if (buttonInteraction.customId === 'newImage') {
            const catsObj = await CAT_CLIENT.images.searchImages();
            const updatedEmbed = createCatsEmbed(catsObj);
            await buttonInteraction.update({
              embeds: [updatedEmbed],
            });
          }
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      await interaction.editReply(
        'Something went wrong in getting cat images.',
      );
      console.error('Error in getCats', error);
    }
  },
};
