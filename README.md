# Lytro
<div style="text-align:center">
<img src="https://github.com/arescrimson/LytroOld/blob/master/media/newbanner.jpg" alt="" width="1500" height="200">
</div>

<p align="center"> Discord bot using discord.js for anime, manga, and steam game information.</p>

## About

**IMPORTANT:** As of **12/19/2023**, this is the new version of Lytro, which has been completely rewritten and improved. The old repository can be found [here](https://github.com/arescrimson/LytroOld/tree/master). 

### Exciting updates and improvements from the old version include: 

+ Reworking bot to utilize slash commands instead of prefixes. This allows the bot to utilize autofill menus, better handling of interactions, and more! 
+ Autofill menus for query-related searches, such as anime, characters, and steam games.
+ Reworked UI, visuals, and error handling for embed and returned messages.
+ Much cleaner code and an improvement to command/bot speed and precision overall.
+ More commands using more APIs planned! Now features steam commands.
+ Now hosted on Google Cloud Platform - Compute Engine.
+ Now unit tested with Jest. 
+ And more! 

Discord Bot for information on anime/manga, characters, steam, and more. 

**Data Source:** This bot uses the [MyAnimeList (MAL) API](https://myanimelist.net/apiconfig/references/api/v2). You can visit [MyAnimeList](https://myanimelist.net/) for more details.

## Anime Commands

**/a [animename]:** returns anime information like synopsis, rating based off total votes, genre, url, and more. Scroll to return additional information like background, studio, related animes and release year. 

**/chr [charactername] [animename]:** depending on prefix, returns either 'main' main characters, 'sup' supporting characters, or a specified character name. Provides information like character role, description, and voice actor. 

**/img [animename]:** returns a random image in the picture gallery of the specific anime. 

**/rand:** returns information identical to **/a** with a random anime. 

## Manga Commands

**/m [name]:** returns manga information like synopsis, rating, genre, url and more. 

**/mrand** returns information identical to **/m** with a random manga.

## Steam Commands 

**/steam [gamename]:** returns information about specified steam game like summary, pricing, genres, and more. 

## Misc Commands

**/quote** returns a random anime-related quote. 
