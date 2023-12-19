const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { AnimeCharacterSearch } = require('../../utils/anime/getCharacter');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chr')
        .setDescription('get anime character')
        .addStringOption(option =>
            option
                .setName('charactername')
                .setDescription('Name of anime character')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('animename')
                .setDescription('Name of anime')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply(); 
            const animeName = await interaction.options.getString('animename');
            const characterName = await interaction.options.getString('charactername');
            const animeID = await getJikanID('anime', animeName);

            if (!animeID) {
                await interaction.editReply('Anime not Found.'); 
                return;
            }

            const animeCharacterSearch = new AnimeCharacterSearch(characterName, animeID);
            const animeCharacterEmbed = await animeCharacterSearch.createAnimeCharactersEmbed();

            if (!animeCharacterEmbed) { 
                await interaction.editReply('Character not Found.');
                return;  
            }

            if (animeCharacterSearch.getCharacterArr().length > 1) {
                
                const right = new ButtonBuilder()
                    .setCustomId('right')
                    .setLabel('-->')
                    .setStyle(ButtonStyle.Success);

                const left = new ButtonBuilder()
                    .setCustomId('left')
                    .setLabel('<--')
                    .setStyle(ButtonStyle.Success);

                const row = new ActionRowBuilder()
                    .addComponents(left, right);

                const response = await interaction.editReply({
                    embeds: [animeCharacterEmbed],
                    components: [row],
                });

                const collectorFilter = i => i.user.id === interaction.user.id;

                const collector = response.createMessageComponentCollector({ filter: collectorFilter, time: 60000 });

                collector.on('collect', async buttonInteraction => {
                    try {
                        await buttonInteraction.deferUpdate(); 

                        if (buttonInteraction.customId === 'right') {
                            const updatedEmbed = await animeCharacterSearch.updateCharacterEmbed(true);
                            await interaction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
                        } else if (buttonInteraction.customId === 'left') {
                            const updatedEmbed = await animeCharacterSearch.updateCharacterEmbed(false);
                            await interaction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
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
            console.error('Error in getCharacters', error);
        }
    },
};
