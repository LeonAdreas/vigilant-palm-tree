import { GameGrid } from "@/components/game-grid"
import { searchGames } from "@/lib/api"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search</h1>
        <p className="text-muted-foreground">Please enter a search term.</p>
      </div>
    )
  }

  try {
    const data = await searchGames(query)
    const games = data.results || []

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">
          Found {games.length} results for "{query}"
        </p>

        <GameGrid games={games} emptyMessage={`No games found for "${query}"`} />
      </div>
    )
  } catch (error) {
    console.error("Error searching games:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>
        <p className="text-red-500">An error occurred while searching. Please try again.</p>
      </div>
    )
  }
}
