const { JIKAN_CLIENT } = require('../jikan/jikanClient');
const { createAnimeEmbed, createAnimeInfoEmbed } = require('../embed/createEmbeds');

const { GENRES_NOT_FOUND,
    EPISODES_NOT_FOUND,
    URL_NOT_FOUND,
    RECOMMENDATIONS_NOT_FOUND,
    STUDIO_NOT_FOUND,
    SYNOPSIS_NOT_FOUND,
    BACKGROUND_NOT_FOUND,
    RATINGS_NOT_FOUND,
    YEAR_NOT_FOUND,
    MAX_VALUE_LENGTH } = require('../../config');

class AnimeSearch {

    constructor(animeID) {
        this.animeID = animeID;
        this.animeEmbed = null;
        this.anime = null;
        this.synopsis2 = '\n';
        this.background2 = '\n';
    }


    async createAnimeEmbed() {
        try {
            this.anime = await JIKAN_CLIENT.anime.get(this.animeID);

            const stats = await JIKAN_CLIENT.anime.getStatistics(this.animeID);
            let genres = this.anime.genres?.map(genre => genre.name).join(', ');

            if (!genres || genres.trim() === '') {
                genres = GENRES_NOT_FOUND;
            }

            const synopsis = this.getSynopsis(this.anime);
            const ratings = this.getRatings(stats);

            const episodes = this.anime.episodes?.toLocaleString() ?? EPISODES_NOT_FOUND;

            this.animeEmbed = createAnimeEmbed(
                this.anime.title?.default,
                this.anime.url ?? URL_NOT_FOUND,
                synopsis,
                this.synopsis2,
                episodes,
                genres,
                ratings,
                this.anime.image.webp.default
            )

            return this.animeEmbed;
        } catch (error) {
            console.error('Error in getAnime:', error.message);
        }
    }

    async createAnimeInfoEmbed() {
        try {

            const rec = await JIKAN_CLIENT.anime.getRecommendations(this.animeID);

            const background = this.getBackground();

            const recommendations = this.getRecommendations(rec);

            this.animeInfoEmbed = createAnimeInfoEmbed(
                this.anime.title.default,
                this.anime.url,
                background,
                this.background2,
                this.anime.year ?? YEAR_NOT_FOUND,
                this.anime.studios[0]?.name ?? STUDIO_NOT_FOUND,
                recommendations,
                this.anime.image.webp.default
            )

            return this.animeInfoEmbed;

        } catch (error) {
            console.error('Error in getInfo:', error.message);
        }
    }

    getSynopsis() {
        let synopsis = '';

        if (this.anime.synopsis) {
            if (this.anime.synopsis.length > MAX_VALUE_LENGTH) {
                const midPoint = this.anime.synopsis.lastIndexOf('.', MAX_VALUE_LENGTH);
                if (midPoint !== -1) {
                    const synopsisFirstPart = this.anime.synopsis.substring(0, midPoint + 1);
                    const synopsisSecondPart = this.anime.synopsis.substring(midPoint + 1);
                    synopsis = synopsisFirstPart;
                    this.synopsis2 = synopsisSecondPart;
                }
            }
            else {
                synopsis = this.anime.synopsis;
            }
        } else {
            return SYNOPSIS_NOT_FOUND;
        }

        return synopsis;
    }

    getBackground() {
        let background = '';

        if (this.anime.background) {
            if (this.anime.background.length > MAX_VALUE_LENGTH) {
                const midPoint = this.anime.background.lastIndexOf('.', MAX_VALUE_LENGTH);
                if (midPoint !== -1) {
                    const backgroundFirstPart = this.anime.background.substring(0, midPoint + 1);
                    const backgroundSecondPart = this.anime.background.substring(midPoint + 1);
                    background = backgroundFirstPart;
                    this.background2 = backgroundSecondPart;
                }
            }
            else {
                background = this.anime.background;
            }
        }
        else {
            background = BACKGROUND_NOT_FOUND;
        }

        return background;
    }

    getRatings(stats) {
        if (!stats?.scores || stats.scores.length === 0) return RATINGS_NOT_FOUND;

        let totalScore = 0;
        let totalVotes = 0;

        for (const obj of stats.scores) {
            totalScore += obj.score * obj.votes;
            totalVotes += obj.votes;
        }

        const averageScore = totalScore / totalVotes;

        return `Average score from ${totalVotes.toLocaleString()} votes: ${averageScore.toFixed(2) + ' / 10'}`;
    }

    getRecommendations(rec) {
        if (!rec || rec.length === 0) return RECOMMENDATIONS_NOT_FOUND;
        else return rec.slice(0, 2).map(item => item.entry.title).join(', ');
    }

    getAnimeEmbed() {
        return this.animeEmbed;
    }

    getAnimeInfoEmbed() {
        return this.animeInfoEmbed;
    }

    getAnimeID() {
        return this.animeID;
    }

    getAnimeObj() {
        return this.anime;
    }
}

async function getAnimeArray(searchString) {
    const animeArray = await JIKAN_CLIENT.anime.search(searchString);
    return animeArray;
}

module.exports = {
    AnimeSearch,
    getAnimeArray
}