const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { AnimeImageSearch } = require('../../utils/anime/getImage');
const { getAnimeArray } = require('../../utils/anime/getAnime');
const { newImageText } = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('img')
        .setDescription('get anime images')
        .addStringOption(option =>
            option
                .setName('anime')
                .setDescription('Name of Anime')
                .setRequired(true)
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = await interaction.options.getFocused();

        const animeArray = await getAnimeArray(focusedValue);

        const animeNames = animeArray.filter(name =>
            (name.title && name.title.english !== null) &&
            name.title.english.toLowerCase().startsWith(focusedValue.toLowerCase())
        );

        const limitedAnimeList = animeNames.slice(0, 15)

        await interaction.respond(
            limitedAnimeList.map(names => ({ name: names.title.english, value: names.title.english }))
        );
    },
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const animeName = await interaction.options.getString('anime');
            const animeID = await getJikanID('anime', animeName);

            if (!animeID) {
                await interaction.editReply('Anime not Found.');
                return;
            }

            const animeImageSearch = new AnimeImageSearch(animeID);
            const animeImageEmbed = await animeImageSearch.createAnimeImagesEmbed();

            if (!animeImageEmbed || animeImageSearch.getAnimeImageArrayLength() === 0) { 
                interaction.editReply({content: 'no images could be found', ephemeral: true});
                return; 
            } 

            if (animeImageSearch.getAnimeImageArrayLength() > 1) {

                const newImage = new ButtonBuilder()
                    .setCustomId('newImage')
                    .setLabel(newImageText)
                    .setStyle(ButtonStyle.Primary);

                const row = new ActionRowBuilder()
                    .addComponents(newImage);

                const response = await interaction.editReply({
                    embeds: [animeImageEmbed],
                    components: [row],
                });

                const collector = response.createMessageComponentCollector({ time: 60000 });

                collector.on('collect', async buttonInteraction => {
                    try {
                        if (buttonInteraction.customId === 'newImage') {
                            const updatedEmbed = await animeImageSearch.createAnimeImagesEmbed();
                            await buttonInteraction.update({ embeds: [updatedEmbed] })
                        }
                    } catch (error) {
                        console.error(error);
                    }
                });
            } else {
                await interaction.editReply({
                    embeds: [animeImageEmbed],
                });
            }

        } catch (error) {
            await interaction.editReply('something went wrong with getting anime images.');
            console.error('Error in getAnimeImages', error);
        }
    },
};
