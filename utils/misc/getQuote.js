require('dotenv').config()
const { QUOTE_URL, QUOTE_TOKEN } = require('../../config')
const { createEmbedQuote } = require('../embed/createEmbeds')

/**
 * Gets data object from a quote API.
 *
 * @returns {Promise<Object>} A promise that resolves to the quote data.
 */
async function getQuote() {
  try {
    const response = await fetch(QUOTE_URL, {
      headers: {
        Authorization: QUOTE_TOKEN,
      },
    })

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status)
    }

    const data = await response.json()

    const quoteEmbed = createEmbedQuote(data.author, data.quote, data.anime)

    return quoteEmbed
  } catch (err) {
    console.error('Error: ' + err.message)
  }
}

module.exports = {
  getQuote,
}
