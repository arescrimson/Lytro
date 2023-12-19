const { JIKAN_CLIENT } = require('../jikan/jikanClient');
const { createMangaEmbed, createMangaInfoEmbed } = require('../embed/createEmbeds');

const { GENRES_NOT_FOUND,
    VOLUMES_NOT_FOUND,
    URL_NOT_FOUND,
    RECOMMENDATIONS_NOT_FOUND,
    SERIAL_NOT_FOUND,
    SYNOPSIS_NOT_FOUND,
    BACKGROUND_NOT_FOUND,
    RATINGS_NOT_FOUND,
    YEAR_NOT_FOUND,
    AUTHOR_NOT_FOUND } = require('../../config');

class MangaSearch {

    constructor(mangaID) {
        this.mangaID = mangaID;
        this.mangaEmbed = null;
        this.manga = null;
        this.author = '';
        this.synopsis2 = '\n';
        this.background2 = '\n';
    }

    /**
     * Gets manga Information from the mangaID passed. 
     */
    async createMangaEmbed() {
        try {
            this.manga = await JIKAN_CLIENT.manga.get(this.mangaID);

            const stats = await JIKAN_CLIENT.manga.getStatistics(this.mangaID);
            let genres = this.manga.genres?.map(genre => genre.name).join(', ');

            if (!genres || genres.trim() === '') {
                genres = GENRES_NOT_FOUND;
            }

            const synopsis = this.getSynopsis(this.manga);
            const ratings = this.getRatings(stats);
            this.author = this.manga.authors[0].name ?? AUTHOR_NOT_FOUND
            const volumes = this.manga.volumes?.toLocaleString() ?? VOLUMES_NOT_FOUND;

            this.mangaEmbed = createMangaEmbed(
                this.manga.title?.default,
                this.manga.url ?? URL_NOT_FOUND,
                this.author,
                synopsis,
                this.synopsis2,
                volumes,
                genres,
                ratings,
                this.manga.image.webp.default
            )

            return this.mangaEmbed;
        } catch (error) {
            console.error('Error in getManga:', error.message);
        }
    }

    async createMangaInfoEmbed() {
        try {

            const background = this.getBackground();

            this.mangaInfoEmbed = createMangaInfoEmbed(
                this.manga.title.default,
                this.manga.url,
                this.author,
                background,
                this.background2,
                this.manga.publishInfo?.publishedFrom?.getFullYear() ?? YEAR_NOT_FOUND,
                this.manga.serializations[0]?.name ?? SERIAL_NOT_FOUND,
                this.manga.popularity?.toLocaleString() ?? POPULARITY_NOT_FOUND,
                this.manga.image.webp.default
            )

            return this.mangaInfoEmbed;

        } catch (error) {
            console.error('Error in getMangaInfo:', error.message);
        }
    }

    getSynopsis() {
        //INITIALIZES SPLIT FOR SYNOPSIS THAT ARE OVER 1020 CHARACTERS 
        let synopsis = '';

        //SPLITS SYNOPSIS IF TOO LONG INTO 2-3 PARAGRAPHS. 
        if (this.manga.synopsis) {
            if (this.manga.synopsis.length > 1020) {
                const midPoint = this.manga.synopsis.lastIndexOf('.', 1020);
                if (midPoint !== -1) {
                    const synopsisFirstPart = this.manga.synopsis.substring(0, midPoint + 1);
                    const synopsisSecondPart = this.manga.synopsis.substring(midPoint + 1);
                    synopsis = synopsisFirstPart;
                    this.synopsis2 = synopsisSecondPart;
                }
            }
            //else, simply assign synopsis to the manga synopsis. 
            else {
                synopsis = this.manga.synopsis;
            }
        } else {
            return SYNOPSIS_NOT_FOUND;
        }

        return synopsis;
    }

    getBackground() {
        let background = '';

        if (this.manga.background) {
            if (this.manga.background.length > 1020) {
                const midPoint = this.manga.background.lastIndexOf('.', 1020);
                if (midPoint !== -1) {
                    const backgroundFirstPart = this.manga.background.substring(0, midPoint + 1);
                    const backgroundSecondPart = this.manga.background.substring(midPoint + 1);
                    background = backgroundFirstPart;
                    this.background2 = backgroundSecondPart;
                }
            }
            //else, simply assign background to the manga background. 
            else {
                background = this.manga.background;
            }
        }
        //if background is null, error message. 
        else {
            background = BACKGROUND_NOT_FOUND;
        }

        return background;
    }

    getRatings(stats) {
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
        } else {
            ratings = RATINGS_NOT_FOUND;
        }

        return ratings;
    }

    getMangaEmbed() {
        return this.mangaEmbed;
    }

    getMangaInfoEmbed() {
        return this.mangaInfoEmbed;
    }
}

module.exports = {
    MangaSearch
}