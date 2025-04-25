"use client"

import Link from "next/link"
import { useState } from "react"
import { generateFakePrice, generateFakeDiscount } from "@/lib/api"
import { Badge } from "@/components/ui/badge"

interface Platform {
  platform: {
    id: number
    name: string
    slug: string
  }
}

interface GameCardProps {
  id: number
  slug: string
  name: string
  background_image: string
  platforms: Platform[]
  metacritic?: number
  released?: string
}

export function GameCard({ id, slug, name, background_image, platforms, metacritic }: GameCardProps) {
  const [imageError, setImageError] = useState(false)

  // Generate fake price and discount
  const originalPrice = generateFakePrice()
  const discountPercentage = generateFakeDiscount()
  const discountedPrice = ((originalPrice * (100 - discountPercentage)) / 100).toFixed(2)

  // Get primary platform (for tag)
  const primaryPlatform = platforms && platforms.length > 0 ? platforms[0].platform.name : "PC"

  // Determine key type based on platform
  const keyType = primaryPlatform.toLowerCase().includes("playstation")
    ? "PSN Key"
    : primaryPlatform.toLowerCase().includes("xbox")
      ? "Xbox Key"
      : primaryPlatform.toLowerCase().includes("nintendo")
        ? "Nintendo Key"
        : "Steam Key"

  return (
    <Link href={`/game/${slug}`} className="group">
      <div className="bg-[#222222] rounded-lg overflow-hidden shadow-md border border-gray-800 hover:border-[#ffb81c] transition-all duration-200 h-full flex flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-800">
          {!imageError && background_image ? (
            <img
              src={background_image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundColor: `hsl(${(id * 40) % 360}, 70%, 60%)`,
              }}
            >
              <span className="text-white font-medium text-sm px-2 text-center">{name}</span>
            </div>
          )}

          {/* Discount badge */}
          <div className="absolute top-2 left-2 bg-[#ffb81c] text-black text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>

          {/* Metacritic score */}
          {metacritic && (
            <div
              className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                metacritic >= 75
                  ? "bg-green-500 text-white"
                  : metacritic >= 50
                    ? "bg-yellow-500 text-black"
                    : "bg-red-500 text-white"
              }`}
            >
              {metacritic}
            </div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <div className="text-xs text-gray-400 mb-1 uppercase">{keyType}</div>
          <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-200 group-hover:text-[#ffb81c]">{name}</h3>

          {/* Platform badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {platforms &&
              platforms.slice(0, 3).map(({ platform }) => (
                <Badge
                  key={platform.id}
                  variant="outline"
                  className="text-xs bg-[#2a2a2a] text-gray-300 border-gray-700"
                >
                  {platform.name}
                </Badge>
              ))}
            {platforms && platforms.length > 3 && (
              <Badge variant="outline" className="text-xs bg-[#2a2a2a] text-gray-300 border-gray-700">
                +{platforms.length - 3}
              </Badge>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-[#ffb81c]">${discountedPrice}</span>
              <span className="text-xs line-through text-gray-500 ml-2">${originalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
