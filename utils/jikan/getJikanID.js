const { JIKAN_CLIENT } = require('../jikan/jikanClient')

async function getJikanID(mediaType, searchString) {
  try {
    let searchResults

    switch (mediaType) {
      case 'anime':
        searchResults = await JIKAN_CLIENT.anime.search(searchString)
        break
      case 'manga':
        searchResults = await JIKAN_CLIENT.manga.search(searchString)
        break
    }

    if (!searchResults) return null

    const filteredResult = searchResults.find(
      (anime) =>
        anime?.title &&
        anime?.title?.english !== null &&
        anime.title.english.toLowerCase() === searchString.toLowerCase(),
    )

    if (!filteredResult) return null

    return filteredResult.id
  } catch (error) {
    console.error('Error in getting JikanID', error.message)
  }
}

module.exports = { getJikanID }
