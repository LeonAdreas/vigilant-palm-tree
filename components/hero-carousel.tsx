"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchGames } from "@/lib/api"
import { SimplePlaceholder } from "./simple-placeholder"

interface Game {
  id: number
  slug: string
  name: string
  background_image: string
  genres: Array<{ id: number; name: string; slug: string }>
}

export function HeroCarousel() {
  const [games, setGames] = useState<Game[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function loadFeaturedGames() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchGames({ ordering: "-added", page_size: "5" })

        if (!data || !data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid data format received from API")
        }

        setGames(data.results)
      } catch (error) {
        console.error("Failed to load featured games:", error)
        setError("Failed to load featured games. Using fallback data.")

        // Fallback data if API fails
        setGames([
          {
            id: 1,
            slug: "elder-scrolls-iv-oblivion",
            name: "The Elder Scrolls IV: Oblivion Remastered",
            background_image: "/placeholder.svg?key=lk5lg",
            genres: [{ id: 5, name: "RPG", slug: "role-playing-games-rpg" }],
          },
          {
            id: 2,
            slug: "expedition-33",
            name: "Expedition 33",
            background_image: "/placeholder.svg?key=p1uhd",
            genres: [{ id: 3, name: "Adventure", slug: "adventure" }],
          },
          {
            id: 3,
            slug: "ea-sports-fc-25",
            name: "EA SPORTS FC 25",
            background_image: "/placeholder.svg?key=mhyi6",
            genres: [{ id: 15, name: "Sports", slug: "sports" }],
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadFeaturedGames()

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleImageError = (gameId: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [gameId]: true,
    }))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length)
  }

  // Auto-advance slides
  useEffect(() => {
    if (games.length === 0) return

    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [games.length])

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-gray-800 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading featured games...</div>
      </div>
    )
  }

  if (games.length === 0) {
    return null
  }

  const currentGame = games[currentIndex]

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full bg-gray-800">
        {!imageErrors[currentGame.id] && currentGame.background_image ? (
          <img
            key={`hero-image-${currentGame.id}`}
            src={currentGame.background_image || "/placeholder.svg"}
            alt={currentGame.name}
            className="w-full h-full object-cover"
            onError={() => handleImageError(currentGame.id)}
          />
        ) : (
          <SimplePlaceholder key={`hero-placeholder-${currentGame.id}`} text={currentGame.name} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-16">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {currentGame.genres?.slice(0, 3).map((genre) => (
              <Badge key={genre.id} variant="secondary" className="bg-[#2a2a2a]/80 text-gray-200 border-gray-700">
                {genre.name}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">{currentGame.name}</h1>

          <div className="flex gap-4 mt-6">
            <Button asChild size="lg" className="bg-[#ffb81c] hover:bg-[#e6a618] text-black font-bold">
              <Link href={`/game/${currentGame.slug}`}>BUY NOW</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              View Details
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows - Fixed styling to make them more visible */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12 shadow-lg"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12 shadow-lg"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {games.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-[#ffb81c]" : "w-2 bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
