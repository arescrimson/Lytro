const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { AnimeCharacterSearch, searchCharacterArray } = require('../../utils/anime/getCharacter');
const { rightArrowText, leftArrowText } = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chr')
        .setDescription('get anime character')
        .addStringOption(option =>
            option
                .setName('character')
                .setDescription('Name of anime character')
                .setRequired(true)
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        try {
            const focusedValue = await interaction.options.getFocused();

            const characterArray = await searchCharacterArray(focusedValue);

            const characterNames = characterArray.filter(name =>
                name.name.toLowerCase().includes(focusedValue.toLowerCase())
            );

            const limitedCharacterList = characterNames.slice(0, 15)

            await interaction.respond(
                limitedCharacterList.map(names => ({ name: names.name, value: names.name }))
            );

        } catch (error) {
            console.error(error);
        }
    },
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const characterName = await interaction.options.getString('character');

            const animeCharacterSearch = new AnimeCharacterSearch(characterName);
            animeCharacterSearch.setSearchMain(false);
            const animeCharacterEmbed = await animeCharacterSearch.createAnimeCharactersEmbed();

            if (!animeCharacterEmbed) {
                await interaction.editReply('Character not Found.');
                return;
            }

            if (animeCharacterSearch.getCharacterArr().length > 1) {

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
                    embeds: [animeCharacterEmbed],
                    components: [row],
                });

                const collector = response.createMessageComponentCollector({ time: 60000 });

                collector.on('collect', async buttonInteraction => {
                    try {
                        await buttonInteraction.deferUpdate();

                        if (buttonInteraction.customId === 'right') {
                            const updatedEmbed = await animeCharacterSearch.updateCharacterEmbed(true);
                            await interaction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
                        } else if (buttonInteraction.customId === 'left') {
                            const updatedEmbed = await animeCharacterSearch.updateCharacterEmbed(false);
                            await interaction.editReply({ embeds: [updatedEmbed] }).catch(console.error)
                        }
                    } catch (error) {
                        console.error(error);
                    }
                });
            } else {
                await interaction.editReply({
                    embeds: [animeCharacterEmbed],
                });
            }

        } catch (error) {
            console.error('Error in getCharacters', error);
        }
    },
};
