const { SlashCommandBuilder } = require('discord.js');
const { SteamGameSearch, getSteamGameArray } = require('../../utils/steam/steamGameSearch');

let test = '';

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('steam')
            .setDescription('steam testing')
            .addStringOption(option =>
                option
                    .setName('game')
                    .setDescription('Name of Game')
                    .setRequired(true)
                    .setAutocomplete(true)
            )
    ,
    async autocomplete(interaction) {
        try {
            const focusedValue = await interaction.options.getFocused();

            const steamGameArray = await getSteamGameArray();

            const gameNames = steamGameArray.filter(gameName => 
                    gameName.name.toLowerCase().startsWith(focusedValue.toLowerCase()  
            ));

            const limitedGameList = gameNames.slice(0,24); 
            
            await interaction.respond(
                limitedGameList.map(games => ({ name: games.name, value: games.name }))
            );

        } catch (error) {
            console.error(error);
        }
    },
    async execute(interaction) {
        try {
            
            await interaction.deferReply();
            const gameName = interaction.options.getString('game');

            const steamGameSearch = new SteamGameSearch(gameName);
            const gameEmbed = await steamGameSearch.createGameEmbed();

            if (!gameEmbed) {
                interaction.editReply('Game not found/listed.');
                return;
            }

            await interaction.editReply({ embeds: [gameEmbed] })

        } catch (error) {
            console.error(error);
        }
    }
};