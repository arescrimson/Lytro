/**
 * @file getCharacter.js
 * @description Retrieve character info from an anime.
 * @license MIT
 * @author Ares
 */

const { EmbedBuilder } = require('discord.js')

const { JIKAN_CLIENT } = require('../jikan/jikanClient')

class AnimeCharacterSearch {

    constructor(characterName, animeID) { 
        this.characterArr = []; 
        this.characterEmbed = null; 
        this.characterName = characterName; 
        this.animeID = animeID; 
        this.characterCounter = 0; 
    }

    /**
     * Creates an embedded message for displaying information about an anime character.
     *
     * @param {string} NAME - The name of the character.
     * @param {string} URL - The URL associated with the character.
     * @param {string} TITLE - The title of the anime the character is from.
     * @param {string} THUMBNAIL - The URL of the character's thumbnail image.
     * @param {string} ROLE - The role or position of the character.
     * @param {string} VOICEACTOR - The Japanese voice actor for the character.
     * @param {string} IMAGE - The URL of the character's image.
     * @returns {EmbedBuilder} - An EmbedBuilder object for the character information.
     */
    createCharacterEmbed(NAME, URL, TITLE, ROLE, DESCRIPTION, VOICEACTOR, IMAGE) {
        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${NAME}`)
            .setURL(`${URL}`)
            .setAuthor({ name: `Currently Searching Anime : ${TITLE}` })
            .addFields(
                { name: 'Role:', value: `${ROLE}` },
                { name: 'Description:', value: `${DESCRIPTION}` },
                { name: 'Japanese Voice Actor:', value: `${VOICEACTOR}`, inline: true },
            )
            .setImage(`${IMAGE}`)
            .setTimestamp()
            .setFooter({ text: 'Information from Lytro' });
    }

    /**
     * Gets Anime Characters from the animeID passed. 
     * 
     */

    async getAnimeCharacters() {

        try {
            const anime = await JIKAN_CLIENT.anime.get(this.animeID);
            if (!anime) return;
            const jikanCharacterArray = await JIKAN_CLIENT.anime.getCharacters(this.animeID);
            this.characterArr = this.getCharacter(jikanCharacterArray);
            if (!this.characterArr.length) return;

            const animeName = anime.title.default;

            const voiceActors = 
            this.characterArr[this.characterCounter]?.voiceActors[this.characterCounter]?.person.name;

            const jikanCharacterAbout = 
            await JIKAN_CLIENT.characters.getFull(this.characterArr[this.characterCounter].character.id);
            
            const characterAbout = this.getDescription(jikanCharacterAbout.about);

            this.characterEmbed = this.createCharacterEmbed(
                this.characterArr[this.characterCounter].character.name,
                this.characterArr[this.characterCounter].character.url,
                animeName ?? 'animeName',
                this.characterArr[this.characterCounter].role ?? 'role',
                characterAbout,
                voiceActors ?? 'va',
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
            else if (this.characterName === 'sup') {
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

    getCharacterArr() {
        return this.characterArr;
    }

    getCharacterName() { 
        return this.characterName; 
    }

    setCharacterCounter(change) { 
        this.characterCounter += change; 
    }
}

module.exports = {
    AnimeCharacterSearch
}