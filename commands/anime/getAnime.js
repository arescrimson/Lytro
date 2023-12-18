const { SlashCommandBuilder } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { getAnimeInfo } = require('../../utils/anime/getAnime');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('gets anime.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('Name of anime')
				.setRequired(true)
		),
	async execute(interaction) {
		try {
			await interaction.deferReply(); 
			const animeName = await interaction.options.getString('name');
			const animeID = await getJikanID('anime', animeName);
			const embed = await getAnimeInfo(animeID);

			if (embed) { 
				await interaction.editReply({ embeds: [embed]});
			} else { 
				await interaction.editReply('couldnt find animeID.');
			}
		} catch(theErr) { 
			console.error(theErr); 
		}
	},
};






