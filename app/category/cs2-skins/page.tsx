import Image from "next/image"
import Link from "next/link"
import { fetchGames } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const revalidate = 3600 // Revalidate every hour

// This is a mock function since RAWG doesn't have CS2 skins
// In a real app, you'd have a dedicated API for skins
async function getCS2Skins() {
  try {
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
      type: ["Knife", "Rifle", "Pistol", "SMG", "Sniper", "Gloves"][Math.floor(Math.random() * 6)],
      wear: ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred"][
        Math.floor(Math.random() * 5)
      ],
      price: (Math.random() * 500 + 10).toFixed(2),
      originalPrice: (Math.random() * 700 + 50).toFixed(2),
      discount: Math.floor(Math.random() * 70 + 5),
      rarity: ["Common", "Uncommon", "Rare", "Mythical", "Legendary", "Ancient", "Immortal"][
        Math.floor(Math.random() * 7)
      ],
    }))
  } catch (error) {
    console.error("Failed to fetch CS2 skins:", error)
    return []
  }
}

export default async function CS2SkinsPage() {
  const skins = await getCS2Skins()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-8">
        <div className="md:w-64 w-full">
          <h1 className="text-3xl font-bold mb-6">CS2 Skins</h1>

          {/* Filters */}
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="font-semibold mb-4">Filters</h2>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="text-sm font-medium block mb-2">
                  Search
                </label>
                <Input id="search" placeholder="Search skins..." />
              </div>

              {/* Type */}
              <div>
                <label htmlFor="type" className="text-sm font-medium block mb-2">
                  Type
                </label>
                <select
                  id="type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">All Types</option>
                  <option value="knife">Knives</option>
                  <option value="rifle">Rifles</option>
                  <option value="pistol">Pistols</option>
                  <option value="smg">SMGs</option>
                  <option value="sniper">Snipers</option>
                  <option value="gloves">Gloves</option>
                </select>
              </div>

              {/* Wear */}
              <div>
                <label htmlFor="wear" className="text-sm font-medium block mb-2">
                  Wear
                </label>
                <select
                  id="wear"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">All Wear Levels</option>
                  <option value="fn">Factory New</option>
                  <option value="mw">Minimal Wear</option>
                  <option value="ft">Field-Tested</option>
                  <option value="ww">Well-Worn</option>
                  <option value="bs">Battle-Scarred</option>
                </select>
              </div>

              {/* Rarity */}
              <div>
                <label htmlFor="rarity" className="text-sm font-medium block mb-2">
                  Rarity
                </label>
                <select
                  id="rarity"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="mythical">Mythical</option>
                  <option value="legendary">Legendary</option>
                  <option value="ancient">Ancient</option>
                  <option value="immortal">Immortal</option>
                </select>
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
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-[180px]"
              defaultValue="popular"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="discount">Biggest Discount</option>
            </select>
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
                      {skin.type}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3">{skin.wear}</p>

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

      {/* Popular Collections */}
      <div className="mt-12 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Popular Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "AK-47 Collection", image: "counter-strike ak47 skin collection" },
            { name: "Knife Collection", image: "counter-strike knife skin collection" },
            { name: "AWP Collection", image: "counter-strike awp sniper skin collection" },
            { name: "Glove Collection", image: "counter-strike glove skin collection" },
          ].map((collection, index) => (
            <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src={`/abstract-geometric-shapes.png?height=300&width=400&query=${collection.image}`}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white font-bold">{collection.name}</h3>
                  <p className="text-white/80 text-sm">View Collection</p>
                </div>
              </div>
              <Link href="#" className="absolute inset-0">
                <span className="sr-only">View {collection.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
