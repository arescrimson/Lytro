const { EmbedBuilder } = require('discord.js');
const { THUMBNAIL, ICON_URL } = require('../../config');

function createAnimeEmbed(TITLE, URL, SYNOPSIS, SYNOPSIS2, EPISODES, GENRES, RATINGS, image) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${TITLE}`)
        .setThumbnail(THUMBNAIL)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime: ${TITLE}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Synopsis: \n\u200b', value: `${SYNOPSIS}` },
            { name: '\n', value: `${SYNOPSIS2}\n\u200b` },
            { name: 'Episodes:', value: `${EPISODES}`, inline: true },
            { name: 'Genres:', value: `${GENRES}`, inline: true },
            { name: 'Ratings:', value: `${RATINGS}`, inline: true }
        )
        .setImage(`${image}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro' , iconURL: ICON_URL});

}

function createAnimeInfoEmbed(TITLE, URL, BACKGROUND, BACKGROUND2, YEAR, STUDIO, RELATED, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime: ${TITLE}`, iconURL: ICON_URL })
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
        .setThumbnail(THUMBNAIL)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime : ${TITLE}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Role:', value: `${ROLE}` },
            { name: 'Description:', value: `${DESCRIPTION}` },
            { name: 'Japanese Voice Actor:', value: `${VOICEACTOR}`, inline: true },
        )
        .setImage(`${IMAGE}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro' , iconURL: ICON_URL});
}

function createAnimeImageEmbed(title, image) { 
    return new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: `Currently Searching Anime: ${title}`, iconURL: ICON_URL })
                .setThumbnail(THUMBNAIL)
                .setTimestamp()
                .setImage(image)
                .setFooter({ text: 'Information from Lytro' , iconURL: ICON_URL});
}

function createMangaEmbed(TITLE, URL, AUTHOR, SYNOPSIS, SYNOPSIS2, VOLUMES, GENRES, RATINGS, image) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Manga: ${TITLE}`, iconURL: ICON_URL })
        .setThumbnail(THUMBNAIL)
        .addFields(
            { name: 'Author: \n\u200b', value: `**${AUTHOR}** \n\u200b` },
            { name: 'Synopsis: \n\u200b', value: `${SYNOPSIS}` },
            { name: '\n', value: `${SYNOPSIS2}\n\u200b` },
            { name: 'Volumes:', value: `${VOLUMES}`, inline: true },
            { name: 'Genres:', value: `${GENRES}`, inline: true },
            { name: 'Ratings:', value: `${RATINGS}`, inline: true }
        )
        .setImage(`${image}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

function createMangaInfoEmbed(TITLE, URL, AUTHOR, BACKGROUND, BACKGROUND2, DATE, SERIAL, POPULARITY, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Manga: ${TITLE}`, iconURL: ICON_URL })
        .setThumbnail(THUMBNAIL)
        .addFields(
            { name: 'Author: \n\u200b', value: `**${AUTHOR}** \n\u200b` },
            { name: 'Background: \n\u200b', value: `${BACKGROUND}` },
            { name: '\n', value: `${BACKGROUND2}\n\u200b` },
            { name: 'Publish Date:', value: `${DATE}`, inline: true },
            { name: 'Manga Serialization:', value: `${SERIAL}`, inline: true },
            { name: 'Manga Rank:', value: `#${POPULARITY}`, inline: true }
        )
        .setImage(`${IMAGE}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });

}

module.exports = { 
    createAnimeEmbed, 
    createAnimeInfoEmbed,
    createCharacterEmbed,
    createAnimeImageEmbed,
    createMangaEmbed,
    createMangaInfoEmbed,
}