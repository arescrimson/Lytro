const { EmbedBuilder } = require('discord.js');
const { JIKAN_CLIENT } = require('../jikan/jikanClient'); 

/**
 * Creates an embedded message for displaying information about an anime.
 *
 * @param {string} TITLE - The title of the anime.
 * @param {string} URL - The URL associated with the anime.
 * @param {string} THUMBNAIL - The URL of the anime's thumbnail image.
 * @param {string} SYNOPSIS - The synopsis of the anime.
 * @param {string} SYNOPSIS2 - Additional synopsis if the first is too long.
 * @param {string} EPISODES - The number of episodes in the anime.
 * @param {string} GENRES - The genres associated with the anime.
 * @param {string} RATINGS - The ratings and scores of the anime.
 * @param {string} image - The URL of the anime's image.
 * @returns {EmbedBuilder} - An EmbedBuilder object for anime information.
 */
function createEmbed(TITLE, URL, SYNOPSIS, SYNOPSIS2, EPISODES, GENRES, RATINGS, image) {

    const createdEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${TITLE}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching Anime: ${TITLE}`})
        .addFields(
            { name: 'Synopsis: \n\u200b', value: `${SYNOPSIS}` },
            { name: '\n', value: `${SYNOPSIS2}\n\u200b` },
            { name: 'Episodes:', value: `${EPISODES}`, inline: true },
            { name: 'Genres:', value: `${GENRES}`, inline: true },
            { name: 'Ratings:', value: `${RATINGS}`, inline: true }
        )
        .setImage(`${image}`)
        .setTimestamp()

    return createdEmbed;
}

/**
 * Gets Anime Information from the animeID passed. 
 * 
 * @param {Message} message is the discord message. 
 * @param {number} animeID is the animeID passed. 
 */
async function getAnimeInfo(animeID) {
    try {
        //GETS ANIME INFORMATION
        const anime = await JIKAN_CLIENT.anime.get(animeID);
        if (!anime) return; 
        const stats = await JIKAN_CLIENT.anime.getStatistics(animeID);
        let genres = anime?.genres?.map(genre => genre.name).join(', ');

        if (!genres || genres.trim() === '') {
            genres = 'genres';
        }

        //INITIALIZES SPLIT FOR SYNOPSIS THAT ARE OVER 1020 CHARACTERS 
        let synopsis = '';
        let synopsis2 = '\n';

        //SPLITS SYNOPSIS IF TOO LONG INTO 2-3 PARAGRAPHS. 
        if (anime?.synopsis) {
            if (anime.synopsis.length > 1020) {
                const midPoint = anime.synopsis.lastIndexOf('.', 1020);
                if (midPoint !== -1) {
                    const synopsisFirstPart = anime.synopsis.substring(0, midPoint + 1);
                    const synopsisSecondPart = anime.synopsis.substring(midPoint + 1);
                    synopsis = synopsisFirstPart;
                    synopsis2 = synopsisSecondPart;
                }
            }
            //else, simply assign synopsis to the anime synopsis. 
            else {
                synopsis = anime.synopsis;
            }
        } else {
            synopsis = 'synopsis';
        }

        //RATINGS AS AN AVERAGED SCORE STRING 
        let ratings = '';

        if (stats?.scores) {

            let totalScore = 0;
            let totalVotes = 0;

            for (const obj of stats.scores) {
                totalScore += obj.score * obj.votes;
                totalVotes += obj.votes;
            }

            const averageScore = totalScore / totalVotes;

            ratings = `Average score based off ${totalVotes.toLocaleString()} votes: ${averageScore.toFixed(2) + ' / 10'}`;
        }

        else {
            ratings = 'ratings';
        }

        //SYNOPSIS, URL, EPISODES, GENRES, RATINGS
        const SYNOPSIS = synopsis;
        const SYNOPSIS2 = synopsis2;
        const URL = anime?.url ?? 'url';
        const EPISODES = anime?.episodes?.toLocaleString() ?? 'episodes';
        const GENRES = genres;
        const RATINGS = ratings;

        const animeEmbed = createEmbed(
            anime?.title.default,
            URL,
            SYNOPSIS,
            SYNOPSIS2,
            EPISODES,
            GENRES,
            RATINGS,
            anime?.image.webp.default
        )

        return animeEmbed; 
    } catch (error) {
        console.error('Error in getAnime:', error.message);
    }
}

module.exports = { 
    getAnimeInfo
}