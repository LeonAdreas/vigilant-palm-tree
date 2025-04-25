import { notFound } from "next/navigation"
import { fetchGames, fetchGenres } from "@/lib/api"
import { GameGrid } from "@/components/game-grid"
import Image from "next/image"

interface GenrePageProps {
  params: {
    slug: string
  }
}

export default async function GenrePage({ params }: GenrePageProps) {
  try {
    // Get genre details
    const genresData = await fetchGenres()
    const genre = genresData.results.find((g: any) => g.slug === params.slug)

    if (!genre) {
      notFound()
    }

    // Get games for this genre
    const gamesData = await fetchGames({ genres: params.slug, page_size: "20" })
    const games = gamesData.results || []

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
          {genre.image_background && (
            <div className="relative w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
              <Image
                src={genre.image_background || "/placeholder.svg"}
                alt={genre.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{genre.name} Games</h1>
            <p className="text-muted-foreground mb-4">{genre.games_count.toLocaleString()} games</p>
            {genre.description && (
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: genre.description }} />
            )}
          </div>
        </div>

        <GameGrid games={games} emptyMessage={`No ${genre.name} games found`} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching genre:", error)
    notFound()
  }
}
