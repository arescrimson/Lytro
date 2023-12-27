const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { MangaSearch } = require('../../utils/manga/getManga');
const { getRandomMangaID } = require('../../utils/manga/getRandom');
const { rightArrowText, leftArrowText } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mrand')
		.setDescription('gets random manga.')
	,
	async execute(interaction) {
		try {
			await interaction.deferReply();

			const mangaID = await getRandomMangaID();

			const mangaSearch = new MangaSearch(mangaID);
			const mangaEmbed = await mangaSearch.createMangaEmbed();
			const mangaInfoEmbed = await mangaSearch.createMangaInfoEmbed();

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
				embeds: [mangaEmbed],
				components: [row],
			});

			const collector = response.createMessageComponentCollector({ time: 60000 });

			collector.on('collect', async buttonInteraction => {
				try {
					await buttonInteraction.deferUpdate();

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

		} catch (error) {
			await interaction.editReply('Something went wrong in getting random manga.');
			console.error('Error in getting random manga', error);
		}
	},
};






