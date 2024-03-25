const { JIKAN_CLIENT } = require('../jikan/jikanClient');

async function getRandomMangaID() {
  try {
    const random = await JIKAN_CLIENT.manga.random(false);

    return random.id;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getRandomMangaID,
};
