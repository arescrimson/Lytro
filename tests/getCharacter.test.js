const { AnimeCharacterSearch } = require('../utils/anime/getCharacter');
const { JIKAN_CLIENT } = require('../utils/jikan/jikanClient');

class AnimeCharacterSearchTests {
    constructor() {
        this.animeCharacterSearch = new AnimeCharacterSearch('main');
        this.characterArr = [];
    }

    testMainCharacterInitialization() {
        test('AnimeCharacterSearch initialization', () => {
            expect(this.animeCharacterSearch.getCharacterName()).toBe('main');
        });
    }

    testCharacterArr() {
        test('Character Array Length', async () => {
            const jikanCharacterArr = await JIKAN_CLIENT.anime.getCharacters(1) //Tests the main characters of Monster 

            this.characterArr = this.animeCharacterSearch.createCharacterArray(jikanCharacterArr);

            expect(this.characterArr.length).toBe(4);
        })
    }

}

const animeCharacterSearchTests = new AnimeCharacterSearchTests();
animeCharacterSearchTests.testMainCharacterInitialization();
animeCharacterSearchTests.testCharacterArr();


