const API_URL = "https://api.rawg.io/api"
const API_KEY = process.env.RAWG_API_KEY

// Fallback data for when the API is unavailable
const FALLBACK_GAMES = [
  {
    id: 1,
    slug: "grand-theft-auto-v",
    name: "Grand Theft Auto V",
    background_image: "/urban-chaos-sunset.png",
    platforms: [
      { platform: { id: 1, name: "PC", slug: "pc" } },
      { platform: { id: 2, name: "PlayStation", slug: "playstation" } },
      { platform: { id: 3, name: "Xbox", slug: "xbox" } },
    ],
    metacritic: 92,
    released: "2013-09-17",
  },
  {
    id: 2,
    slug: "the-witcher-3-wild-hunt",
    name: "The Witcher 3: Wild Hunt",
    background_image: "/weathered-warrior.png",
    platforms: [
      { platform: { id: 1, name: "PC", slug: "pc" } },
      { platform: { id: 2, name: "PlayStation", slug: "playstation" } },
      { platform: { id: 3, name: "Xbox", slug: "xbox" } },
    ],
    metacritic: 93,
    released: "2015-05-18",
  },
  // Other fallback games...
]

const FALLBACK_GENRES = [
  { id: 4, name: "Action", slug: "action" },
  { id: 3, name: "Adventure", slug: "adventure" },
  { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
  { id: 2, name: "Shooter", slug: "shooter" },
  { id: 7, name: "Puzzle", slug: "puzzle" },
  { id: 1, name: "Racing", slug: "racing" },
  { id: 14, name: "Simulation", slug: "simulation" },
  { id: 15, name: "Sports", slug: "sports" },
  { id: 10, name: "Strategy", slug: "strategy" },
]

const FALLBACK_PLATFORMS = [
  { id: 1, name: "PC", slug: "pc" },
  { id: 2, name: "PlayStation", slug: "playstation" },
  { id: 3, name: "Xbox", slug: "xbox" },
  { id: 7, name: "Nintendo", slug: "nintendo" },
  { id: 8, name: "Android", slug: "android" },
  { id: 9, name: "iOS", slug: "ios" },
]

export async function fetchGames(params: Record<string, string> = {}) {
  try {
    // Check if API key is available
    if (!API_KEY) {
      console.error("RAWG API key is missing. Please check your environment variables.")
      return { results: FALLBACK_GAMES }
    }

    const searchParams = new URLSearchParams({
      key: API_KEY,
      ...params,
    })

    console.log(
      `Fetching games from RAWG API: ${API_URL}/games?${searchParams.toString().replace(API_KEY, "API_KEY_HIDDEN")}`,
    )

    const response = await fetch(`${API_URL}/games?${searchParams.toString()}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/json",
        "User-Agent": "GameKey Marketplace",
      },
    })

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      return { results: FALLBACK_GAMES }
    }

    const data = await response.json()

    // Ensure all games have a background_image property
    if (data.results) {
      data.results = data.results.map((game: any, index: number) => {
        if (!game.background_image) {
          // Generate a placeholder URL if no image is available
          game.background_image = `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(game.name + " game cover")}`
        }
        return game
      })
    }

    return data
  } catch (error) {
    console.error("Failed to fetch games:", error)
    return { results: FALLBACK_GAMES }
  }
}

export async function fetchGenres() {
  try {
    if (!API_KEY) {
      console.error("RAWG API key is missing. Please check your environment variables.")
      return { results: FALLBACK_GENRES }
    }

    const searchParams = new URLSearchParams({
      key: API_KEY,
    })

    const response = await fetch(`${API_URL}/genres?${searchParams.toString()}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
        "User-Agent": "GameKey Marketplace",
      },
    })

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      return { results: FALLBACK_GENRES }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch genres:", error)
    return { results: FALLBACK_GENRES }
  }
}

export async function fetchPlatforms() {
  try {
    if (!API_KEY) {
      console.error("RAWG API key is missing. Please check your environment variables.")
      return { results: FALLBACK_PLATFORMS }
    }

    const searchParams = new URLSearchParams({
      key: API_KEY,
    })

    const response = await fetch(`${API_URL}/platforms?${searchParams.toString()}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
        "User-Agent": "GameKey Marketplace",
      },
    })

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      return { results: FALLBACK_PLATFORMS }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch platforms:", error)
    return { results: FALLBACK_PLATFORMS }
  }
}

export async function searchGames(query: string) {
  try {
    if (!API_KEY) {
      console.error("RAWG API key is missing. Please check your environment variables.")
      return { results: FALLBACK_GAMES }
    }

    const searchParams = new URLSearchParams({
      key: API_KEY,
      search: query,
    })

    const response = await fetch(`${API_URL}/games?${searchParams.toString()}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
        "User-Agent": "GameKey Marketplace",
      },
    })

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      return { results: FALLBACK_GAMES }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to search games:", error)
    return { results: FALLBACK_GAMES }
  }
}

export async function fetchGameDetails(slug: string) {
  try {
    if (!API_KEY) {
      throw new Error("RAWG API key is missing. Please check your environment variables.")
    }

    const searchParams = new URLSearchParams({
      key: API_KEY,
    })

    const response = await fetch(`${API_URL}/games/${slug}?${searchParams.toString()}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
        "User-Agent": "GameKey Marketplace",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Ensure the game has a background_image property
    if (!data.background_image) {
      data.background_image = `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(data.name + " game cover")}`
    }

    return data
  } catch (error) {
    console.error("Failed to fetch game details:", error)
    throw error
  }
}

export async function fetchGameScreenshots(id: number) {
  try {
    if (!API_KEY) {
      throw new Error("RAWG API key is missing. Please check your environment variables.")
    }

    const searchParams = new URLSearchParams({
      key: API_KEY,
    })

    const response = await fetch(`${API_URL}/games/${id}/screenshots?${searchParams.toString()}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
        "User-Agent": "GameKey Marketplace",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Ensure all screenshots have an image property
    if (data.results) {
      data.results = data.results.map((screenshot: any, index: number) => {
        if (!screenshot.image) {
          screenshot.image = `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent("game screenshot " + (index + 1))}`
        }
        return screenshot
      })
    }

    return data
  } catch (error) {
    console.error("Failed to fetch game screenshots:", error)
    throw error
  }
}

export function generateFakePrice() {
  const prices = [9.99, 14.99, 19.99, 29.99, 39.99, 49.99, 59.99]
  return prices[Math.floor(Math.random() * prices.length)]
}

export function generateFakeDiscount() {
  const discounts = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70]
  return discounts[Math.floor(Math.random() * discounts.length)]
}

// Test function to check if API is working
export async function testApiConnection() {
  try {
    if (!API_KEY) {
      return {
        success: false,
        message: "API key is missing. Please check your environment variables.",
      }
    }

    const searchParams = new URLSearchParams({
      key: API_KEY,
    })

    const response = await fetch(`${API_URL}/games?${searchParams.toString()}&page_size=1`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "GameKey Marketplace",
      },
    })

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: `API returned ${response.status}: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data: data,
    }
  } catch (error) {
    return {
      success: false,
      message: `API connection failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
