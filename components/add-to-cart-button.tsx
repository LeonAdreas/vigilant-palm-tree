"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart, type CartItem } from "@/context/cart-context"

interface AddToCartButtonProps {
  game: CartItem
}

export function AddToCartButton({ game }: AddToCartButtonProps) {
  const { addToCart, items } = useCart()
  const [isAdded, setIsAdded] = useState(items.some((item) => item.id === game.id))

  const handleAddToCart = () => {
    addToCart(game)
    setIsAdded(true)

    // Reset button after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <Button
      className={`w-full ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-[#ffb81c] hover:bg-[#e6a618] text-black"}`}
      onClick={handleAddToCart}
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
    </Button>
  )
}
