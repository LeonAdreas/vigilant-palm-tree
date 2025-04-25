"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface CartItem {
  id: number
  slug: string
  name: string
  image: string
  price: number
  originalPrice: number
  platform: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage on client side
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage")
      }
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists
      const exists = prevItems.some((i) => i.id === item.id)
      if (exists) {
        return prevItems
      }
      return [...prevItems, item]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))

    // If cart is empty after removal, clear localStorage
    if (items.length === 1) {
      localStorage.removeItem("cart")
    }
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const itemCount = items.length

  const total = items.reduce((acc, item) => acc + item.price, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
