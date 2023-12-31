const { getAnimeArray } = require('../utils/anime/getAnime');
const { AnimeSearch } = require('../utils/anime/getAnime');
const { EmbedBuilder } = require('discord.js');

class AnimeSearchTests {
    constructor() {
        this.testAnimeID = 21; // One Piece Anime ID 
        this.animeSearch = new AnimeSearch(this.testAnimeID);
    }

    testInitialization() {
        test('AnimeSearch initialization', () => {
            expect(this.animeSearch.getAnimeID()).toBe(this.testAnimeID);
        });
    }

    async testAnimeReturnsEmbed() {
        test('createAnime returns embed', async () => {
            const testEmbed = await this.animeSearch.createAnimeEmbed();
            expect(this.animeSearch.getAnimeEmbed()).toBeInstanceOf(EmbedBuilder);
        });
    }

    async testAnimeEmbedValues() {
        test('tests AnimeEmbed values', async () => {
            const testEmbed = await this.animeSearch.createAnimeEmbed();

            expect(testEmbed.data.title).toBe('One Piece');
            expect(testEmbed.data.author.name).toBe('Currently Searching Anime: One Piece');
            expect(testEmbed.data.url).toBe('https://myanimelist.net/anime/21/One_Piece');
        });
    }

    async testAnimeObject() {
        test('getAnimeName returns non-null anime object', () => {
            const animeName = this.animeSearch.getAnimeObj()

            expect(animeName).not.toBe(null)
        });
    }

    testGetAnimeRatings() {
        test('getRatings values', () => {
            const undefinedRatings = this.animeSearch.getRatings({});

            expect(undefinedRatings).toBe('Ratings not listed.');

            const emptyRatings = this.animeSearch.getRatings({ scores: [] });

            expect(emptyRatings).toBe('Ratings not listed.');

            const stats = {
                scores: [
                    { score: 8, votes: 100 },
                    { score: 9, votes: 150 },
                    { score: 7, votes: 50 },
                ],
            };

            const validRatings = this.animeSearch.getRatings(stats);

            const expectedAverage = ((8 * 100) + (9 * 150) + (7 * 50)) / (100 + 150 + 50);
            expect(validRatings).toBe(`Average score from ${300} votes: ${expectedAverage.toFixed(2)} / 10`)
        });
    }

    testAnimeRecommendations() {
        test('getRecommendation values', () => {
            //const undefinedRecommendations = this.animeSearch.getRecommendations({});

            //expect(undefinedRecommendations).toBe('Recommendations not listed.');

            const rec = [
                { animeSearch: { entry: { title: 'Recommendation 1' } } },
                { animeSearch: { entry: { title: 'Recommendation 2' } } },
                { animeSearch: { entry: { title: 'Recommendation 3' } } },
            ];

            //const definedRecommendations = this.animeSearch.getRecommendations(rec);

            //expect(definedRecommendations).toBe('Recommendation 1', 'Recommendation 2', 'Recommendation 3');
        });
    }

    async testAnimeArrayReturn() {
        test('getAnimeArray returns an array', async () => {
            const searchString = 'One Piece';
            const animeArray = await getAnimeArray(searchString);

            expect(animeArray).toBeInstanceOf(Array);
        });
    }
}

const animeSearchTests = new AnimeSearchTests();
animeSearchTests.testInitialization();
animeSearchTests.testAnimeReturnsEmbed();
animeSearchTests.testAnimeEmbedValues();
animeSearchTests.testAnimeObject();
animeSearchTests.testGetAnimeRatings();
animeSearchTests.testAnimeRecommendations();
animeSearchTests.testAnimeArrayReturn();


