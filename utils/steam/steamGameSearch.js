require('dotenv').config();
const SteamAPI = require('steamapi');
const { STEAM_KEY } = require('../../config');
const { createSteamGameEmbed } = require('../embed/createEmbeds');
const steam = new SteamAPI(STEAM_KEY);

class SteamGameSearch {

    constructor(gameName) {
        this.gameObj = null;
        this.gameName = gameName;
        this.gameID = 0;
        this.gameEmbed = null;
    }

    async createGameEmbed() {
        try {
            const appList = await steam.getAppList();
            const games = Object.values(appList);
            this.gameObj = games.find(app => app.name.toLowerCase() === this.gameName.toLowerCase());
            console.log(this.gameObj)
            if (!this.gameObj) return null;

            this.gameID = this.gameObj.appid;

            const activePlayers = await steam.getGamePlayers(this.gameID);
            const details = await steam.getGameDetails(this.gameID);

            const genres = this.getGenres(details.genres);
            const categories = this.getCategories(details.categories);

            //console.log(details)
            this.gameEmbed = createSteamGameEmbed(
                details.name,
                details.website ? details.website : undefined,
                activePlayers,
                details.short_description,
                details.price_overview?.final_formatted ?? 'Free to Play',
                details.developers[0],
                genres,
                details.metacritic?.score ?? 'Metacritic score not listed.',
                categories,
                details.header_image
            )

            return this.gameEmbed;
        } catch (error) {
            console.error(error);
        }
    }

    getGenres(genresArray) {
        if (!genresArray || genresArray.length === 0) return 'Genres not found.'

        const genreDescriptions = genresArray.slice(0, 3).map(genre => genre.description);

        const genres = genreDescriptions.join(', ');

        return genres;
    }

    getCategories(categoryArray) {
        if (!categoryArray || categoryArray.length === 0) return 'Categories not found.'

        const categoryDescriptions = categoryArray.slice(0, 3).map(category => category.description);

        const categories = categoryDescriptions.join(', ');

        return categories;

    }

    getGameEmbed() {
        return this.gameEmbed;
    }

    getGameName() { 
        return this.gameName; 
    }

    getGameID() { 
        return this.gameID; 
    }
}

module.exports = {
    SteamGameSearch
}