import { notFound } from "next/navigation"
import { fetchGames, fetchPlatforms } from "@/lib/api"
import { GameGrid } from "@/components/game-grid"

interface PlatformPageProps {
  params: {
    id: string
  }
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  try {
    // Get platform details
    const platformsData = await fetchPlatforms()
    const platform = platformsData.results.find((p: any) => p.id.toString() === params.id)

    if (!platform) {
      notFound()
    }

    // Get games for this platform
    const gamesData = await fetchGames({ parent_platforms: params.id, page_size: "20" })
    const games = gamesData.results || []

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{platform.name} Games</h1>
        <p className="text-muted-foreground mb-8">Browse our collection of {platform.name} games</p>

        <GameGrid games={games} emptyMessage={`No ${platform.name} games found`} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching platform:", error)
    notFound()
  }
}
