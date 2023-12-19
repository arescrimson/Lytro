const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { AnimeSearch } = require('../../utils/anime/getAnime');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a')
		.setDescription('gets anime.')
		.addStringOption(option =>
			option
				.setName('animename')
				.setDescription('Name of Anime')
				.setRequired(true)
		),
	async execute(interaction) {
		try {
			await interaction.deferReply().then(() => console.log('...'));

			const animeName = await interaction.options.getString('animename');
			const animeID = await getJikanID('anime', animeName);

			if (!animeID) { 
				await interaction.editReply('Anime not Found.'); 
				return; 
			}
			const animeSearch = new AnimeSearch(animeID);
			const animeEmbed = await animeSearch.createAnimeEmbed();
			const animeInfoEmbed = await animeSearch.createAnimeInfoEmbed();

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
				embeds: [animeEmbed],
				components: [row],
			});

			const collectorFilter = i => i.user.id === interaction.user.id;

			const collector = response.createMessageComponentCollector({ filter: collectorFilter, time: 60000 });

			collector.on('collect', async buttonInteraction => {
				try {
					await buttonInteraction.deferUpdate();

					if (buttonInteraction.customId === 'right') {
						const updatedEmbed = animeSearch.getAnimeInfoEmbed();
						await interaction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
					} else if (buttonInteraction.customId === 'left') {
						const updatedEmbed = animeSearch.getAnimeEmbed();
						await interaction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
					}
				} catch (error) {
					console.error(error);
				}
			});

		} catch (theErr) {
			console.error(theErr);
		}
	},
};






