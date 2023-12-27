const { AnimeCharacterSearch } = require('../utils/anime/getCharacter');
const { JIKAN_CLIENT } = require('../utils/jikan/jikanClient');

class AnimeCharacterSearchTests {
    constructor() {
        this.animeCharacterSearch = new AnimeCharacterSearch('main');
        this.characterArr = [];
    }

    testInitialization() {
        test('AnimeSearch initialization', () => {
            expect(this.animeCharacterSearch.getCharacterName()).toBe('main');
        });
    }

    testCharacterArr() {
        test('CharacterArr', async () => {
            const jikanCharacterArr = await JIKAN_CLIENT.anime.getCharacters(1)

            this.characterArr = this.animeCharacterSearch.createCharacterArray(jikanCharacterArr);

            expect(this.characterArr.length).toBe(4);
        })
    }

}

const animeCharacterSearchTests = new AnimeCharacterSearchTests();
animeCharacterSearchTests.testInitialization();
animeCharacterSearchTests.testCharacterArr();


