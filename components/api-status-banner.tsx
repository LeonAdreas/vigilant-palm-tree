"use client"

import { useState, useEffect } from "react"
import { testApiConnection } from "@/lib/api"
import { AlertCircle } from "lucide-react"

export function ApiStatusBanner() {
  const [status, setStatus] = useState<{
    loading: boolean
    success?: boolean
    message?: string
  }>({
    loading: true,
  })

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const result = await testApiConnection()
        setStatus({
          loading: false,
          success: result.success,
          message: result.success ? "API is connected" : result.message,
        })
      } catch (error) {
        setStatus({
          loading: false,
          success: false,
          message: `API error: ${error instanceof Error ? error.message : String(error)}`,
        })
      }
    }

    checkStatus()
  }, [])

  if (status.loading) {
    return null
  }

  if (status.success) {
    return null
  }

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700">
            Game API is currently unavailable. Some content may be using fallback data.
          </p>
        </div>
      </div>
    </div>
  )
}
