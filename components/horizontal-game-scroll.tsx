"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface HorizontalGameScrollProps {
  title: string
  games: Game[]
  viewAllHref?: string
}

export function HorizontalGameScroll({ title, games, viewAllHref }: HorizontalGameScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleImageError = (gameId: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [gameId]: true,
    }))
  }

  if (!games || games.length === 0) {
    return null
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={scrollLeft}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollRight}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          {viewAllHref && (
            <Button variant="outline" asChild>
              <Link href={viewAllHref}>View All</Link>
            </Button>
          )}
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {games.map((game) => (
          <div key={game.id} className="min-w-[250px] max-w-[250px] snap-start">
            <Link href={`/game/${game.slug}`} className="group">
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
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-green-600">{game.name}</h3>

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
          </div>
        ))}
      </div>
    </div>
  )
}
