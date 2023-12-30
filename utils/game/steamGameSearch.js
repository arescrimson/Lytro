require('dotenv').config();
const SteamAPI = require('steamapi');
const { STEAM_KEY } = require('../../config');
const { createSteamGameEmbed } = require('../embed/createGameEmbeds');
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
            const steamGameArray = await getSteamGameArray(); 
            this.gameObj = steamGameArray.find(game => game.name === this.gameName);
            
            if (!this.gameObj) return null;
            
            this.gameID = this.gameObj.appid;

            const activePlayers = await steam.getGamePlayers(this.gameID);
            const details = await steam.getGameDetails(this.gameID);
            
            const genres = this.getGenres(details.genres);

            const categories = this.getCategories(details.categories);
            const developers = details?.developers;
            const publishers = details?.publishers?.slice(0,2) ?? 'Publishers not listed.'; 
            const recommendations = details?.recommendations?.total ?? 'Recommendations not listed.'; 
            const releaseDate = details?.release_date?.date ?? 'Date not listed.'

            this.gameEmbed = createSteamGameEmbed(
                details.name,
                details.website ? details.website : undefined,
                activePlayers ?? 'Active Players not listed,',
                details?.short_description ?? 'Description not listed.',
                details.price_overview?.final_formatted ?? 'Free to Play',
                developers?.length > 0 ? developers[0] : 'Developers not listed.',
                genres,
                details.metacritic?.score ?? 'Metacritic score not listed.',
                categories,
                details.header_image, 
                publishers, 
                recommendations,
                releaseDate
            )

            return this.gameEmbed;
        } catch (error) {
            console.error(error);
        }
    }

    getGenres(genresArray) {
        if (!genresArray || genresArray.length === 0) return 'Genres not listed.'

        const genreDescriptions = genresArray.slice(0, 3).map(genre => genre.description);

        const genres = genreDescriptions.join(', ');

        return genres;
    }

    getCategories(categoryArray) {
        if (!categoryArray || categoryArray.length === 0) return 'Categories not listed.'

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

let cachedGameArray = null;

async function getSteamGameArray() {
    if (cachedGameArray) {
        return cachedGameArray;
    }

    const steamGameArray = await steam.getAppList();
    cachedGameArray = steamGameArray;

    return steamGameArray;
}

module.exports = {
    SteamGameSearch,
    getSteamGameArray
}