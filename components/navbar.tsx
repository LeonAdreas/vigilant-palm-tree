"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { fetchGenres, fetchPlatforms } from "@/lib/api"
import { useCart } from "@/context/cart-context"
import { Search, ShoppingCart, User, ChevronDown, Menu, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ErrorBoundary } from "@/components/error-boundary"
import { ApiStatusIndicator } from "@/components/api-status-indicator"

interface Genre {
  id: number
  name: string
  slug: string
}

interface Platform {
  id: number
  name: string
  slug: string
}

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  external?: boolean
}

export function Navbar() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { itemCount } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  const navRef = useRef<HTMLDivElement>(null)

  // Genre categories based on the screenshot
  const genreCategories: NavItem[] = [
    { label: "Software", href: "/category/software", icon: <span className="text-[#ffb81c] mr-2">💻</span> },
    { label: "PSN Card", href: "/category/psn-card", icon: <span className="text-[#ffb81c] mr-2">🎮</span> },
    { label: "FPS", href: "/genre/shooter", icon: <span className="text-[#ffb81c] mr-2">🎯</span> },
    { label: "Action Games", href: "/genre/action", icon: <span className="text-[#ffb81c] mr-2">🔥</span> },
    { label: "Adventure", href: "/genre/adventure", icon: <span className="text-[#ffb81c] mr-2">🗺️</span> },
    { label: "VR Games", href: "/category/vr-games", icon: <span className="text-[#ffb81c] mr-2">🥽</span> },
    { label: "Strategy", href: "/genre/strategy", icon: <span className="text-[#ffb81c] mr-2">♟️</span> },
    { label: "RPG", href: "/genre/role-playing-games-rpg", icon: <span className="text-[#ffb81c] mr-2">⚔️</span> },
    { label: "Racing", href: "/genre/racing", icon: <span className="text-[#ffb81c] mr-2">🏎️</span> },
    { label: "Open World", href: "/category/open-world", icon: <span className="text-[#ffb81c] mr-2">🌍</span> },
    { label: "Horror", href: "/category/horror", icon: <span className="text-[#ffb81c] mr-2">👻</span> },
  ]

  // Platform categories
  const platformCategories: NavItem[] = [
    { label: "PC", href: "/platform/1", icon: <span className="text-[#ffb81c] mr-2">💻</span> },
    { label: "PlayStation", href: "/platform/2", icon: <span className="text-[#ffb81c] mr-2">🎮</span> },
    { label: "Xbox", href: "/platform/3", icon: <span className="text-[#ffb81c] mr-2">🎮</span> },
    { label: "Nintendo Switch", href: "/platform/7", icon: <span className="text-[#ffb81c] mr-2">🎮</span> },
    { label: "Mobile", href: "/category/mobile", icon: <span className="text-[#ffb81c] mr-2">📱</span> },
  ]

  // In-game goods categories
  const inGameCategories: NavItem[] = [
    { label: "CS2 Skins", href: "/category/cs2-skins", icon: <span className="text-[#ffb81c] mr-2">🔫</span> },
    { label: "Fortnite", href: "/category/fortnite", icon: <span className="text-[#ffb81c] mr-2">🛡️</span> },
    { label: "Roblox", href: "/category/roblox", icon: <span className="text-[#ffb81c] mr-2">🧱</span> },
    { label: "FIFA Ultimate Team", href: "/category/fifa", icon: <span className="text-[#ffb81c] mr-2">⚽</span> },
    { label: "Valorant", href: "/category/valorant", icon: <span className="text-[#ffb81c] mr-2">🎯</span> },
    { label: "Game Currency", href: "/category/game-currency", icon: <span className="text-[#ffb81c] mr-2">💰</span> },
  ]

  // Software categories
  const softwareCategories: NavItem[] = [
    {
      label: "Operating Systems",
      href: "/category/operating-systems",
      icon: <span className="text-[#ffb81c] mr-2">💻</span>,
    },
    { label: "Office & Productivity", href: "/category/office", icon: <span className="text-[#ffb81c] mr-2">📊</span> },
    {
      label: "Antivirus & Security",
      href: "/category/antivirus",
      icon: <span className="text-[#ffb81c] mr-2">🔒</span>,
    },
    { label: "Design & Creative", href: "/category/design", icon: <span className="text-[#ffb81c] mr-2">🎨</span> },
  ]

  useEffect(() => {
    async function loadData() {
      try {
        const genresData = await fetchGenres()
        setGenres(genresData.results || [])

        const platformsData = await fetchPlatforms()
        setPlatforms(platformsData.results || [])
      } catch (error) {
        console.error("Failed to load navbar data:", error)
        // Set fallback data if API fails
        setGenres([
          { id: 4, name: "Action", slug: "action" },
          { id: 3, name: "Adventure", slug: "adventure" },
          { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
          { id: 2, name: "Shooter", slug: "shooter" },
          { id: 7, name: "Puzzle", slug: "puzzle" },
          { id: 1, name: "Racing", slug: "racing" },
          { id: 14, name: "Simulation", slug: "simulation" },
          { id: 15, name: "Sports", slug: "sports" },
          { id: 10, name: "Strategy", slug: "strategy" },
        ])

        setPlatforms([
          { id: 1, name: "PC", slug: "pc" },
          { id: 2, name: "PlayStation", slug: "playstation" },
          { id: 3, name: "Xbox", slug: "xbox" },
          { id: 7, name: "Nintendo", slug: "nintendo" },
          { id: 8, name: "Android", slug: "android" },
          { id: 9, name: "iOS", slug: "ios" },
        ])
      }
    }

    loadData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  // Close mobile menu and dropdowns when navigating
  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <ErrorBoundary>
      <header className="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between h-16" ref={navRef}>
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button className="md:hidden text-white mr-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="relative w-32 h-8">
                  <Image src="/abstract-game-key.png" alt="GameKey" fill priority className="object-contain" />
                </div>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex relative mx-auto w-full max-w-md">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pr-10 rounded-full bg-[#2a2a2a] border-gray-700 text-gray-300 focus:border-[#ffb81c] focus:ring-[#ffb81c]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full text-gray-400 hover:text-white"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <ApiStatusIndicator />

              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <User className="h-5 w-5" />
              </Button>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#ffb81c] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Navigation Menu */}
          <nav className="hidden md:flex border-t border-gray-800 py-2">
            <ul className="flex space-x-1 w-full">
              {/* GENRES */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("genres")}
                  className={`px-4 py-2 font-medium ${
                    activeDropdown === "genres" ? "bg-[#222222] text-[#ffb81c]" : "text-gray-300 hover:text-[#ffb81c]"
                  } rounded-md transition-colors`}
                >
                  GENRES
                </button>
                {activeDropdown === "genres" && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-[#222222] border border-gray-700 shadow-lg rounded-md z-50">
                    <ul className="py-2">
                      {genreCategories.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-[#2a2a2a] hover:text-[#ffb81c]"
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* PLATFORMS */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("platforms")}
                  className={`px-4 py-2 font-medium ${
                    activeDropdown === "platforms"
                      ? "bg-[#222222] text-[#ffb81c]"
                      : "text-gray-300 hover:text-[#ffb81c]"
                  } rounded-md transition-colors`}
                >
                  PLATFORMS
                </button>
                {activeDropdown === "platforms" && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-[#222222] border border-gray-700 shadow-lg rounded-md z-50">
                    <ul className="py-2">
                      {platformCategories.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-[#2a2a2a] hover:text-[#ffb81c]"
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* IN-GAME GOODS */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("in-game")}
                  className={`px-4 py-2 font-medium ${
                    activeDropdown === "in-game" ? "bg-[#222222] text-[#ffb81c]" : "text-gray-300 hover:text-[#ffb81c]"
                  } rounded-md transition-colors`}
                >
                  IN-GAME GOODS
                </button>
                {activeDropdown === "in-game" && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-[#222222] border border-gray-700 shadow-lg rounded-md z-50">
                    <ul className="py-2">
                      {inGameCategories.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-[#2a2a2a] hover:text-[#ffb81c]"
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* UPCOMING RELEASES */}
              <li>
                <Link
                  href="/upcoming"
                  className={`px-4 py-2 font-medium ${
                    pathname === "/upcoming" ? "text-[#ffb81c]" : "text-gray-300 hover:text-[#ffb81c]"
                  } rounded-md transition-colors flex items-center`}
                >
                  UPCOMING RELEASES 🔥
                </Link>
              </li>

              {/* SOFTWARE */}
              <li className="relative">
                <button
                  onClick={() => toggleDropdown("software")}
                  className={`px-4 py-2 font-medium ${
                    activeDropdown === "software" ? "bg-[#222222] text-[#ffb81c]" : "text-gray-300 hover:text-[#ffb81c]"
                  } rounded-md transition-colors flex items-center`}
                >
                  SOFTWARE <ExternalLink className="ml-1 h-3 w-3" />
                </button>
                {activeDropdown === "software" && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-[#222222] border border-gray-700 shadow-lg rounded-md z-50">
                    <ul className="py-2">
                      {softwareCategories.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-[#2a2a2a] hover:text-[#ffb81c]"
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* CS2 */}
              <li>
                <Link
                  href="/category/cs2"
                  className={`px-4 py-2 font-medium ${
                    pathname === "/category/cs2" ? "text-[#ffb81c]" : "text-gray-300 hover:text-[#ffb81c]"
                  } rounded-md transition-colors flex items-center`}
                >
                  CS2 <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </li>

              {/* XBOX GAME PASS */}
              <li>
                <Link
                  href="/category/xbox-game-pass"
                  className={`px-4 py-2 font-medium ${
                    pathname === "/category/xbox-game-pass" ? "text-[#ffb81c]" : "text-gray-300 hover:text-[#ffb81c]"
                  } rounded-md transition-colors flex items-center`}
                >
                  XBOX GAME PASS 💚
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 bg-[#1a1a1a] border-t border-gray-800">
              <form onSubmit={handleSearch} className="flex relative mb-4">
                <Input
                  type="search"
                  placeholder="Search games..."
                  className="w-full pr-10 bg-[#2a2a2a] border-gray-700 text-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full text-gray-400"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <div className="space-y-4">
                {/* Mobile Accordion Menu */}
                <div>
                  <button
                    onClick={() => toggleDropdown("mobile-genres")}
                    className="flex justify-between items-center w-full py-2 font-medium text-gray-300"
                  >
                    <span>GENRES</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-genres" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown === "mobile-genres" && (
                    <div className="pl-4 space-y-2 py-2">
                      {genreCategories.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center py-1 text-gray-400 hover:text-[#ffb81c]"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleDropdown("mobile-platforms")}
                    className="flex justify-between items-center w-full py-2 font-medium text-gray-300"
                  >
                    <span>PLATFORMS</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-platforms" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown === "mobile-platforms" && (
                    <div className="pl-4 space-y-2 py-2">
                      {platformCategories.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center py-1 text-gray-400 hover:text-[#ffb81c]"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleDropdown("mobile-in-game")}
                    className="flex justify-between items-center w-full py-2 font-medium text-gray-300"
                  >
                    <span>IN-GAME GOODS</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-in-game" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown === "mobile-in-game" && (
                    <div className="pl-4 space-y-2 py-2">
                      {inGameCategories.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center py-1 text-gray-400 hover:text-[#ffb81c]"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/upcoming" className="block py-2 font-medium text-gray-300">
                  UPCOMING RELEASES 🔥
                </Link>

                <div>
                  <button
                    onClick={() => toggleDropdown("mobile-software")}
                    className="flex justify-between items-center w-full py-2 font-medium text-gray-300"
                  >
                    <span>SOFTWARE</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-software" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown === "mobile-software" && (
                    <div className="pl-4 space-y-2 py-2">
                      {softwareCategories.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center py-1 text-gray-400 hover:text-[#ffb81c]"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/category/cs2"
                  className={`block py-2 font-medium text-gray-300 ${pathname === "/category/cs2" ? "text-[#ffb81c] font-bold" : ""}`}
                >
                  CS2
                </Link>

                <Link
                  href="/category/xbox-game-pass"
                  className={`block py-2 font-medium text-gray-300 ${pathname === "/category/xbox-game-pass" ? "text-[#ffb81c] font-bold" : ""}`}
                >
                  XBOX GAME PASS 💚
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Category Icons Section */}
      <div className="bg-[#121212] py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            <Link href="/category/base-game" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#ffb81c]/20 mb-2">
                <span className="text-2xl">🎮</span>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-[#ffb81c]">Base Game</span>
            </Link>

            <Link href="/category/bundle" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#ffb81c]/20 mb-2">
                <span className="text-2xl">📦</span>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-[#ffb81c]">Bundle</span>
            </Link>

            <Link href="/category/dlc" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#ffb81c]/20 mb-2">
                <span className="text-2xl">➕</span>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-[#ffb81c]">DLC</span>
            </Link>

            <Link href="/category/software" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#ffb81c]/20 mb-2">
                <span className="text-2xl">💻</span>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-[#ffb81c]">Software</span>
            </Link>

            <Link href="/category/prepaid" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#ffb81c]/20 mb-2">
                <span className="text-2xl">💳</span>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-[#ffb81c]">Prepaid</span>
            </Link>

            <Link href="/category/in-game-goods" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#ffb81c]/20 mb-2">
                <span className="text-2xl">🎁</span>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-[#ffb81c]">In-game</span>
            </Link>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
