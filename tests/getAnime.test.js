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

    async testAnimeInfoReturnsEmbed() {
        test('createAnimeInfoEmbed returns embed', async () => {
            const testEmbed = await this.animeSearch.createAnimeInfoEmbed();
            expect(this.animeSearch.getAnimeInfoEmbed()).toBeInstanceOf(EmbedBuilder);
        });
    }

    async testAnimeEmbedValues() { 
        test('tests AnimeEmbed values', async () => {
            
            const testEmbed = await this.animeSearch.createAnimeEmbed();
            expect(testEmbed.data.title).toBe('One Piece'); 
            expect(testEmbed.data.author.name).toBe('Currently Searching Anime: One Piece'); 
            expect(testEmbed.data.url).toBe('https://myanimelist.net/anime/21/One_Piece');
           
            //const synopsis = testEmbed.data.fields[0]; 
            //expect(synopsis.name).toBe('Synopsis: \n'); 
            //expect(synopsis.value).toBe
            //('Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by fearsome pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in battle, Luffy is a pirate himself who resolutely pursues the coveted One Piece treasure and the King of the Pirates title that comes with it.\n');

        });
    }

    async testAnimeInfoEmbedValues() { 
        test('tests AnimeInfoEmbed values', async () => {
            const testEmbed = await this.animeSearch.createAnimeInfoEmbed();
            //console.log(testEmbed.data.fields);
            expect(testEmbed.data.title).toBe('One Piece'); 
            expect(testEmbed.data.author.name).toBe('Currently Searching Anime: One Piece'); 
            expect(testEmbed.data.url).toBe('https://myanimelist.net/anime/21/One_Piece');
            
            const releaseDate = testEmbed.data.fields[2]; 
            expect(releaseDate.value).toBe('1999'); 

            const studio = testEmbed.data.fields[3]; 
            expect(studio.value).toBe('Toei Animation');
        });
    }

    async testAnimeObject() { 
        test('getAnimeName returns non-null anime object', () => {
            const animeName = this.animeSearch.getAnimeObj()
        
            expect(animeName).not.toBe(null)
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
animeSearchTests.testAnimeInfoReturnsEmbed();
animeSearchTests.testAnimeEmbedValues(); 
animeSearchTests.testAnimeInfoEmbedValues(); 
animeSearchTests.testAnimeObject(); 
animeSearchTests.testAnimeArrayReturn(); 


