const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { getJikanID } = require('../../utils/jikan/getJikanID');
const { AnimeSearch, getAnimeArray } = require('../../utils/anime/getAnime');
const { rightArrowText, leftArrowText } = require('../../config');
const { AnimeCharacterSearch } = require('../../utils/anime/getCharacter');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('a')
		.setDescription('gets anime.')
		.addStringOption(option =>
			option
				.setName('anime')
				.setDescription('Name of Anime')
				.setRequired(true)
				.setAutocomplete(true)
		),
	async autocomplete(interaction) {
		const focusedValue = await interaction.options.getFocused();

		const animeArray = await getAnimeArray(focusedValue);

		const animeNames = animeArray.filter(name =>
			(name.title && name.title.english !== null) &&
			name.title.english.toLowerCase().startsWith(focusedValue.toLowerCase())
		);

		const limitedAnimeList = animeNames.slice(0, 20)

		await interaction.respond(
			limitedAnimeList.map(names => ({ name: names.title.english, value: names.title.english }))
		)

	},
	async execute(interaction) {
		try {
			await interaction.deferReply();

			const animeName = await interaction.options.getString('anime');

			const animeID = await getJikanID('anime', animeName);

			if (!animeID) {
				await interaction.editReply('Anime not Listed/Found. log ssh');
				return;
			}

			const animeSearch = new AnimeSearch(animeID);
			const animeEmbed = await animeSearch.createAnimeEmbed();
			const animeInfoEmbed = await animeSearch.createAnimeInfoEmbed();

			const left = new ButtonBuilder()
				.setCustomId('left')
				.setLabel('Page 1')
				.setStyle(ButtonStyle.Primary);

			const right = new ButtonBuilder()
				.setCustomId('right')
				.setLabel('Page 2')
				.setStyle(ButtonStyle.Primary);

			const chr = new ButtonBuilder()
				.setCustomId('chr')
				.setLabel('Main Characters')
				.setStyle(ButtonStyle.Success);

			const row = new ActionRowBuilder()
				.addComponents(left, right, chr);

			const response = await interaction.editReply({
				embeds: [animeEmbed],
				components: [row],
			});

			const collector = response.createMessageComponentCollector({ time: 60000 });

			collector.on('collect', async buttonInteraction => {
				try {
					await buttonInteraction.deferUpdate();

					switch (buttonInteraction.customId) {
						case 'left':
							const animeleftEmbed = animeSearch.getAnimeEmbed();
							await buttonInteraction.editReply({ embeds: [animeleftEmbed] }).catch(console.error)
							break;
						case 'right':
							const animeRightEmbed = animeSearch.getAnimeInfoEmbed();
							await buttonInteraction.editReply({ embeds: [animeRightEmbed] }).catch(console.error);
							break;
						case 'chr':
							const animeObj = animeSearch.getAnimeObj();
							const animeCharacterSearch = new AnimeCharacterSearch('main');
							animeCharacterSearch.setSearchMain(true);
							const animeCharacterEmbed = await animeCharacterSearch.createMainCharacterEmbed(animeObj);

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

							const response = await interaction.channel.send({
								embeds: [animeCharacterEmbed],
								components: [row],
							});

							const collector = response.createMessageComponentCollector({ time: 60000 });

							collector.on('collect', async buttonInteraction => {
								try {
									await buttonInteraction.deferUpdate();

									if (buttonInteraction.customId === 'right') {
										const updatedEmbed = await animeCharacterSearch.updateCharacterEmbed(true);
										await buttonInteraction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
									} else if (buttonInteraction.customId === 'left') {
										const updatedEmbed = await animeCharacterSearch.updateCharacterEmbed(false);
										await buttonInteraction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
									}
								} catch (error) {
									console.error(error);
								}
							});
							break;
					}
				} catch (error) {
					await interaction.editReply('Something went wrong with getting main character information.');
					console.error('Error in getAnime: main characters ', error);
				}
			});

		} catch (error) {
			await interaction.editReply('Something went wrong with getting anime information.');
			console.error('Error in getAnime: anime search', error);
		}
	},
};






