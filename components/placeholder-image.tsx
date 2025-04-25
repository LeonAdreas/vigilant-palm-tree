"use client"

import { useEffect, useRef } from "react"

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
}

export function PlaceholderImage({ width, height, text = "No Image", className = "" }: PlaceholderImageProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Generate a random background color
    const colors = [
      "#3B82F6", // blue
      "#10B981", // green
      "#F59E0B", // amber
      "#EF4444", // red
      "#8B5CF6", // purple
      "#EC4899", // pink
    ]
    const bgColor = colors[Math.floor(Math.random() * colors.length)]

    svgRef.current.style.background = bgColor
  }, [])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width={width} height={height} fill="#ccc" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
        fontSize={width > 100 ? "16" : "12"}
      >
        {text}
      </text>
    </svg>
  )
}
