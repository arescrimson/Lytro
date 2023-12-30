const { EmbedBuilder } = require('discord.js');
const { ICON_URL } = require('../../config');

function createSteamGameEmbed(
    gameTitle,
    gameURL,
    playerCount,
    summary,
    price,
    devs,
    genres,
    score,
    categories,
    image,
    publishers,
    recs, 
    releaseDate
) {
    const embed = new EmbedBuilder()
    if (gameURL) embed.setURL(`${gameURL}`)

    embed
        .setColor(0x9966FF)
        .setTitle(`${gameTitle}`)
        .setAuthor({ name: `Searching Steam Game: ${gameTitle}`, iconURL: ICON_URL })
        .setThumbnail(`${image}`)
        .addFields(
            { name: 'Summary: \n\u200b', value: `${summary}\n\u200b` },
            
            { name: 'Developers:', value: `${devs}`, inline: true },
            { name: 'Publishers:', value: `${publishers}`, inline: true },
            { name: 'Release Date:', value: `${releaseDate}`, inline: true },
            { name: 'Genres:', value: `${categories}`, inline: true },
            { name: 'Categories:', value: `${genres}`, inline: true },
            { name: 'Current Price:', value: `${price}`, inline: true },
            { name: 'Recommends:', value: `${recs}`, inline: true },
            { name: 'Metacritic Score:', value: `${score}`, inline: true },
            { name: 'Player Count:', value: `${playerCount}`, inline: true },
        )
        .setImage(`${image}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });

    return embed;
}

function createEldenBossEmbed(name, image, region, description, location, hp, drops) {
    const embed = new EmbedBuilder()

    if (image) embed.setImage(`${image}`).setThumbnail(`${image}`)

    embed
        .setColor(0x9966FF)
        .setTitle(`${name}`)
        .setAuthor({ name: `Searching Elden Ring Boss: ${name}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Description: \n\u200b', value: `${description}\n\u200b` },
            { name: 'Region:', value: `${region}`, inline: true },
            { name: 'Location:', value: `${location}`, inline: true },
            { name: 'Hitpoints:', value: `${hp}`, inline: true },
            { name: 'Drops:', value: `${drops}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });

    return embed;
}

function createEldenLocationEmbed(name, image, region, description) {
    const embed = new EmbedBuilder()

    if (image) embed.setImage(`${image}`).setThumbnail(`${image}`)

    embed
        .setColor(0x9966FF)
        .setTitle(`${name}`)
        .setAuthor({ name: `Searching Elden Ring Location: ${name}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Description: \n\u200b', value: `${description}\n\u200b` },
            { name: 'Region:', value: `${region}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });

    return embed;
}

function createEldenNPCEmbed(name, image, quote, location, role) {
    const embed = new EmbedBuilder()

    if (image) embed.setImage(`${image}`).setThumbnail(`${image}`)

    embed
        .setColor(0x9966FF)
        .setTitle(`${name}`)
        .setAuthor({ name: `Searching Elden Ring NPC: ${name}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Quote: \n\u200b', value: `${quote}\n\u200b` },
            { name: 'Location:', value: `${location}`, inline: true },
            { name: 'Role:', value: `${role}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });

    return embed;
}


module.exports = {
    createSteamGameEmbed,
    createEldenBossEmbed,
    createEldenLocationEmbed,
    createEldenNPCEmbed
}