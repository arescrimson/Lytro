const { EmbedBuilder } = require('discord.js');

function createAnimeEmbed(TITLE, URL, SYNOPSIS, SYNOPSIS2, EPISODES, GENRES, RATINGS, image) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime: ${TITLE}` })
        .addFields(
            { name: 'Synopsis: \n\u200b', value: `${SYNOPSIS}` },
            { name: '\n', value: `${SYNOPSIS2}\n\u200b` },
            { name: 'Episodes:', value: `${EPISODES}`, inline: true },
            { name: 'Genres:', value: `${GENRES}`, inline: true },
            { name: 'Ratings:', value: `${RATINGS}`, inline: true }
        )
        .setImage(`${image}`)
        .setTimestamp()

}

function createAnimeInfoEmbed(TITLE, URL, BACKGROUND, BACKGROUND2, YEAR, STUDIO, RELATED, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime: ${TITLE}` })
        .addFields(
            { name: 'Background: \n\u200b', value: `${BACKGROUND}` },
            { name: '\n', value: `${BACKGROUND2}\n\u200b` },
            { name: 'Release Date:', value: `${YEAR}`, inline: true },
            { name: 'Studio:', value: `${STUDIO}`, inline: true },
            { name: 'Related:', value: `${RELATED}`, inline: true }
        )
        .setImage(`${IMAGE}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro' });
}

function createCharacterEmbed(NAME, URL, TITLE, ROLE, DESCRIPTION, VOICEACTOR, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${NAME}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime : ${TITLE}` })
        .addFields(
            { name: 'Role:', value: `${ROLE}` },
            { name: 'Description:', value: `${DESCRIPTION}` },
            { name: 'Japanese Voice Actor:', value: `${VOICEACTOR}`, inline: true },
        )
        .setImage(`${IMAGE}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro' });
}

function createAnimeImageEmbed(title, image) { 
    return new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: `Currently Searching Anime: ${title}` })
                .setTimestamp()
                .setImage(image)
                .setFooter({ text: 'Information from Lytro'});
}

module.exports = { 
    createAnimeEmbed, 
    createAnimeInfoEmbed,
    createCharacterEmbed,
    createAnimeImageEmbed
}