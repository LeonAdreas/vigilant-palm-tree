import { notFound } from "next/navigation"
import { fetchGameDetails, fetchGameScreenshots, fetchGames } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HorizontalGameScroll } from "@/components/horizontal-game-scroll"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateFakePrice, generateFakeDiscount } from "@/lib/api"

export const revalidate = 3600 // Revalidate every hour

interface GameParams {
  params: {
    slug: string
  }
}

export default async function GamePage({ params }: GameParams) {
  try {
    const game = await fetchGameDetails(params.slug)
    const screenshotsData = await fetchGameScreenshots(game.id)
    const screenshots = screenshotsData.results || []

    // Get similar games
    const similarGamesData = await fetchGames({
      genres: game.genres?.map((g: any) => g.id).join(","),
      exclude_games: game.id.toString(),
      page_size: "6",
    })
    const similarGames = similarGamesData.results || []

    // Generate fake price and discount
    const originalPrice = generateFakePrice()
    const discountPercentage = generateFakeDiscount()
    const discountedPrice = ((originalPrice * (100 - discountPercentage)) / 100).toFixed(2)

    // Get primary platform (for key type)
    const primaryPlatform = game.platforms && game.platforms.length > 0 ? game.platforms[0].platform.name : "PC"

    // Determine key type based on platform
    const keyType = primaryPlatform.toLowerCase().includes("playstation")
      ? "PSN Key"
      : primaryPlatform.toLowerCase().includes("xbox")
        ? "Xbox Key"
        : primaryPlatform.toLowerCase().includes("nintendo")
          ? "Nintendo Key"
          : "Steam Key"

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Game info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {game.genres?.map((genre: any) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Main image */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
              {game.background_image ? (
                <img
                  src={game.background_image || "/placeholder.svg"}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Screenshots</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {screenshots.map((screenshot: any) => (
                    <div key={screenshot.id} className="relative aspect-video rounded-lg overflow-hidden">
                      <img
                        src={screenshot.image || "/placeholder.svg"}
                        alt={`${game.name} screenshot`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs for description and details */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="requirements">System Requirements</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose prose-sm max-w-none">
                  <p>{game.description_raw}</p>
                </div>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Release Date</h3>
                    <p>{game.released || "Unknown"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Developer</h3>
                    <p>{game.developers?.map((d: any) => d.name).join(", ") || "Unknown"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Publisher</h3>
                    <p>{game.publishers?.map((p: any) => p.name).join(", ") || "Unknown"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Platforms</h3>
                    <p>{game.platforms?.map((p: any) => p.platform.name).join(", ") || "Unknown"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Metacritic</h3>
                    <p>{game.metacritic || "Not rated"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">ESRB Rating</h3>
                    <p>{game.esrb_rating?.name || "Not rated"}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="requirements" className="mt-4">
                <div className="prose prose-sm max-w-none">
                  {game.platforms?.find((p: any) => p.platform.slug === "pc")?.requirements?.minimum ? (
                    <>
                      <h3>Minimum Requirements</h3>
                      <p>{game.platforms.find((p: any) => p.platform.slug === "pc").requirements.minimum}</p>

                      {game.platforms.find((p: any) => p.platform.slug === "pc").requirements.recommended && (
                        <>
                          <h3>Recommended Requirements</h3>
                          <p>{game.platforms.find((p: any) => p.platform.slug === "pc").requirements.recommended}</p>
                        </>
                      )}
                    </>
                  ) : (
                    <p>System requirements not available.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Purchase info */}
          <div>
            <div className="bg-card rounded-lg p-6 shadow-md sticky top-20">
              <div className="text-sm text-muted-foreground mb-2">{keyType}</div>

              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">{discountedPrice}€</span>
                <span className="text-sm line-through text-muted-foreground ml-2">{originalPrice.toFixed(2)}€</span>
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                  -{discountPercentage}%
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">In stock - Instant delivery</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Digital download - no shipping fees</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm">24/7 customer support</span>
                </div>
              </div>

              <AddToCartButton
                game={{
                  id: game.id,
                  slug: game.slug,
                  name: game.name,
                  image: game.background_image,
                  price: Number.parseFloat(discountedPrice),
                  originalPrice: originalPrice,
                  platform: primaryPlatform,
                }}
              />

              <Button variant="outline" className="w-full mt-4">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Similar games */}
        {similarGames.length > 0 && (
          <div className="mt-12">
            <HorizontalGameScroll title="Similar Games" games={similarGames} />
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching game details:", error)
    notFound()
  }
}
