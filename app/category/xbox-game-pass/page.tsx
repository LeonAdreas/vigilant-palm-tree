import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchGames } from "@/lib/api"
import { GameGrid } from "@/components/game-grid"

export const revalidate = 3600 // Revalidate every hour

async function getXboxGames() {
  try {
    // Fetch Xbox games
    const data = await fetchGames({
      parent_platforms: "3", // Xbox platform ID
      ordering: "-added",
      page_size: "12",
    })
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch Xbox games:", error)
    return []
  }
}

export default async function XboxGamePassPage() {
  const xboxGames = await getXboxGames()

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/xbox-game-pass-abstract.png"
            alt="Xbox Game Pass"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">XBOX GAME PASS</h1>
            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              Get unlimited access to over 100 high-quality games with Xbox Game Pass. Play new games on day one and
              find your next favorite game.
            </p>
            <div className="flex gap-4 mt-6">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold">
                <Link href="#subscription-options">GET XBOX GAME PASS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Subscription Options */}
        <section id="subscription-options" className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Game Pass for Console */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-green-600 p-4">
                <h3 className="text-xl font-bold text-white">Game Pass for Console</h3>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold mb-2">
                  $9.99<span className="text-sm font-normal">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Access to 100+ high-quality games on console</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>New games added all the time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Xbox Game Studios titles the day they release</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Member discounts and deals</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Buy Now</Button>
              </div>
            </div>

            {/* Game Pass for PC */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-green-600 p-4">
                <h3 className="text-xl font-bold text-white">Game Pass for PC</h3>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold mb-2">
                  $9.99<span className="text-sm font-normal">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Access to 100+ high-quality games on PC</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>New games added all the time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>EA Play membership included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Member discounts and deals</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Buy Now</Button>
              </div>
            </div>

            {/* Game Pass Ultimate */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-600 relative">
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-0 rotate-45 origin-bottom-left">
                BEST VALUE
              </div>
              <div className="bg-green-600 p-4">
                <h3 className="text-xl font-bold text-white">Game Pass Ultimate</h3>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold mb-2">
                  $14.99<span className="text-sm font-normal">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Access to 100+ games on console, PC, and cloud</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>New games added all the time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>EA Play membership included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Xbox Live Gold included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Play on mobile devices from the cloud</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Buy Now</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Games on Xbox Game Pass</h2>
          <GameGrid games={xboxGames} emptyMessage="No Xbox games found" />
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How Xbox Game Pass Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Subscribe</h3>
              <p className="text-gray-600">Choose the plan that works best for you - Console, PC, or Ultimate.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Download</h3>
              <p className="text-gray-600">
                Install games directly to your console or PC from a library of 100+ titles.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Play</h3>
              <p className="text-gray-600">Enjoy unlimited access to games as long as your subscription is active.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">What is Xbox Game Pass?</h3>
              <p className="text-gray-600">
                Xbox Game Pass is a subscription service that gives you access to a library of games for one monthly
                price. With Game Pass, you can download and play full games directly on your Xbox console or PC.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">What's the difference between the subscription options?</h3>
              <p className="text-gray-600">
                Xbox Game Pass for Console gives you access to games on Xbox consoles only. Xbox Game Pass for PC is for
                Windows 10/11 computers only. Xbox Game Pass Ultimate includes both, plus Xbox Live Gold, EA Play, and
                cloud gaming on mobile devices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your Xbox Game Pass subscription at any time. You'll continue to have access to the
                games until your current billing period ends.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Do I need an internet connection?</h3>
              <p className="text-gray-600">
                You need an internet connection to download games and for initial verification. After that, you can play
                downloaded games offline on your primary console for up to 30 days.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
