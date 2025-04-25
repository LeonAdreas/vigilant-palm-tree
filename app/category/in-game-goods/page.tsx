import Image from "next/image"
import Link from "next/link"
import { fetchGames } from "@/lib/api"

export const revalidate = 3600 // Revalidate every hour

async function getInGameItems() {
  try {
    // Since RAWG doesn't have in-game items, we'll use some games as placeholders
    const data = await fetchGames({
      ordering: "-added",
      page_size: "12",
    })
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch in-game items:", error)
    return []
  }
}

export default async function InGameGoodsPage() {
  const items = await getInGameItems()

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/virtual-armory.png"
            alt="In-Game Goods"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">IN-GAME GOODS</h1>
            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              Enhance your gaming experience with skins, weapons, items, and more for your favorite games.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "CS2 Skins", image: "counter-strike skins knives", link: "/category/cs2-skins" },
              { name: "Fortnite V-Bucks", image: "fortnite v-bucks currency", link: "#" },
              { name: "Roblox Robux", image: "roblox robux currency", link: "#" },
              { name: "FIFA Ultimate Team", image: "fifa ultimate team cards", link: "#" },
              { name: "Valorant Points", image: "valorant points currency", link: "#" },
              { name: "Minecraft Items", image: "minecraft items blocks", link: "#" },
              { name: "GTA Online", image: "gta online shark cards", link: "#" },
              { name: "Apex Legends", image: "apex legends coins", link: "#" },
            ].map((category, index) => (
              <Link href={category.link} key={index} className="group">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=300&width=300&query=${category.image}`}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-lg font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Items */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.slice(0, 12).map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md border">
                <div className="relative aspect-square overflow-hidden">
                  {item.background_image ? (
                    <Image
                      src={item.background_image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.onerror = null
                        target.src = `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(item.name + " game item")}`
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded">
                    -{Math.floor(Math.random() * 50 + 10)}%
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                  <div className="text-xs text-gray-500 mb-1">Virtual Item</div>
                  <div className="flex items-baseline">
                    <span className="text-base font-bold text-blue-600">${(Math.random() * 20 + 1).toFixed(2)}</span>
                    <span className="text-xs line-through text-gray-500 ml-2">
                      ${(Math.random() * 30 + 10).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Buy From Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Buy In-Game Items From Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-amber-500 text-3xl font-bold mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
              <p className="text-gray-600">
                Get your in-game items delivered instantly to your account after purchase.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-amber-500 text-3xl font-bold mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">All purchases are protected with industry-standard security measures.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-amber-500 text-3xl font-bold mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is available around the clock to assist you.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">How do I receive my in-game items?</h3>
              <p className="text-gray-600">
                After purchase, you'll receive a code or direct account credit depending on the game. Instructions will
                be provided for each specific item.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Are these items region-locked?</h3>
              <p className="text-gray-600">
                Some in-game items may be region-specific. Please check the product description for any regional
                restrictions before purchasing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">What if I don't receive my item?</h3>
              <p className="text-gray-600">
                If you don't receive your item immediately after purchase, please contact our 24/7 customer support team
                for assistance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
