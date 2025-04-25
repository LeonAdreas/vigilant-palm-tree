import Image from "next/image"
import { fetchGames } from "@/lib/api"
import { GameGrid } from "@/components/game-grid"
import { HorizontalGameScroll } from "@/components/horizontal-game-scroll"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const revalidate = 3600 // Revalidate every hour

async function getCS2Games() {
  // Fetch games related to Counter-Strike
  try {
    const data = await fetchGames({
      search: "counter-strike",
      page_size: "20",
    })
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch CS2 games:", error)
    return []
  }
}

async function getFPSGames() {
  // Fetch popular FPS games as related content
  try {
    const data = await fetchGames({
      genres: "shooter",
      ordering: "-rating",
      page_size: "10",
    })
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch FPS games:", error)
    return []
  }
}

async function getPopularSkins() {
  // For demo purposes, we'll use some shooter games to represent skins
  try {
    const data = await fetchGames({
      tags: "fps",
      ordering: "-added",
      page_size: "8",
    })
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch popular skins:", error)
    return []
  }
}

export default async function CS2Page() {
  // Fetch all data in parallel
  const [cs2Games, fpsGames, popularSkins] = await Promise.all([getCS2Games(), getFPSGames(), getPopularSkins()])

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/dust-and-firefight.png" alt="CS2 Hero" fill priority sizes="100vw" className="object-cover" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-16">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Official Store
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">Counter-Strike 2</h1>
            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              Get the best deals on CS2 keys, skins, and in-game items. Instant delivery and secure transactions.
            </p>
            <div className="flex gap-4 mt-6">
              <Button asChild size="lg">
                <Link href="#cs2-games">Browse CS2 Keys</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link href="#cs2-skins">Browse Skins</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Featured CS2 Products */}
        <div className="py-12" id="cs2-games">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">CS2 Game Keys</h2>
              <p className="text-muted-foreground mt-2">Official Counter-Strike 2 game keys with instant delivery</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/search?q=counter-strike">View All</Link>
            </Button>
          </div>

          <GameGrid games={cs2Games} emptyMessage="No Counter-Strike games found" />
        </div>

        {/* CS2 Skins Section */}
        <div className="py-12 border-t" id="cs2-skins">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">CS2 Skins & Items</h2>
              <p className="text-muted-foreground mt-2">Rare skins, knives, gloves and other in-game items</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/category/cs2-skins">View All</Link>
            </Button>
          </div>

          {/* Skin Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["Knives", "Gloves", "Rifles", "Pistols"].map((category) => (
              <div key={category} className="relative aspect-[16/9] overflow-hidden rounded-lg group">
                <Image
                  src={`/urban-team.png?height=300&width=500&query=counter-strike ${category.toLowerCase()} skin`}
                  alt={`CS2 ${category}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-white font-bold">{category}</h3>
                    <p className="text-white/80 text-sm">Browse {category}</p>
                  </div>
                </div>
                <Link href={`/category/cs2-skins/${category.toLowerCase()}`} className="absolute inset-0">
                  <span className="sr-only">Browse {category}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Popular Skins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {popularSkins.slice(0, 8).map((skin) => (
              <div key={skin.id} className="bg-card rounded-lg overflow-hidden shadow-md">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {skin.background_image ? (
                    <Image
                      src={skin.background_image || "/placeholder.svg"}
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
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                    -{Math.floor(Math.random() * 50 + 10)}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1 line-clamp-1">{`${skin.name} | Skin`}</h3>
                  <p className="text-xs text-muted-foreground mb-2">Factory New</p>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold">{(Math.random() * 100 + 5).toFixed(2)}€</span>
                    <span className="text-xs line-through text-muted-foreground ml-2">
                      {(Math.random() * 150 + 50).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CS2 Guides Section */}
        <div className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">CS2 Guides & News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "CS2 Beginner's Guide",
                excerpt: "Learn the basics of Counter-Strike 2 and improve your gameplay with our comprehensive guide.",
                image: "counter-strike beginner guide tutorial",
              },
              {
                title: "Best Weapons in CS2",
                excerpt:
                  "Discover the most effective weapons in Counter-Strike 2 for different situations and playstyles.",
                image: "counter-strike weapons guns comparison",
              },
              {
                title: "CS2 Economy Guide",
                excerpt: "Master the economy system in CS2 to maximize your team's chances of winning rounds.",
                image: "counter-strike economy money management",
              },
            ].map((article, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-md">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=300&width=500&query=${article.image}`}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <Button variant="outline" asChild>
                    <Link href="#">Read More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Games */}
        <div className="py-12 border-t">
          <HorizontalGameScroll title="Similar FPS Games" games={fpsGames} viewAllHref="/genre/shooter" />
        </div>

        {/* FAQ Section */}
        <div className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I activate a CS2 key?",
                answer:
                  "To activate your CS2 key, open Steam, click on 'Games' in the top menu, select 'Activate a Product on Steam', and follow the instructions to enter your key.",
              },
              {
                question: "Are the CS2 keys region-locked?",
                answer:
                  "Some CS2 keys may be region-locked. Please check the product description for any region restrictions before purchasing.",
              },
              {
                question: "How do I receive my CS2 key after purchase?",
                answer:
                  "After completing your purchase, your CS2 key will be delivered instantly to your email address and will also be available in your account dashboard.",
              },
              {
                question: "Can I trade or sell my CS2 skins?",
                answer:
                  "Yes, CS2 skins can be traded or sold through Steam or third-party marketplaces. Make sure to follow Steam's trading guidelines.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
