const { JIKAN_CLIENT } = require('../jikan/jikanClient')
const { createAnimeImageEmbed } = require('../embed/createEmbeds')

class AnimeImageSearch {
  constructor(animeID) {
    this.animeID = animeID
    this.animeImageEmbed = null
    this.animeImageArray = []
    this.searchedSet = new Set()
  }

  async createAnimeImagesEmbed() {
    try {
      let randomImageIndex

      const anime = await JIKAN_CLIENT.anime.get(this.animeID)
      this.animeImageArray = await JIKAN_CLIENT.anime.getPictures(this.animeID)

      if (this.animeImageArray.length === 0) return null

      do {
        randomImageIndex = Math.floor(
          Math.random() * this.animeImageArray.length,
        )
      } while (this.searchedSet.has(randomImageIndex))

      if (this.searchedSet.size >= this.animeImageArray.length) {
        this.searchedSet.clear()
      } else {
        this.searchedSet.add(randomImageIndex)
      }

      const pictureLink =
        this.animeImageArray[randomImageIndex].webp.default.href

      this.animeImageEmbed = createAnimeImageEmbed(
        anime.title.default,
        pictureLink,
      )

      return this.animeImageEmbed
    } catch (error) {
      console.error('Error in getAnimeImages:', error.message)
    }
  }

  getAnimeImageEmbed() {
    return this.animeImageEmbed
  }

  getAnimeImageArrayLength() {
    return this.animeImageArray.length
  }
}

module.exports = {
  AnimeImageSearch,
}
