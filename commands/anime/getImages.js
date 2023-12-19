const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { AnimeImageSearch } = require('../../utils/anime/getImage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('img')
        .setDescription('get anime images')
        .addStringOption(option =>
            option
                .setName('animename')
                .setDescription('Name of Anime')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply(); 
            const animeName = await interaction.options.getString('animename');
            const animeID = await getJikanID('anime', animeName);

            if (!animeID) { 
                await interaction.editReply('Anime not Found.'); 
                return;
            }

            const animeImageSearch = new AnimeImageSearch(animeID);
            const animeImageEmbed = await animeImageSearch.createAnimeImagesEmbed(); 

            if (!animeImageEmbed) { 
                await interaction.editReply('Images not Found'); 
                return; 
            }

            if (animeImageSearch.getAnimeImageArrayLength() === 0) return; 
            
            if (animeImageSearch.getAnimeImageArrayLength() > 1) {
                
                const newImage = new ButtonBuilder()
                    .setCustomId('newImage')
                    .setLabel('+')
                    .setStyle(ButtonStyle.Success);

                const row = new ActionRowBuilder()
                    .addComponents(newImage);

                const response = await interaction.editReply({
                    embeds: [animeImageEmbed],
                    components: [row],
                });

                const collectorFilter = i => i.user.id === interaction.user.id;

                const collector = response.createMessageComponentCollector({ filter: collectorFilter, time: 60000 });

                collector.on('collect', async buttonInteraction => {
                    try {
                        if (buttonInteraction.customId === 'newImage') {
                            const updatedEmbed = await animeImageSearch.getAnimeImages(); 
                            await buttonInteraction.update({embeds: [updatedEmbed]})
                        } 
                    } catch (error) {
                        console.error(error); 
                    }
                });
            } else {
                await interaction.editReply({
                    embeds: [embed],
                });
            }

        } catch (error) {
            console.error('Error in getAnimeImages', error);
        }
    },
};
