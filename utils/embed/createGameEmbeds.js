const { createBaseEmbed } = require('../embed/createBaseEmbed')
const { ICON_URL } = require('../../config')

function createSteamGameEmbed(
  gameTitle,
  gameURL,
  playerCount,
  summary,
  price,
  devs,
  genres,
  score,
  categories,
  image,
  publishers,
  recs,
  releaseDate,
) {
  const embed = createBaseEmbed()
  if (gameURL) embed.setURL(`${gameURL}`)

  embed
    .setTitle(`${gameTitle}`)
    .setAuthor({
      name: `Searching Steam Game: ${gameTitle}`,
      iconURL: ICON_URL,
    })
    .setThumbnail(`${image}`)
    .addFields(
      { name: 'Summary: \n\u200b', value: `${summary}\n\u200b` },

      { name: 'Developers:', value: `${devs}`, inline: true },
      { name: 'Publishers:', value: `${publishers}`, inline: true },
      { name: 'Release Date:', value: `${releaseDate}`, inline: true },
      { name: 'Genres:', value: `${categories}`, inline: true },
      { name: 'Categories:', value: `${genres}`, inline: true },
      { name: 'Current Price:', value: `${price}`, inline: true },
      { name: 'Recommends:', value: `${recs}`, inline: true },
      { name: 'Metacritic Score:', value: `${score}`, inline: true },
      { name: 'Player Count:', value: `${playerCount}`, inline: true },
    )
    .setImage(`${image}`)

  return embed
}

function createEldenBossEmbed(
  name,
  image,
  region,
  description,
  location,
  hp,
  drops,
) {
  const embed = createBaseEmbed()

  if (image) embed.setImage(`${image}`).setThumbnail(`${image}`)

  embed
    .setTitle(`${name}`)
    .setAuthor({
      name: `Searching Elden Ring Boss: ${name}`,
      iconURL: ICON_URL,
    })
    .addFields(
      { name: 'Description: \n\u200b', value: `${description}\n\u200b` },
      { name: 'Region:', value: `${region}`, inline: true },
      { name: 'Location:', value: `${location}`, inline: true },
      { name: 'Hitpoints:', value: `${hp}`, inline: true },
      { name: 'Drops:', value: `${drops}`, inline: true },
    )

  return embed
}

function createEldenLocationEmbed(name, image, region, description) {
  const embed = createBaseEmbed()

  if (image) embed.setImage(`${image}`).setThumbnail(`${image}`)

  embed
    .setTitle(`${name}`)
    .setAuthor({
      name: `Searching Elden Ring Location: ${name}`,
      iconURL: ICON_URL,
    })
    .addFields(
      { name: 'Description: \n\u200b', value: `${description}\n\u200b` },
      { name: 'Region:', value: `${region}`, inline: true },
    )

  return embed
}

function createEldenNPCEmbed(name, image, quote, location, role) {
  const embed = createBaseEmbed()

  if (image) embed.setImage(`${image}`).setThumbnail(`${image}`)

  embed
    .setTitle(`${name}`)
    .setAuthor({
      name: `Searching Elden Ring NPC: ${name}`,
      iconURL: ICON_URL,
    })
    .addFields(
      { name: 'Quote: \n\u200b', value: `${quote}\n\u200b` },
      { name: 'Location:', value: `${location}`, inline: true },
      { name: 'Role:', value: `${role}`, inline: true },
    )

  return embed
}

function createEldenSpritEmbed(
  name,
  image,
  description,
  fpCost,
  hpCost,
  effect,
) {
  const embed = createBaseEmbed()

  if (image) embed.setImage(`${image}`).setThumbnail(`${image}`)

  embed
    .setTitle(`${name}`)
    .setAuthor({
      name: `Searching Elden Ring Spirits: ${name}`,
      iconURL: ICON_URL,
    })
    .addFields(
      { name: 'Description: \n\u200b', value: `${description}\n\u200b` },
      { name: 'FP Cost:', value: `${fpCost}`, inline: true },
      { name: 'HP Cost:', value: `${hpCost}`, inline: true },
      { name: 'Effect:', value: `${effect}`, inline: true },
    )

  return embed
}

module.exports = {
  createSteamGameEmbed,
  createEldenBossEmbed,
  createEldenLocationEmbed,
  createEldenNPCEmbed,
  createEldenSpritEmbed,
}
