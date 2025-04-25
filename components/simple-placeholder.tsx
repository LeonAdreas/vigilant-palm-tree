"use client"

import { useId } from "react"

interface SimplePlaceholderProps {
  text?: string
  width?: string | number
  height?: string | number
  className?: string
}

export function SimplePlaceholder({ text, width = "100%", height = "100%", className = "" }: SimplePlaceholderProps) {
  const id = useId()
  const displayText = text || "Image"
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"]
  const colorIndex = Math.abs(displayText.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length
  const bgColor = colors[colorIndex]

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width,
        height,
        backgroundColor: bgColor,
        color: "white",
        fontWeight: "bold",
        fontSize: "0.875rem",
        textAlign: "center",
        padding: "0.5rem",
        overflow: "hidden",
      }}
    >
      {displayText}
    </div>
  )
}
