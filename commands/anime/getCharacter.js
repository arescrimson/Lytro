const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { getAnimeCharacters, getNextCharacter, AnimeCharacterSearch } = require('../../utils/anime/getCharacter');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('character')
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

            if (!animeID) return

            const animeCharacterSearch = new AnimeCharacterSearch(characterName, animeID); 
            const embed = await animeCharacterSearch.getAnimeCharacters()

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
                embeds: [embed],
                components: [row],
            });

            const collectorFilter = i => i.user.id === interaction.user.id;

            const collector = response.createMessageComponentCollector({ filter: collectorFilter, time: 20000 });

            collector.on('collect', async (buttonInteraction) => {
                if (buttonInteraction.customId === 'right') {
                    console.log(animeCharacterSearch.getCharacterArr()); 
                    console.log(animeCharacterSearch.getCharacterName());
                } else if (buttonInteraction.customId === 'left') {
                    console.log('left');
                }
            });
            
        } catch (error) {
            console.error('Error in getCharacters', error);
            interaction.followUp('An error occurred.');
        }
    },
};
