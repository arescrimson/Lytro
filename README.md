# 💜 Lytro

<div style="text-align:center">
<img src="https://i.redd.it/a3ftzqi7ide71.png" alt="" width="1500" height="200">
</div>

# 💡 About

A Discord Bot that features commands mainly about anime/manga, but also returns information about video games, cats, and more. Fully built, maintained, and hosted by Ares. Feel free to send me a dm @arescrimson on Discord for anything relating to your experience using the bot :)

Add to your server [here](https://discord.com/api/oauth2/authorize?client_id=1185754463907086367&permissions=2147510272&scope=bot+applications.commands). Please note that this is still a work in progress, and do let me know if you run into any issues.

# ⚒️ Using

[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)]() [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]() [![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/) [![Google Cloud](https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

# 🚀 Updates

**UPDATE: As of 3/24/2024, Lytro will have maintenance stopped until summer. This is because of pricing/time constraints/new Google Cloud policies, but development will be (hopefully) resumed come summer. Lytro will be online until April.**

**IMPORTANT:** As of **12/19/2023**, this is the new version of Lytro, which has been completely rewritten and improved. The old repository can be found [here](https://github.com/arescrimson/LytroOld/tree/master).

### Exciting updates and improvements from the old version include:

- Reworking bot to utilize slash commands instead of prefixes. This allows the bot to utilize autofill menus, better handling of interactions, and tons of other new fun functionalities!
- Autofill menus for query-related searches, such as anime, characters, and video games.
- Reworked UI, visuals, and error handling for embed and returned messages.
- Much cleaner code and an improvement to command/bot speed and precision overall.
- More commands planned and in active development! Now has commands about games and animals as well.
- Now fully hosted and supported on **Google Compute Engine** with continuous integration/deployment using **Google Cloud Build**.
- Now unit tested with **Jest**.
- And more!

## Anime Commands

**/a [animename]:** returns anime information like synopsis, rating based off total votes, genre, url, and more. Scroll to return additional information like background, studio, related animes and release year.

**/chr [charactername] [animename]:** depending on prefix, returns either 'main' main characters, 'sup' supporting characters, or a specified character name. Provides information like character role, description, and voice actor.

**/img [animename]:** returns a random image in the picture gallery of the specific anime.

**/rand:** returns information identical to **/a** with a random anime.

**/quote** returns a random anime-related quote.

## Manga Commands

**/m [name]:** returns manga information like synopsis, rating, genre, url and more.

**/mrand** returns information identical to **/m** with a random manga.

## Game Commands

**/steam [gamename]:** returns information about specified steam game like summary, pricing, genres, and more.

**/er [genre] [search]:** returns information about genre of elden ring search query, i.e bosses, locations, npc, etc.

## Animal Commands

**/cats:** returns a random image of cats.

## Help

**/help:** returns a help message with command information.

# 🎬 Demo

## Anime & Manga

https://github.com/arescrimson/Lytro/assets/66581240/c7e96893-239e-4649-a510-81235cbe247a

## Games

https://github.com/arescrimson/Lytro/assets/66581240/af92e482-54e8-4696-96df-4d5611cbab42

## Animals

https://github.com/arescrimson/Lytro/assets/66581240/416a7394-2a02-4b73-911e-191358a32ed6

# 📄 Data Source

This bot uses [MyAnimeList (MAL) API](https://myanimelist.net/apiconfig/references/api/v2), [Steam API](https://steamcommunity.com/dev) and [Cats API](https://thecatapi.com/).
