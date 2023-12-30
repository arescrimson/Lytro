/**
 * @file getCharacter.js
 * @description Retrieve character info from an manga.
 * @license MIT
 * @author Ares
 */

const { JIKAN_CLIENT } = require('../jikan/jikanClient')

const { createMangaCharacterEmbed } = require('../embed/createEmbeds');

const {
    NICKNAMES_NOT_FOUND,
    VA_NOT_FOUND,
    DESCRIPTION_NOT_FOUND,
    MAX_VALUE_LENGTH,
} = require('../../config')

class MangaCharacterSearch {

    constructor(characterName) {
        this.characterArr = [];
        this.characterObj = null;
        this.characterEmbed = null;
        this.characterName = 'test';
        this.characterCounter = 0;
        this.searchMain = true;
    }

    async createMangaCharactersEmbed() {
        try {
            if (this.searchMain) {
                this.characterObj = await JIKAN_CLIENT.characters.getFull(this.characterArr[this.characterCounter].character.id);
            } else {

                const characterArray = await searchCharacterArray(this.characterName);
                this.characterArr = characterArray.filter(name => name.name === this.characterName);

                if (this.characterArr.length === 0) return null;

                this.characterObj = await JIKAN_CLIENT.characters.getFull(this.characterArr[this.characterCounter].id);
            }

            if (!this.characterObj) return null;

            const characterAbout = this.getDescription(this.characterObj.about);

            let nicknames;

            if (this.characterObj.nicknames.length === 0) nicknames = NICKNAMES_NOT_FOUND;
            else nicknames = this.characterObj?.nicknames?.slice(0, 3);

            this.characterEmbed = createMangaCharacterEmbed(
                this.characterObj.name,
                this.characterObj.url,
                nicknames,
                characterAbout,
                this.characterObj?.image.webp.default
            );

            return this.characterEmbed;

        } catch (error) {
            console.error('Error in createMangaCharactersEmbed:', error.message);
        }
    }

    async createMainCharacterEmbed(mangaObj) {
        const jikanCharacterArr = await JIKAN_CLIENT.manga.getCharacters(mangaObj.id)

        this.characterArr = this.createCharacterArray(jikanCharacterArr);

        this.characterEmbed = await this.createMangaCharactersEmbed(true);

        return this.characterEmbed;
    }

    createCharacterArray(jikanCharacterArr) {
        this.characterArr = jikanCharacterArr.filter(ch => ch.role === 'Main');
        return this.characterArr;
    }

    getDescription(characterDescription) {
        let description;

        if (!characterDescription) {
            return description = DESCRIPTION_NOT_FOUND;
        }

        else {
            if (characterDescription.length > MAX_VALUE_LENGTH) {
                const midPoint = characterDescription.lastIndexOf('.', MAX_VALUE_LENGTH);

                if (midPoint !== -1) {
                    const descriptionFirstPart = characterDescription.substring(0, midPoint + 1);
                    description = descriptionFirstPart;
                }
            }
            else {
                description = characterDescription
            }
        }

        return description;
    }

    async updateCharacterEmbed(updateRight) {
        if (updateRight) {
            this.characterCounter = (this.characterCounter + 1) % this.characterArr.length;
        } else {
            this.characterCounter = (this.characterCounter - 1 + this.characterArr.length) % this.characterArr.length;
        }

        if (this.searchMain) {
            this.characterObj = await JIKAN_CLIENT.characters.getFull(this.characterArr[this.characterCounter].character.id);
        } else {
            this.characterObj = await JIKAN_CLIENT.characters.getFull(this.characterArr[this.characterCounter].id);
        }

        if (!this.characterObj) return null;

        const characterAbout =
            this.getDescription(this.characterObj.about);

        let nicknames;

        if (this.characterObj.nicknames.length === 0) nicknames = NICKNAMES_NOT_FOUND
        else nicknames = this.characterObj?.nicknames?.slice(0, 3);

        this.characterEmbed = createMangaCharacterEmbed(
            this.characterObj.name,
            this.characterObj.url,
            nicknames,
            characterAbout,
            this.characterObj?.image.webp.default
        );

        return this.characterEmbed;
    }

    setSearchMain(isMain) {
        this.searchMain = isMain;
    }

    getCharacterArr() {
        return this.characterArr;
    }

    getCharacterName() {
        return this.characterName;
    }

    getCharacterEmbed() {
        return this.characterEmbed;
    }
}

async function searchCharacterArray(characterName) {
    const characterArray = await JIKAN_CLIENT.characters.search(characterName)
    return characterArray;
}


module.exports = {
    MangaCharacterSearch,
    searchCharacterArray
}