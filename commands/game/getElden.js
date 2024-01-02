const { SlashCommandBuilder } = require('discord.js');
const { getBossData, getLocationsData, getNPCData } = require('../../utils/game/eldenAPI');
const { createEldenBossEmbed, createEldenLocationEmbed, createEldenNPCEmbed } = require('../../utils/embed/createGameEmbeds');

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('er')
            .setDescription('search elden ring things')
            .addStringOption(option =>
                option
                    .setName('genre')
                    .setDescription('Elden Ring Genre')
                    .setRequired(true)
                    .setAutocomplete(true)
            )
            .addStringOption(option =>
                option
                    .setName('search')
                    .setDescription('Elden Ring Search')
                    .setRequired(true)
                    .setAutocomplete(true)
            )
    ,
    async autocomplete(interaction) {
        try {
            const focusedValue = await interaction.options.getFocused(true);

            let choices = [
                { name: 'Locations' },
                { name: 'Bosses' },
                { name: 'NPCS' },
            ]

            if (focusedValue.name === 'genre') {

            }

            let eldenObj;

            if (focusedValue.name === 'search') {
                switch (interaction.options.getString('genre')) {
                    case 'Locations':
                        eldenObj = await getLocationsData();
                        choices = eldenObj.data;
                        break;
                    case 'Bosses':
                        eldenObj = await getBossData();
                        choices = eldenObj.data;
                        break;
                    case 'NPCS':
                        eldenObj = await getNPCData();
                        choices = eldenObj.data;
                        break;
                }
            }

            const filteredResults = choices.filter(choice =>
                choice.name.toLowerCase().includes(focusedValue.value.toLowerCase()
                ));

            const slicedResults = filteredResults.slice(0, 24);

            await interaction.respond(
                slicedResults.map(choice => ({ name: choice.name, value: choice.name }))
            );

        } catch (error) {
            console.error(error);
        }
    },
    async execute(interaction) {
        try {

            await interaction.deferReply();

            const eldenGenre = interaction.options.getString('genre');
            const eldenSearch = interaction.options.getString('search');

            const url = `https://eldenring.fanapis.com/api/${eldenGenre.toLowerCase()}?name=${encodeURIComponent(eldenSearch)}`;

            const response = await fetch(url);
            const eldenData = await response.json();
            const eldenObj = eldenData?.data[0];
            

            if (!eldenObj) {
                await interaction.editReply('could not find elden ring search.')
                return;
            }

            let embed;

            switch (eldenGenre) {
                case 'Locations':
                    embed = createEldenLocationEmbed(
                        eldenObj?.name ?? 'Name not listed.',
                        eldenObj?.image,
                        eldenObj?.region ?? 'Region not listed.',
                        eldenObj?.description ?? 'Description not listed.',
                    )
                    break;
                case 'Bosses':

                    const drops = eldenObj[0]?.drops.slice(0, 4);

                    embed = createEldenBossEmbed(
                        eldenObj?.name ?? 'Name not listed.',
                        eldenObj?.image,
                        eldenObj?.region ?? 'Region not listed.',
                        eldenObj?.description ?? 'Description not listed.',
                        eldenObj?.location ?? 'Location not listed.',
                        eldenObj?.healthpoints ?? 'Hitpoints not listed.',
                        drops ?? 'Drops not listed.'
                    )
                    break;
                case 'NPCS':
                    embed = createEldenNPCEmbed(
                        eldenObj?.name ?? 'Name not listed.',
                        eldenObj?.image,
                        eldenObj?.quote ?? 'Quote not listed.',
                        eldenObj?.location ?? 'Location not listed.',
                        eldenObj?.role ?? 'Role not listed.',
                    )
            }

            
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            await interaction.editReply('could not find elden ring search.')
            console.error('Error in getElden', error);
        }
    }
};