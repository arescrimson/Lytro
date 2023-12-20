const { SlashCommandBuilder } = require('discord.js');
const { SteamGameSearch } = require('../../utils/steam/steamGameSearch'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steam')
        .setDescription('steam testing')
        .addStringOption(option =>
			option
				.setName('game')
				.setDescription('Name of Game')
				.setRequired(true)
		)
    ,
    async execute(interaction) {
        try {
            await interaction.deferReply(); 
            const gameName = await interaction.options.getString('game');

            const steamGameSearch = new SteamGameSearch(gameName); 
            const gameEmbed = await steamGameSearch.createGameEmbed();
            
            if (!gameEmbed) {
                interaction.editReply('Game not found.');
                return; 
            }

            await interaction.editReply({embeds: [gameEmbed]})
        } catch (error) {
            console.error(error);
        }
    }
};
