/**
 * @file getCharacter.js
 * @description Retrieve character info from an anime.
 * @license MIT
 * @author Ares
 */

const { EmbedBuilder } = require('discord.js')

const { JIKAN_CLIENT } = require('../jikan/jikanClient')

/**
 * Gets first name from either a single first name, or a lastname, firstname format. 
 * Ex. !chr gon hunter x hunter would return gon, even though the api lists it as Freecss, Gon. 
 * 
 * @param {string} characterName is the character Name. 
 * @returns the first name. 
 */
function getFirstName(characterName, databaseNames) {
    let res = false;
    //splits by nameParts, i.e Monkey D., Luffy, and sets to lowercase for comparison purposes. 
    const nameParts = databaseNames.split(',').map(part => part.trim().toLowerCase());
    //returns true if characterName matches either first or last name. 
    if (nameParts.includes(characterName.toLowerCase())) {
        res = true;
    }

    return res;
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
function createCharacterEmbed(NAME, URL, TITLE, ROLE, DESCRIPTION, VOICEACTOR, IMAGE) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${NAME}`)
        .setURL(`${URL}`)
        .setAuthor({ name: `Currently Searching anime : ${TITLE}` })
        .addFields(
            { name: 'Role:', value: `${ROLE}` },
            { name: 'Description:', value: `${DESCRIPTION}` },
            { name: 'Japanese Voice Actor:', value: `${VOICEACTOR}`, inline: true },
        )
        .setImage(`${IMAGE}`)
        .setTimestamp()
        .setFooter({ text: 'Information from Lytro' });
}

function getDescription(characterDescription) {
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
 * Gets Anime Characters from the animeID passed. 
 * 
 * @param {number} animeID is the animeID passed. 
 * @param {string} characterName is the lowercased character Name being searched. 
 */

async function getAnimeCharacters(characterName, animeID) {

    try {
        const anime = await JIKAN_CLIENT.anime.get(animeID); 
        const characterArray = await JIKAN_CLIENT.anime.getCharacters(animeID); 
        const animeName = anime.title.default; 
        
        const character = hold(characterArray, characterName); 
        let i = 0;

        const voiceActors = await getVoiceActors(character); 

        const characterEmbed = createCharacterEmbed(
            character.name,
            character.url,
            animeName ?? 'animeName',
            character.nicknames ?? 'nicknames',
            getDescription(character.about),
            character?.name ?? 'va',
            character?.image.webp.default
        );

        return characterEmbed;
    } catch (error) {
        console.error('Error in getCharacter:', error.message);
    }
}

function hold() {
    
    let characterArr = []; 

    for (let i = 0; i < ch.length; i++) {

        //if character name is main, indexes and returns ALL MAIN CHARACTERS.
        if (characterName === 'main') {
            if (ch[i].role === 'Main') {
                characterArr.push(ch[i]);
                characterFound = true;
            }
        }
        //if character name is sup, indexes ALL SUPPORTING CHARACTERS. Temporary limit of 5 indexes until 
        //functionality to advance indexes is added.  
        else if (characterName === 'sup') {
            if (ch[i].role === 'Supporting') {
                characterArr.push(ch[i]);
                characterFound = true;
            }
        }
        //if character name is specified as a name, extracts first name and compares it to 
        //passed characterName .toLowerCase() because of case sensitivity in equality. 
        else {
            if (getFirstName(characterName, (ch[i].character.name).toLowerCase())) {
                characterArr.push(ch[i]);
                characterFound = true;
            }
        }
    }

    return characterArr; 
}

async function getVoiceActors(character) { 
    const va = await character.getVoiceActors(); 
    console.log(va[0]); 
}

module.exports = {
    getAnimeCharacters
}