"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Game {
  id: number
  slug: string
  name: string
  background_image: string
  platforms: Array<{
    platform: {
      id: number
      name: string
      slug: string
    }
  }>
  metacritic?: number
  released?: string
}

interface GameGridProps {
  games: Game[]
  title?: string
  emptyMessage?: string
}

export function GameGrid({ games, title, emptyMessage = "No games found" }: GameGridProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const handleImageError = (gameId: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [gameId]: true,
    }))
  }

  if (!games || games.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={`/game/${game.slug}`} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-all duration-200 h-full flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                {!imageErrors[game.id] && game.background_image ? (
                  <img
                    src={game.background_image || "/placeholder.svg"}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(game.id)}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      backgroundColor: `hsl(${(game.id * 40) % 360}, 70%, 60%)`,
                    }}
                  >
                    <span className="text-white font-medium text-sm px-2 text-center">{game.name}</span>
                  </div>
                )}

                {/* Metacritic score */}
                {game.metacritic && (
                  <div
                    className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                      game.metacritic >= 75
                        ? "bg-green-500 text-white"
                        : game.metacritic >= 50
                          ? "bg-yellow-500 text-black"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {game.metacritic}
                  </div>
                )}
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-green-600">{game.name}</h3>

                {/* Platform badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {game.platforms &&
                    game.platforms.slice(0, 3).map(({ platform }) => (
                      <Badge key={platform.id} variant="outline" className="text-xs bg-gray-100">
                        {platform.name}
                      </Badge>
                    ))}
                  {game.platforms && game.platforms.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-gray-100">
                      +{game.platforms.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Generate fake price and discount */}
                <div className="mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-green-600">
                      ${((Math.random() * 50 + 10) * 0.8).toFixed(2)}
                    </span>
                    <span className="text-xs line-through text-gray-500 ml-2">
                      ${(Math.random() * 50 + 10).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
