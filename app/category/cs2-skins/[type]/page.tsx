import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchGames } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const revalidate = 3600 // Revalidate every hour

interface SkinTypePageProps {
  params: {
    type: string
  }
}

// This is a mock function since RAWG doesn't have CS2 skins
// In a real app, you'd have a dedicated API for skins
async function getCS2SkinsByType(type: string) {
  // We'll use shooter games as stand-ins for skins
  const data = await fetchGames({
    genres: "shooter",
    ordering: "-added",
    page_size: "20",
  })

  // Transform the data to look like skins
  return data.results.map((game: any) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    type: type.charAt(0).toUpperCase() + type.slice(1),
    wear: ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred"][Math.floor(Math.random() * 5)],
    price: (Math.random() * 500 + 10).toFixed(2),
    originalPrice: (Math.random() * 700 + 50).toFixed(2),
    discount: Math.floor(Math.random() * 70 + 5),
    rarity: ["Common", "Uncommon", "Rare", "Mythical", "Legendary", "Ancient", "Immortal"][
      Math.floor(Math.random() * 7)
    ],
  }))
}

export default async function SkinTypePage({ params }: SkinTypePageProps) {
  const validTypes = ["knives", "gloves", "rifles", "pistols", "smgs", "snipers"]

  if (!validTypes.includes(params.type)) {
    notFound()
  }

  const skins = await getCS2SkinsByType(params.type)
  const typeTitle = params.type.charAt(0).toUpperCase() + params.type.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/category/cs2" className="hover:text-foreground">
          CS2
        </Link>
        <span>/</span>
        <Link href="/category/cs2-skins" className="hover:text-foreground">
          Skins
        </Link>
        <span>/</span>
        <span className="text-foreground">{typeTitle}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="md:w-64 w-full">
          <h1 className="text-3xl font-bold mb-6">CS2 {typeTitle}</h1>

          {/* Filters */}
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="font-semibold mb-4">Filters</h2>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="text-sm font-medium block mb-2">
                  Search
                </label>
                <Input id="search" placeholder={`Search ${typeTitle.toLowerCase()}...`} />
              </div>

              {/* Collections - specific to the type */}
              <div>
                <label htmlFor="collection" className="text-sm font-medium block mb-2">
                  Collection
                </label>
                <Select>
                  <SelectTrigger id="collection">
                    <SelectValue placeholder="All Collections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Collections</SelectItem>
                    <SelectItem value="gamma">Gamma Collection</SelectItem>
                    <SelectItem value="chroma">Chroma Collection</SelectItem>
                    <SelectItem value="spectrum">Spectrum Collection</SelectItem>
                    <SelectItem value="clutch">Clutch Collection</SelectItem>
                    <SelectItem value="operation">Operation Collection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Wear */}
              <div>
                <label htmlFor="wear" className="text-sm font-medium block mb-2">
                  Wear
                </label>
                <Select>
                  <SelectTrigger id="wear">
                    <SelectValue placeholder="All Wear Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Wear Levels</SelectItem>
                    <SelectItem value="fn">Factory New</SelectItem>
                    <SelectItem value="mw">Minimal Wear</SelectItem>
                    <SelectItem value="ft">Field-Tested</SelectItem>
                    <SelectItem value="ww">Well-Worn</SelectItem>
                    <SelectItem value="bs">Battle-Scarred</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rarity */}
              <div>
                <label htmlFor="rarity" className="text-sm font-medium block mb-2">
                  Rarity
                </label>
                <Select>
                  <SelectTrigger id="rarity">
                    <SelectValue placeholder="All Rarities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rarities</SelectItem>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="mythical">Mythical</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                    <SelectItem value="ancient">Ancient</SelectItem>
                    <SelectItem value="immortal">Immortal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium block mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <Input placeholder="Min" type="number" className="w-full" />
                  <span>-</span>
                  <Input placeholder="Max" type="number" className="w-full" />
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </div>

        {/* Skins Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">Showing {skins.length} results</p>
            <Select defaultValue="popular">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skins.map((skin) => (
              <div key={skin.id} className="bg-card rounded-lg overflow-hidden shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  {skin.image ? (
                    <Image
                      src={skin.image || "/placeholder.svg"}
                      alt={skin.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                    -{skin.discount}%
                  </div>

                  {/* Rarity indicator */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${
                      skin.rarity === "Common"
                        ? "bg-gray-400"
                        : skin.rarity === "Uncommon"
                          ? "bg-blue-400"
                          : skin.rarity === "Rare"
                            ? "bg-purple-500"
                            : skin.rarity === "Mythical"
                              ? "bg-pink-500"
                              : skin.rarity === "Legendary"
                                ? "bg-amber-500"
                                : skin.rarity === "Ancient"
                                  ? "bg-red-600"
                                  : "bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
                    }`}
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm line-clamp-1">{skin.name}</h3>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                      {skin.wear}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3">{skin.rarity}</p>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-bold">{skin.price}€</span>
                      <span className="text-xs line-through text-muted-foreground ml-2">{skin.originalPrice}€</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Information */}
      <div className="mt-12 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">About CS2 {typeTitle}</h2>
        <div className="prose max-w-none">
          <p>
            Counter-Strike 2 features a wide variety of {params.type} with different designs, patterns, and rarities.
            These cosmetic items don't affect gameplay but are highly sought after by collectors and enthusiasts.
          </p>

          {params.type === "knives" && (
            <>
              <p>
                Knives are among the most valuable and rare items in CS2. They come in various styles including
                Karambit, Butterfly, M9 Bayonet, and many more. Each knife can have different finishes and patterns,
                with some rare combinations fetching extremely high prices in the marketplace.
              </p>
              <h3>Popular Knife Types:</h3>
              <ul>
                <li>Karambit</li>
                <li>Butterfly Knife</li>
                <li>M9 Bayonet</li>
                <li>Flip Knife</li>
                <li>Huntsman Knife</li>
              </ul>
            </>
          )}

          {params.type === "gloves" && (
            <>
              <p>
                Gloves were introduced to CS:GO in 2016 and have carried over to CS2. They're considered prestige items
                and come in various styles and patterns. Like knives, they're rare drops from specific cases.
              </p>
              <h3>Popular Glove Types:</h3>
              <ul>
                <li>Sport Gloves</li>
                <li>Driver Gloves</li>
                <li>Specialist Gloves</li>
                <li>Moto Gloves</li>
                <li>Bloodhound Gloves</li>
              </ul>
            </>
          )}

          {params.type === "rifles" && (
            <>
              <p>
                Rifles are the most commonly used weapons in competitive CS2 play. The AK-47 and M4A4/M4A1-S are the
                primary rifles for the Terrorist and Counter-Terrorist sides respectively, and their skins are among the
                most popular in the game.
              </p>
              <h3>Popular Rifle Skins:</h3>
              <ul>
                <li>AK-47 | Asiimov</li>
                <li>M4A4 | Howl</li>
                <li>AK-47 | Fire Serpent</li>
                <li>M4A1-S | Hyper Beast</li>
                <li>AUG | Bengal Tiger</li>
              </ul>
            </>
          )}

          {params.type === "pistols" && (
            <>
              <p>
                Pistols are secondary weapons in CS2 that players start with in each round. Despite being less powerful
                than rifles, they play a crucial role in eco rounds and force buys. The Desert Eagle (Deagle) is
                particularly popular due to its high damage output.
              </p>
              <h3>Popular Pistol Skins:</h3>
              <ul>
                <li>Desert Eagle | Blaze</li>
                <li>USP-S | Kill Confirmed</li>
                <li>Glock-18 | Fade</li>
                <li>Five-SeveN | Case Hardened</li>
                <li>P250 | Asiimov</li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Market Trends */}
      <div className="mt-12 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Market Trends</h2>
        <div className="bg-card rounded-lg p-6 shadow-md">
          <p className="mb-4">
            CS2 {typeTitle} prices fluctuate based on popularity, rarity, and market demand. Here are the current
            trends:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Rising in Value</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Fade Collection</span>
                  <span className="text-green-500">+12%</span>
                </li>
                <li className="flex justify-between">
                  <span>Doppler Gems</span>
                  <span className="text-green-500">+8%</span>
                </li>
                <li className="flex justify-between">
                  <span>StatTrak™ Items</span>
                  <span className="text-green-500">+5%</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Stable Value</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Vanilla Items</span>
                  <span>±0%</span>
                </li>
                <li className="flex justify-between">
                  <span>Case Hardened</span>
                  <span>±1%</span>
                </li>
                <li className="flex justify-between">
                  <span>Gamma Doppler</span>
                  <span>±2%</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Decreasing in Value</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Safari Mesh</span>
                  <span className="text-red-500">-7%</span>
                </li>
                <li className="flex justify-between">
                  <span>Forest DDPAT</span>
                  <span className="text-red-500">-5%</span>
                </li>
                <li className="flex justify-between">
                  <span>Urban Masked</span>
                  <span className="text-red-500">-3%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
