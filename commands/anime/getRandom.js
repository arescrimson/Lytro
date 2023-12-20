const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { AnimeSearch } = require('../../utils/anime/getAnime');
const { getRandomID } = require('../../utils/anime/getRandom');
const { rightArrowText, leftArrowText } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rand')
		.setDescription('gets random anime.')
        ,
	async execute(interaction) {
		try {
			await interaction.deferReply().then(() => console.log('...'));

            const animeID = await getRandomID(); 

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






