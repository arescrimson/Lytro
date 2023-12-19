const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { MangaSearch } = require('../../utils/manga/getManga');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('m')
		.setDescription('gets manga.')
		.addStringOption(option =>
			option
				.setName('manga')
				.setDescription('Name of Manga')
				.setRequired(true)
		),
	async execute(interaction) {
		try {
			await interaction.deferReply();

			const mangaName = await interaction.options.getString('manga');
			const mangaID = await getJikanID('manga', mangaName);

			if (!mangaID) { 
				await interaction.editReply('Manga not Found.'); 
				return; 
			}
			const mangaSearch = new MangaSearch(mangaID);
			const mangaEmbed = await mangaSearch.createMangaEmbed();
			const mangaInfoEmbed = await mangaSearch.createMangaInfoEmbed();

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
				embeds: [mangaEmbed],
				components: [row],
			});

			const collector = response.createMessageComponentCollector({ time: 45000 });

			collector.on('collect', async buttonInteraction => {
				try {
					await buttonInteraction.deferUpdate().catch(console.error());

					if (buttonInteraction.customId === 'right') {
						const updatedEmbed = mangaSearch.getMangaInfoEmbed();
						await interaction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
					} else if (buttonInteraction.customId === 'left') {
						const updatedEmbed = mangaSearch.getMangaEmbed();
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






