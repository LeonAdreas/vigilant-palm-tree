"use client"

import { useState, useEffect } from "react"
import { testApiConnection } from "@/lib/api"
import { Wifi, WifiOff } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ApiStatusIndicator() {
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

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            {status.loading ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : status.success ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{status.loading ? "Checking API connection..." : status.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
