const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const STEAM_KEY = process.env.STEAM_KEY;
const QUOTE_TOKEN = process.env.QUOTE_TOKEN;
const CATS_TOKEN = process.env.CATS_TOKEN;

module.exports = {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  STEAM_KEY,
  QUOTE_TOKEN,
  CATS_TOKEN,
  QUOTE_URL: 'https://waifu.it/api/v4/quote',
  THUMBNAIL:
    'https://github.com/arescrimson/Lytro/blob/master/media/profile.jpg?raw=true',
  ICON_URL:
    'https://github.com/arescrimson/Lytro/blob/master/media/icon.png?raw=true',
  MAX_VALUE_LENGTH: 1020,
  SYNOPSIS_NOT_FOUND: 'Synopsis not listed.',
  URL_NOT_FOUND: 'URL not listed.',
  EPISODES_NOT_FOUND: 'Episodes not listed.',
  GENRES_NOT_FOUND: 'Genres not listed.',
  RATINGS_NOT_FOUND: 'Ratings not listed.',
  BACKGROUND_NOT_FOUND: 'Background not listed.',
  YEAR_NOT_FOUND: 'Year not listed.',
  TRAILER_NOT_FOUND: 'Trailer not listed.',
  STUDIO_NOT_FOUND: 'Studios not listed.',
  RECOMMENDATIONS_NOT_FOUND: 'Recommendations not listed.',
  DESCRIPTION_NOT_FOUND: 'Description not listed.',
  ROLE_NOT_FOUND: 'Role not listed.',
  VA_NOT_FOUND: 'Voice Actor not listed.',
  VOLUMES_NOT_FOUND: 'Volumes not listed.',
  AUTHOR_NOT_FOUND: 'Author not listed.',
  POPULARITY_NOT_FOUND: 'Popularity not listed.',
  SERIAL_NOT_FOUND: 'Serialization not listed.',
  NICKNAMES_NOT_FOUND: 'Nicknames not found.',
  rightArrowText: '⋙',
  leftArrowText: '⋘',
  newImageText: '➕',
};
