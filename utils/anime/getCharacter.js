/**
 * @file getCharacter.js
 * @description Retrieve character info from an anime.
 * @license MIT
 * @author Ares
 */

const { JIKAN_CLIENT } = require('../jikan/jikanClient')

const { createCharacterEmbed } = require('../embed/createEmbeds');

const {
    ROLE_NOT_FOUND,
    VA_NOT_FOUND,
    DESCRIPTION_NOT_FOUND,
} = require('../../config')

class AnimeCharacterSearch {

    constructor(characterName) {
        this.characterArr = [];
        this.characterObj = null;
        this.characterEmbed = null;
        this.characterName = characterName;
        this.characterCounter = 0;
        this.animeName = "";
        this.voiceActors = "";
        this.searchMain = true;
    }

    /**
     * Gets Anime Characters from the animeID passed. 
     * 
     */

    async createAnimeCharactersEmbed() {
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

            const voiceActors =
                this.characterObj.voices[0]?.person.name;

            const characterAbout =
                this.getDescription(this.characterObj.about);

            let nicknames;

            if (this.characterObj.nicknames.length === 0) nicknames = 'Nicknames not listed.'
            else nicknames = this.characterObj?.nicknames?.slice(0, 3);

            this.characterEmbed = createCharacterEmbed(
                this.characterObj.name,
                this.characterObj.url,
                nicknames,
                characterAbout,
                voiceActors ?? VA_NOT_FOUND,
                this.characterObj?.image.webp.default
            );

            return this.characterEmbed;

        } catch (error) {
            console.error('Error in createAnimeCharactersEmbed:', error.message);
        }
    }

    async createMainCharacterEmbed(animeObj) {
        const jikanCharacterArr = await JIKAN_CLIENT.anime.getCharacters(animeObj.id)

        this.characterArr = this.createCharacterArray(jikanCharacterArr);

        this.characterEmbed = await this.createAnimeCharactersEmbed(true);

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
            if (characterDescription.length > 1024) {
                const midPoint = characterDescription.lastIndexOf('.', 1024);

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
        console.log(this.characterObj);
        if (!this.characterObj) return null;

        const voiceActors =
            this.characterObj.voices[0]?.person.name;

        const characterAbout =
            this.getDescription(this.characterObj.about);

        let nicknames;

        if (this.characterObj.nicknames.length === 0) nicknames = 'Nicknames not listed.'
        else nicknames = this.characterObj?.nicknames?.slice(0, 3);

        this.characterEmbed = createCharacterEmbed(
            this.characterObj.name,
            this.characterObj.url,
            nicknames,
            characterAbout,
            voiceActors ?? VA_NOT_FOUND,
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
    AnimeCharacterSearch,
    searchCharacterArray
}