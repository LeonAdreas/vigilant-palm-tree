import { HeroCarousel } from "@/components/hero-carousel"
import { HorizontalGameScroll } from "@/components/horizontal-game-scroll"
import { GameGrid } from "@/components/game-grid"
import { fetchGames } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ApiStatusBanner } from "@/components/api-status-banner"
import { GameCard } from "@/components/game-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

async function getRecommendedGames() {
  try {
    const data = await fetchGames({ ordering: "-rating", page_size: "10" })
    return {
      success: true,
      data: data.results || [],
    }
  } catch (error) {
    console.error("Failed to fetch recommended games:", error)
    return {
      success: false,
      error: "Failed to fetch recommended games",
    }
  }
}

async function getHotDeals() {
  try {
    const data = await fetchGames({ ordering: "-metacritic", page_size: "10" })
    return {
      success: true,
      data: data.results || [],
    }
  } catch (error) {
    console.error("Failed to fetch hot deals:", error)
    return {
      success: false,
      error: "Failed to fetch hot deals",
    }
  }
}

async function getNewReleases() {
  try {
    const data = await fetchGames({ ordering: "-released", page_size: "10" })
    return {
      success: true,
      data: data.results || [],
    }
  } catch (error) {
    console.error("Failed to fetch new releases:", error)
    return {
      success: false,
      error: "Failed to fetch new releases",
    }
  }
}

async function getActionGames() {
  try {
    const data = await fetchGames({ genres: "action", page_size: "10" })
    return {
      success: true,
      data: data.results || [],
    }
  } catch (error) {
    console.error("Failed to fetch action games:", error)
    return {
      success: false,
      error: "Failed to fetch action games",
    }
  }
}

async function getRPGGames() {
  try {
    const data = await fetchGames({ genres: "role-playing-games-rpg", page_size: "10" })
    return {
      success: true,
      data: data.results || [],
    }
  } catch (error) {
    console.error("Failed to fetch RPG games:", error)
    return {
      success: false,
      error: "Failed to fetch RPG games",
    }
  }
}

export default async function Home() {
  // Fetch data in parallel
  const [recommendedGamesResult, hotDealsResult, newReleasesResult, actionGamesResult, rpgGamesResult] =
    await Promise.all([getRecommendedGames(), getHotDeals(), getNewReleases(), getActionGames(), getRPGGames()])

  const recommendedGames = recommendedGamesResult.success ? recommendedGamesResult.data : []
  const hotDeals = hotDealsResult.success ? hotDealsResult.data : []
  const newReleases = newReleasesResult.success ? newReleasesResult.data : []
  const actionGames = actionGamesResult.success ? actionGamesResult.data : []
  const rpgGames = rpgGamesResult.success ? rpgGamesResult.data : []

  // Software products similar to the screenshot
  const softwareProducts = [
    {
      id: 1,
      name: "Windows 11 Professional OEM Key",
      image: "/windows11-pro.jpg",
      originalPrice: 259.99,
      price: 20.99,
      discount: 91,
      type: "Digital Key",
    },
    {
      id: 2,
      name: "Adobe Creative Cloud All Apps 1 Month Subscription Key",
      image: "/adobe-cc.jpg",
      originalPrice: 59.99,
      price: 4.8,
      discount: 91,
      type: "Subscription Key",
    },
    {
      id: 3,
      name: "Windows 11 Home OEM Key",
      image: "/windows11-home.jpg",
      originalPrice: 139.99,
      price: 19.85,
      discount: 85,
      type: "Digital Key",
    },
    {
      id: 4,
      name: "ESET Internet Security 2024 Key (1 Year / 1 PC)",
      image: "/eset-security.jpg",
      originalPrice: 39.99,
      price: 7.14,
      discount: 82,
      type: "Digital Key",
    },
    {
      id: 5,
      name: "Windows 11 Professional Online Activation Key",
      image: "/windows11-pro-online.jpg",
      originalPrice: 259.99,
      price: 23.99,
      discount: 90,
      type: "Digital Key",
    },
  ]

  return (
    <div className="bg-[#121212]">
      <div className="container mx-auto px-4 pt-4">
        <ApiStatusBanner />
      </div>

      <HeroCarousel />

      <div className="container mx-auto px-4 py-8">
        {/* Software Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">SOFTWARE</h2>
            <div className="flex items-center">
              <Button variant="outline" className="text-[#ffb81c] border-[#ffb81c] hover:bg-[#ffb81c]/10">
                Show All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {softwareProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#222222] rounded-lg overflow-hidden shadow-md border border-gray-800 hover:border-[#ffb81c] transition-all duration-200"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-800 p-4 flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-[#ffb81c] text-black text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                  <img
                    src={
                      product.image || `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(product.name)}`
                    }
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-400 mb-1 uppercase">{product.type}</div>
                  <h3 className="font-bold text-sm mb-4 line-clamp-2 text-gray-200 hover:text-[#ffb81c]">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-[#ffb81c]">${product.price.toFixed(2)}</span>
                    <span className="text-xs line-through text-gray-500 ml-2">${product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-[#1a1a1a] p-4 rounded-lg">
          <div className="relative w-full md:w-96">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pr-10 rounded-full bg-[#2a2a2a] border-gray-700 text-gray-300"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full text-gray-400 hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button className="bg-[#ffb81c] hover:bg-[#e6a618] text-black">Digital Products</Button>
            <Button variant="outline" className="text-gray-300 border-gray-700 hover:bg-[#2a2a2a]">
              In-game Goods
            </Button>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#ffb81c]">RECOMMENDED FOR YOU</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedGames.slice(0, 4).map((game) => (
              <div key={game.id}>
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </div>

        {/* Hot Deals Section */}
        <HorizontalGameScroll title="HOT DEALS" games={hotDeals} viewAllHref="/hot-deals" />

        {/* New Releases Section */}
        <HorizontalGameScroll title="NEW RELEASES" games={newReleases} viewAllHref="/new-releases" />

        {/* Promotional Banner */}
        <div className="my-12">
          <div className="relative h-32 md:h-40 w-full rounded-lg overflow-hidden shadow-md">
            <img src="/random-keys-savings.png" alt="Special promotion" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Game Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <GameGrid title="ACTION GAMES" games={actionGames.slice(0, 8)} />
          </div>
          <div>
            <GameGrid title="RPG GAMES" games={rpgGames.slice(0, 8)} />
          </div>
        </div>

        {/* Xbox Game Pass Promo */}
        <div className="mb-12">
          <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
            <img src="/game-pass-promo.png" alt="Xbox Game Pass" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">CHECK OUT XBOX GAME PASS</h2>
                <Button className="bg-[#ffb81c] hover:bg-[#e6a618] text-black font-bold">BUY NOW</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
