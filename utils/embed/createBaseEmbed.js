const { EmbedBuilder } = require('discord.js');
const { ICON_URL } = require('../../config');

function createBaseEmbed() {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

module.exports = {
    createBaseEmbed
}