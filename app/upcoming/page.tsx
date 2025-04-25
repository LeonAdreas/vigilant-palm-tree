import { fetchGames } from "@/lib/api"
import { GameGrid } from "@/components/game-grid"

export default async function UpcomingPage() {
  try {
    // Get upcoming games (released in the future)
    const currentDate = new Date().toISOString().split("T")[0] // YYYY-MM-DD
    const gamesData = await fetchGames({
      dates: `${currentDate},2030-12-31`,
      ordering: "released",
      page_size: "20",
    })
    const games = gamesData.results || []

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Upcoming Releases</h1>
        <p className="text-muted-foreground mb-8">Pre-order upcoming games and be ready on day one</p>

        <GameGrid games={games} emptyMessage="No upcoming games found" />
      </div>
    )
  } catch (error) {
    console.error("Error fetching upcoming games:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Upcoming Releases</h1>
        <p className="text-red-500">An error occurred while fetching upcoming games. Please try again.</p>
      </div>
    )
  }
}
