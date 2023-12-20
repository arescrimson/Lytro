const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { AnimeSearch } = require('../../utils/anime/getAnime');
const { rightArrowText, leftArrowText } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a')
		.setDescription('gets anime.')
		.addStringOption(option =>
			option
				.setName('anime')
				.setDescription('Name of Anime')
				.setRequired(true)
		),
	async execute(interaction) {
		try {
			await interaction.deferReply();

			const animeName = await interaction.options.getString('anime');
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
				.setLabel(rightArrowText)
				.setStyle(ButtonStyle.Primary);

			const left = new ButtonBuilder()
				.setCustomId('left')
				.setLabel(leftArrowText)
				.setStyle(ButtonStyle.Primary);

			const row = new ActionRowBuilder()
				.addComponents(left, right);

			const response = await interaction.editReply({
				embeds: [animeEmbed],
				components: [row],
			});

			//const collectorFilter = i => i.user.id === interaction.user.id;

			const collector = response.createMessageComponentCollector({ time: 60000 });

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






