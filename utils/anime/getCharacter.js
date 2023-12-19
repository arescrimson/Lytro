/**
 * @file getCharacter.js
 * @description Retrieve character info from an anime.
 * @license MIT
 * @author Ares
 */

const { JIKAN_CLIENT } = require('../jikan/jikanClient')

const { createCharacterEmbed } = require('../embed/createAnimeEmbeds');

class AnimeCharacterSearch {

    constructor(characterName, animeID) {
        this.characterArr = [];
        this.characterEmbed = null;
        this.characterName = characterName;
        this.animeID = animeID;
        this.characterCounter = 0;
        this.animeName = "";
        this.voiceActors = "";
    }

    /**
     * Gets Anime Characters from the animeID passed. 
     * 
     */

    async createAnimeCharactersEmbed() {

        try {
            const anime = await JIKAN_CLIENT.anime.get(this.animeID);
            const jikanCharacterArray = await JIKAN_CLIENT.anime.getCharacters(this.animeID);
            if (!jikanCharacterArray) return null; 
            this.characterArr = this.getCharacter(jikanCharacterArray);
            if (!this.characterArr.length) return null;

            this.animeName = anime.title.default;

            this.voiceActors =
                this.characterArr[this.characterCounter]?.voiceActors[this.characterCounter]?.person.name;

            const jikanCharacterAbout =
                await JIKAN_CLIENT.characters.getFull(this.characterArr[this.characterCounter].character.id);

            const characterAbout = this.getDescription(jikanCharacterAbout.about);

            this.characterEmbed = createCharacterEmbed(
                this.characterArr[this.characterCounter].character.name,
                this.characterArr[this.characterCounter].character.url,
                this.animeName ?? 'animeName',
                this.characterArr[this.characterCounter].role ?? 'role',
                characterAbout,
                this.voiceActors ?? 'va',
                this.characterArr[this.characterCounter]?.character.image.webp.default
            );

            return this.characterEmbed;
        } catch (error) {
            console.error('Error in getCharacter:', error.message);
        }
    }

    getCharacter(jikanCharacterArr) {

        for (let i = 0; i < jikanCharacterArr.length; i++) {

            //if character name is main, indexes and returns ALL MAIN CHARACTERS.
            if (this.characterName === 'main') {
                if (jikanCharacterArr[i].role === 'Main') {
                    this.characterArr.push(jikanCharacterArr[i]);
                }
            }
            //if character name is sup, indexes ALL SUPPORTING CHARACTERS. Temporary limit of 5 indexes until 
            //functionality to advance indexes is added.  
            else if (this.characterName === 'side') {
                if (jikanCharacterArr[i].role === 'Supporting') {
                    this.characterArr.push(jikanCharacterArr[i]);
                }
            }
            //if character name is specified as a name, extracts first name and compares it to 
            //passed characterName .toLowerCase() because of case sensitivity in equality. 
            else {
                if (this.getFirstName(jikanCharacterArr[i].character.name)) {
                    this.characterArr.push(jikanCharacterArr[i]);
                }
            }
        }

        return this.characterArr;
    }

    getDescription(characterDescription) {
        let description;

        if (!characterDescription) {
            return description = 'description';
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

    /**
     * Gets first name from either a single first name, or a lastname, firstname format. 
     * Ex. !chr gon hunter x hunter would return gon, even though the api lists it as Freecss, Gon. 
     * 
     * @returns the first name. 
     */
    getFirstName(databaseNames) {
        let res = false;
        //splits by nameParts, i.e Monkey D., Luffy, and sets to lowercase for comparison purposes. 
        const nameParts = databaseNames.split(',').map(part => part.trim().toLowerCase());
        //returns true if characterName matches either first or last name. 
        if (nameParts.includes(this.characterName.toLowerCase())) {
            res = true;
        }

        return res;
    }

    async updateCharacterEmbed(updateRight) {
        if (updateRight) {
            this.characterCounter = (this.characterCounter + 1) % this.characterArr.length;
        } else {
            this.characterCounter = (this.characterCounter - 1 + this.characterArr.length) % this.characterArr.length;
        }

        let characterAbout;

        const updatedCharacterFull =
            await JIKAN_CLIENT.characters.getFull
                (this.characterArr[this.characterCounter].character.id);

        if (updatedCharacterFull) {
            characterAbout = this.getDescription(updatedCharacterFull.about);
        } else {
            characterAbout = 'description';
        }

        this.voiceActors =
            this.characterArr[this.characterCounter]?.voiceActors[this.characterCounter]?.person.name;

        this.characterEmbed = createCharacterEmbed(
            this.characterArr[this.characterCounter].character.name,
            this.characterArr[this.characterCounter].character.url,
            this.animeName ?? 'animeName',
            this.characterArr[this.characterCounter].role ?? 'role',
            characterAbout,
            this.voiceActors ?? 'va',
            this.characterArr[this.characterCounter]?.character.image.webp.default
        );

        return this.characterEmbed;
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

module.exports = {
    AnimeCharacterSearch
}