const { JIKAN_CLIENT } = require('../jikan/jikanClient');
const {
  createMangaEmbed,
  createMangaInfoEmbed,
} = require('../embed/createEmbeds');

const {
  GENRES_NOT_FOUND,
  VOLUMES_NOT_FOUND,
  URL_NOT_FOUND,
  SERIAL_NOT_FOUND,
  SYNOPSIS_NOT_FOUND,
  BACKGROUND_NOT_FOUND,
  RATINGS_NOT_FOUND,
  YEAR_NOT_FOUND,
  AUTHOR_NOT_FOUND,
  MAX_VALUE_LENGTH,
} = require('../../config');

class MangaSearch {
  constructor(mangaID) {
    this.mangaID = mangaID;
    this.mangaEmbed = null;
    this.manga = null;
    this.mangaObj = null;
    this.author = '';
    this.synopsis2 = '\n';
    this.background2 = '\n';
  }

  async createMangaEmbed() {
    try {
      this.manga = await JIKAN_CLIENT.manga.get(this.mangaID);
      this.mangaObj = await JIKAN_CLIENT.manga.getFull(this.mangaID);

      if (!this.manga) return null;

      const stats = await JIKAN_CLIENT.manga.getStatistics(this.mangaID);
      let genres = this.manga.genres?.map((genre) => genre.name).join(', ');

      if (!genres || genres.trim() === '') {
        genres = GENRES_NOT_FOUND;
      }

      this.author = this.manga.authors[0].name ?? AUTHOR_NOT_FOUND;

      const synopsis = this.getSynopsis(this.manga.synopsis, true);
      const ratings = this.getRatings(stats);
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
        this.manga.publishInfo?.publishedFrom?.getFullYear() ?? YEAR_NOT_FOUND,
        this.manga.serializations[0]?.name ?? SERIAL_NOT_FOUND,
        this.manga.popularity?.toLocaleString() ?? POPULARITY_NOT_FOUND,
        this.manga.image.webp.default,
      );

      return this.mangaEmbed;
    } catch (error) {
      console.error('Error in getManga:', error.message);
    }
  }

  getSynopsis(mangaText, isSynopsis) {
    let splitText = '';

    if (mangaText) {
      if (mangaText.length > MAX_VALUE_LENGTH) {
        const midPoint = mangaText.lastIndexOf('.', MAX_VALUE_LENGTH);
        if (midPoint !== -1) {
          const firstPart = mangaText.substring(0, midPoint + 1);
          const secondPart = mangaText.substring(midPoint + 1);

          splitText = firstPart;

          if (isSynopsis) this.synopsis2 = secondPart;
          else this.background2 = secondPart;
        }
      } else {
        splitText = mangaText;
      }
    } else {
      if (isSynopsis) return SYNOPSIS_NOT_FOUND;
      else return BACKGROUND_NOT_FOUND;
    }

    return splitText;
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

  getMangaObj() {
    return this.mangaObj;
  }

  getMangaEmbed() {
    return this.mangaEmbed;
  }
}

async function getMangaArray(searchString) {
  const mangaArray = await JIKAN_CLIENT.manga.search(searchString);
  return mangaArray;
}

module.exports = {
  MangaSearch,
  getMangaArray,
};
