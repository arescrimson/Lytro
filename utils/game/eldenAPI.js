class EldenSearchAPI {
  constructor() {
    this.cachedData = {}
  }

  async fetchData(apiUrl, cacheKey) {
    if (this.cachedData[cacheKey]) {
      return this.cachedData[cacheKey]
    }

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      this.cachedData[cacheKey] = data

      return data
    } catch (error) {
      console.error('Fetch Error:', error)
      throw error
    }
  }

  async createBossData() {
    const apiUrl = 'https://eldenring.fanapis.com/api/bosses?limit=100'
    const cacheKey = 'bossData'
    return this.fetchData(apiUrl, cacheKey)
  }

  async createLocationsData() {
    const apiUrl = 'https://eldenring.fanapis.com/api/locations?limit=100'
    const cacheKey = 'locationsData'
    return this.fetchData(apiUrl, cacheKey)
  }

  async createNPCData() {
    const apiUrl = 'https://eldenring.fanapis.com/api/npcs?limit=100'
    const cacheKey = 'npcData'
    return this.fetchData(apiUrl, cacheKey)
  }

  async createSpiritData() {
    const apiUrl = 'https://eldenring.fanapis.com/api/spirits?limit=100'
    const cacheKey = 'spiritData'
    return this.fetchData(apiUrl, cacheKey)
  }
}

const eldenAPI = new EldenSearchAPI()

async function getBossData() {
  return await eldenAPI.createBossData()
}

async function getLocationsData() {
  return await eldenAPI.createLocationsData()
}

async function getNPCData() {
  return await eldenAPI.createNPCData()
}

async function getSpiritData() {
  return await eldenAPI.createSpiritData()
}

module.exports = {
  getBossData,
  getLocationsData,
  getNPCData,
  getSpiritData,
}
