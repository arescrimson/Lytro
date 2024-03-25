const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js');
const { AnimeSearch } = require('../../utils/anime/getAnime');
const { getRandomID } = require('../../utils/anime/getRandom');
const { rightArrowText, leftArrowText } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rand')
    .setDescription('gets random anime.'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const animeID = await getRandomID();

      const animeSearch = new AnimeSearch(animeID);
      const animeEmbed = await animeSearch.createAnimeEmbed();

      if (!animeEmbed) {
        await interaction.editReply(
          'Something went wrong in getting random anime.',
        );
        return;
      }

      await interaction.editReply({
        embeds: [animeEmbed],
      });
    } catch (error) {
      await interaction.editReply('Error with getting random anime.');
      console.error('Error in anime getRandom', error);
    }
  },
};
