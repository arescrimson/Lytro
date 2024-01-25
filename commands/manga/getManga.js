const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js')
const { getJikanID } = require('../../utils/jikan/getJikanID')
const { MangaSearch, getMangaArray } = require('../../utils/manga/getManga')
const { rightArrowText, leftArrowText } = require('../../config')
const { MangaCharacterSearch } = require('../../utils/manga/getCharacter')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('m')
    .setDescription('gets manga.')
    .addStringOption((option) =>
      option
        .setName('manga')
        .setDescription('Name of Manga')
        .setRequired(true)
        .setAutocomplete(true),
    ),
  async autocomplete(interaction) {
    const focusedValue = await interaction.options.getFocused()

    const mangaArray = await getMangaArray(focusedValue)

    const mangaNames = mangaArray.filter(
      (name) =>
        name.title &&
        name.title.english !== null &&
        name.title.english.toLowerCase().startsWith(focusedValue.toLowerCase()),
    )

    const limitedMangaList = mangaNames.slice(0, 24)

    await interaction.respond(
      limitedMangaList.map((names) => ({
        name: names.title.english,
        value: names.title.english,
      })),
    )
  },
  async execute(interaction) {
    try {
      await interaction.deferReply()

      const mangaName = await interaction.options.getString('manga')
      const mangaID = await getJikanID('manga', mangaName)

      if (!mangaID) {
        await interaction.editReply(`${mangaName} not found/listed.`)
        return
      }

      const mangaSearch = new MangaSearch(mangaID)
      const mangaEmbed = await mangaSearch.createMangaEmbed()

      const chr = new ButtonBuilder()
        .setCustomId('chr')
        .setLabel('Main Characters')
        .setStyle(ButtonStyle.Success)

      const row = new ActionRowBuilder().addComponents(chr)

      const response = await interaction.editReply({
        embeds: [mangaEmbed],
        components: [row],
      })

      const collector = response.createMessageComponentCollector({
        time: 60000,
      })

      collector.on('collect', async (buttonInteraction) => {
        try {
          await buttonInteraction.deferUpdate()

          const mangaObj = mangaSearch.getMangaObj()
          const mangaCharacterSearch = new MangaCharacterSearch('main')
          mangaCharacterSearch.setSearchMain(true)
          const mangaCharacterEmbed =
            await mangaCharacterSearch.createMainCharacterEmbed(mangaObj)

          const right = new ButtonBuilder()
            .setCustomId('right')
            .setLabel(rightArrowText)
            .setStyle(ButtonStyle.Primary)

          const left = new ButtonBuilder()
            .setCustomId('left')
            .setLabel(leftArrowText)
            .setStyle(ButtonStyle.Primary)

          const row = new ActionRowBuilder().addComponents(left, right)

          const response = await interaction.channel.send({
            embeds: [mangaCharacterEmbed],
            components: [row],
          })

          const collector = response.createMessageComponentCollector({
            time: 60000,
          })

          collector.on('collect', async (buttonInteraction) => {
            try {
              await buttonInteraction.deferUpdate()

              if (buttonInteraction.customId === 'right') {
                const updatedEmbed =
                  await mangaCharacterSearch.updateCharacterEmbed(true)
                await buttonInteraction
                  .editReply({ embeds: [updatedEmbed] })
                  .catch(console.error)
              } else if (buttonInteraction.customId === 'left') {
                const updatedEmbed =
                  await mangaCharacterSearch.updateCharacterEmbed(false)
                await buttonInteraction
                  .editReply({ embeds: [updatedEmbed] })
                  .catch(console.error)
              }
            } catch (error) {
              console.error(error)
            }
          })
        } catch (error) {
          interaction.editReply(
            'Something went wrong in getting manga main characters.',
          )
          console.error('Error in getManga: main characters', error)
        }
      })
    } catch (error) {
      interaction.editReply(
        'Something went wrong in getting manga information.',
      )
      console.error('Error in getManga: manga info', error)
    }
  },
}
