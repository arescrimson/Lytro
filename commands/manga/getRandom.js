const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js')
const { MangaSearch } = require('../../utils/manga/getManga')
const { getRandomMangaID } = require('../../utils/manga/getRandom')
const { rightArrowText, leftArrowText } = require('../../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mrand')
    .setDescription('gets random manga.'),
  async execute(interaction) {
    try {
      await interaction.deferReply()

      const mangaID = await getRandomMangaID()

      const mangaSearch = new MangaSearch(mangaID)
      const mangaEmbed = await mangaSearch.createMangaEmbed()

      if (!mangaEmbed) {
        await interaction.editReply(
          'Something went wrong in getting random manga.',
        )
        return
      }

      await interaction.editReply({
        embeds: [mangaEmbed],
      })
    } catch (error) {
      await interaction.editReply(
        'Something went wrong in getting random manga.',
      )
      console.error('Error in getting random manga', error)
    }
  },
}
