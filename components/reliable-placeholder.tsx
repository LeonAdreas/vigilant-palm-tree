"use client"

import { useEffect, useState } from "react"

interface ReliablePlaceholderProps {
  text?: string
  width?: number | string
  height?: number | string
  className?: string
}

export function ReliablePlaceholder({
  text = "Image",
  width = "100%",
  height = "100%",
  className = "",
}: ReliablePlaceholderProps) {
  const [color, setColor] = useState("#3B82F6")

  useEffect(() => {
    // Generate a random color on client side
    const colors = [
      "#3B82F6", // blue
      "#10B981", // green
      "#F59E0B", // amber
      "#EF4444", // red
      "#8B5CF6", // purple
      "#EC4899", // pink
    ]
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }, [])

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
        color: "white",
        fontWeight: "bold",
        fontSize: "0.875rem",
        textAlign: "center",
        padding: "0.5rem",
      }}
    >
      {text}
    </div>
  )
}
