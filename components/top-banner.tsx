import Link from "next/link"

export function TopBanner() {
  return (
    <div className="bg-[#ffb81c] w-full">
      <Link href="/promotions/deals" className="block">
        <div className="container mx-auto px-4 py-2 text-center">
          <p className="text-black font-medium">
            <span className="font-bold">SPECIAL OFFER:</span> Get up to 85% off on selected games this week!
          </p>
        </div>
      </Link>
    </div>
  )
}
