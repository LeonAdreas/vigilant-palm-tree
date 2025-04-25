"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react"

export default function CartPage() {
  const { items, removeFromCart, clearCart, total } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      setIsCheckingOut(false)
      alert("Thank you for your purchase! This is a demo, so no actual purchase was made.")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="bg-card rounded-lg p-8 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any games to your cart yet.</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </h2>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-24 h-24 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 96px"
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">
                          <Link href={`/game/${item.slug}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.platform}</p>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">{item.price.toFixed(2)}€</div>
                        <div className="text-sm line-through text-muted-foreground">
                          {item.originalPrice.toFixed(2)}€
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-card rounded-lg p-6 shadow-md sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600">-0.00€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Included</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>

            <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? (
                <>Processing...</>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" /> Checkout
                </>
              )}
            </Button>

            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>

            <div className="mt-6 text-xs text-muted-foreground text-center">
              <p>This is a demo store. No real purchases will be made.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
