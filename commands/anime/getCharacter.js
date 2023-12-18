const { SlashCommandBuilder } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { getAnimeCharacters } = require('../../utils/anime/getCharacter');

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
        )
        ,
    async execute(interaction) {
        try {
            await interaction.deferReply(); 
            const animeName = await interaction.options.getString('animename');
            const animeID = await getJikanID(animeName); 
            const characterName = await interaction.options.getString('charactername');
            const embed = await getAnimeCharacters(characterName, animeID); 

            if (embed) {
                interaction.editReply({ embeds: [embed] });
            } else { 
                interaction.editReply('couldnt find character.'); 
            }
        } catch (error) {
            console.log('error in getCharacters' + error);
        }
    },
};






