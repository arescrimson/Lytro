const { JIKAN_CLIENT } = require('../jikan/jikanClient');

async function getRandomID() {
    try {
        const random = await JIKAN_CLIENT.anime.random(false);

        return random.id;

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getRandomID
}