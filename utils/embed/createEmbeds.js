const { EmbedBuilder } = require('discord.js');
const { THUMBNAIL, ICON_URL } = require('../../config');

function createAnimeEmbed(TITLE, URL, SYNOPSIS, SYNOPSIS2, EPISODES, GENRES, RATINGS, image) {
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
            { name: 'Ratings:', value: `${RATINGS}`, inline: true }
        )
        .setImage(`${image}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });
}

function createAnimeInfoEmbed(TITLE, URL, BACKGROUND, BACKGROUND2, YEAR, STUDIO, RELATED, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setThumbnail(`${IMAGE}`)
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

function createMangaEmbed(TITLE, URL, AUTHOR, SYNOPSIS, SYNOPSIS2, VOLUMES, GENRES, RATINGS, image) {
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

function createMangaInfoEmbed(TITLE, URL, AUTHOR, BACKGROUND, BACKGROUND2, DATE, SERIAL, POPULARITY, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x9966FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Manga: ${TITLE}`, iconURL: ICON_URL })
        .setThumbnail(`${IMAGE}`)
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

function createSteamGameEmbed(gameTitle, gameURL, playerCount, summary, price, devs, genres, score, categories, image) {
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
            { name: 'Genres:', value: `${categories}`, inline: true },
            { name: 'Categories:', value: `${genres}`, inline: true },
            { name: 'Current Price:', value: `${price}`, inline: true },
            { name: 'Metacritic Score:', value: `${score}`, inline: true },
            { name: 'Active Player Count: ', value: `${playerCount}`, inline: true },
        )
        .setImage(`${image}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro', iconURL: ICON_URL });

    return embed;
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
            { name: '/er [genre] [search]', value: 'Gets Elden Ring information about genre searches.\n\u200b'},
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
    createAnimeInfoEmbed,
    createCharacterEmbed,
    createAnimeImageEmbed,
    createMangaEmbed,
    createMangaInfoEmbed,
    createSteamGameEmbed,
    createEmbedQuote,
    createHelpEmbed,
    createCatsEmbed,
}