const { EmbedBuilder } = require('discord.js');
const { THUMBNAIL, ICON_URL } = require('../../config');

function createAnimeEmbed(TITLE, URL, SYNOPSIS, SYNOPSIS2, EPISODES, GENRES, RATINGS, YEAR, STUDIO, RELATED, image) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setTitle(`${TITLE}`)
        .setThumbnail(`${image}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime: ${TITLE}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Synopsis: \n\u200b', value: `${SYNOPSIS}` },
            { name: '\n', value: `${SYNOPSIS2}\n\u200b` },
            { name: 'Episodes:', value: `${EPISODES}`, inline: true },
            { name: 'Genres:', value: `${GENRES}`, inline: true },
            { name: 'Ratings:', value: `${RATINGS}`, inline: true },
            { name: 'Release Date:', value: `${YEAR}`, inline: true },
            { name: 'Studio:', value: `${STUDIO}`, inline: true },
            { name: 'Related:', value: `${RELATED}`, inline: true }
        )
        .setImage(`${image}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

function createCharacterEmbed(NAME, URL, Nicknames, DESCRIPTION, VOICEACTOR, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setTitle(`${NAME}`)
        .setThumbnail(THUMBNAIL)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Character : ${NAME}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Nicknames:', value: `${Nicknames}` },
            { name: 'Description:', value: `${DESCRIPTION}` },
            { name: 'Japanese Voice Actor:', value: `${VOICEACTOR}`, inline: true },
        )
        .setImage(`${IMAGE}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

function createAnimeImageEmbed(title, image) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setAuthor({ name: `Currently Searching Anime: ${title}`, iconURL: ICON_URL })
        .setThumbnail(THUMBNAIL)
        .setTimestamp()
        .setImage(image)
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

function createMangaEmbed(TITLE, URL, AUTHOR, SYNOPSIS, SYNOPSIS2, VOLUMES, GENRES, RATINGS, DATE, SERIAL, POPULARITY, image) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Manga: ${TITLE}`, iconURL: ICON_URL })
        .setThumbnail(`${image}`)
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

function createMangaCharacterEmbed(NAME, URL, Nicknames, DESCRIPTION, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setTitle(`${NAME}`)
        .setThumbnail(THUMBNAIL)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Character : ${NAME}`, iconURL: ICON_URL })
        .addFields(
            { name: 'Nicknames:', value: `${Nicknames}` },
            { name: 'Description:', value: `${DESCRIPTION}` },
        )
        .setImage(`${IMAGE}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

function createEmbedQuote(quoteAuthor, quoteBody, quoteAnime) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .addFields({
            name: '\n',
            value: `"${quoteBody}" - **${quoteAuthor}**, **${quoteAnime}**`,
        })
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

function createHelpEmbed() {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setAuthor({ name: 'List of Commands', iconURL: ICON_URL })
        .addFields(
            { name: 'Anime Commands:', value: '\n\u200b' },
            { name: '/a [anime_name]', value: 'Gets anime information from specified anime.' },
            { name: '/chr [character_name]', value: 'Gets anime character information from specified character.' },
            { name: '/img [anime_name]', value: 'Gets anime image information from specified anime.' },
            { name: '/rand', value: 'Gets anime information from a random anime.' },
            { name: '/quote', value: 'Gets a random anime quote.\n\u200b' },
            { name: 'Manga Commands:', value: '\n\u200b' },
            { name: '/m [manga_name]', value: 'Gets manga information from specified manga.' },
            { name: '/mrand', value: 'Gets manga information from a random manga.\n\u200b' },
            { name: 'Game Commands:', value: '\n\u200b' },
            { name: '/steam [game_name]', value: 'Gets steam game information from specified game.' },
            { name: '/er [genre] [search]', value: 'Gets Elden Ring information about genre searches.\n\u200b' },
            { name: 'Animal Commands:', value: '\n\u200b' },
            { name: '/cats', value: 'Gets random images of cats.' }
        )
        .setTimestamp()
        .setFooter({ text: 'Command Help', iconURL: ICON_URL })
}

function createCatsEmbed(catsObj) {
    return new EmbedBuilder()
        .setImage(`${catsObj[0].url}`)
        .setTimestamp()
        .setFooter({ text: 'Cats', iconURL: ICON_URL })
}

module.exports = {
    createAnimeEmbed,
    createCharacterEmbed,
    createAnimeImageEmbed,
    createMangaEmbed,
    createMangaCharacterEmbed,
    createEmbedQuote,
    createHelpEmbed,
    createCatsEmbed,
}