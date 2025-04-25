import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">About Us</h3>
            <p className="text-sm text-gray-400 mb-4">
              GameKey is your destination for game keys, in-game items, and software at competitive prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  About GameKey
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ffb81c]">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Payment Methods</h3>
            <div className="grid grid-cols-3 gap-2">
              {["Visa", "Mastercard", "PayPal", "Bitcoin", "Skrill", "Paysafecard"].map((method) => (
                <div key={method} className="bg-[#222222] rounded p-2 text-xs text-center text-gray-300">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} GameKey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
