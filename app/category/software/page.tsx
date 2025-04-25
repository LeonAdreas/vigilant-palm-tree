import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchGames } from "@/lib/api"

export const revalidate = 3600 // Revalidate every hour

async function getSoftwareItems() {
  try {
    // Since RAWG doesn't have software, we'll use some games as placeholders
    const data = await fetchGames({
      ordering: "-rating",
      page_size: "12",
    })
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch software items:", error)
    return []
  }
}

export default async function SoftwarePage() {
  const items = await getSoftwareItems()

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/digital-essentials.png" alt="Software" fill priority sizes="100vw" className="object-cover" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">SOFTWARE</h1>
            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              Get the latest software at competitive prices. From operating systems to productivity tools and security
              solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Software Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Operating Systems", image: "windows 11 operating system", link: "#" },
              { name: "Office & Productivity", image: "microsoft office 365 software", link: "#" },
              { name: "Antivirus & Security", image: "antivirus security software protection", link: "#" },
              { name: "Design & Creative", image: "adobe creative cloud design software", link: "#" },
              { name: "Development Tools", image: "programming development tools software", link: "#" },
              { name: "Utilities", image: "computer utility software tools", link: "#" },
              { name: "Business Software", image: "business enterprise software solutions", link: "#" },
              { name: "Education & Learning", image: "education learning software", link: "#" },
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

        {/* Featured Software */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Software</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Windows 11 Pro",
                image: "windows 11 pro operating system",
                price: 119.99,
                originalPrice: 199.99,
                discount: 40,
                type: "Digital Key",
              },
              {
                name: "Microsoft Office 2021",
                image: "microsoft office 2021 productivity suite",
                price: 149.99,
                originalPrice: 249.99,
                discount: 40,
                type: "Digital Key",
              },
              {
                name: "Norton 360 Deluxe",
                image: "norton 360 deluxe antivirus security",
                price: 29.99,
                originalPrice: 89.99,
                discount: 67,
                type: "Digital Key",
              },
              {
                name: "Adobe Photoshop 2023",
                image: "adobe photoshop 2023 design software",
                price: 199.99,
                originalPrice: 239.99,
                discount: 17,
                type: "Digital Key",
              },
              {
                name: "Windows 10 Pro",
                image: "windows 10 pro operating system",
                price: 89.99,
                originalPrice: 199.99,
                discount: 55,
                type: "Digital Key",
              },
              {
                name: "Kaspersky Total Security",
                image: "kaspersky total security antivirus",
                price: 39.99,
                originalPrice: 79.99,
                discount: 50,
                type: "Digital Key",
              },
              {
                name: "Microsoft Visual Studio",
                image: "microsoft visual studio development",
                price: 799.99,
                originalPrice: 1199.99,
                discount: 33,
                type: "Digital Key",
              },
              {
                name: "Malwarebytes Premium",
                image: "malwarebytes premium security",
                price: 29.99,
                originalPrice: 59.99,
                discount: 50,
                type: "Digital Key",
              },
            ].map((software, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=300&width=300&query=${software.image}`}
                    alt={software.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded">
                    -{software.discount}%
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{software.type}</div>
                  <h3 className="font-bold text-sm mb-2 line-clamp-2">{software.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-blue-600">${software.price.toFixed(2)}</span>
                    <span className="text-xs line-through text-gray-500 ml-2">
                      ${software.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Buy Software From Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-amber-500 text-3xl font-bold mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Genuine Software</h3>
              <p className="text-gray-600">All our software products are 100% genuine with valid license keys.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-amber-500 text-3xl font-bold mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
              <p className="text-gray-600">Receive your software license key instantly after purchase.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-amber-500 text-3xl font-bold mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Technical Support</h3>
              <p className="text-gray-600">Get assistance with installation and activation from our technical team.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">How do I activate my software?</h3>
              <p className="text-gray-600">
                After purchase, you'll receive a license key via email. Follow the included instructions to activate
                your software.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Are these retail or OEM licenses?</h3>
              <p className="text-gray-600">
                We offer both retail and OEM licenses depending on the product. The license type is clearly indicated in
                the product description.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Can I use the software on multiple devices?</h3>
              <p className="text-gray-600">
                This depends on the specific license terms of each product. Single-user licenses typically allow
                installation on one device, while multi-user licenses may allow installation on multiple devices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">What if I have trouble installing my software?</h3>
              <p className="text-gray-600">
                Our technical support team is available to assist you with any installation or activation issues.
                Contact us through our support portal.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
