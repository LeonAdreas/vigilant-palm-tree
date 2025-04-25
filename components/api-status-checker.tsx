"use client"

import { useState, useEffect } from "react"
import { testApiConnection } from "@/lib/api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ApiStatusChecker() {
  const [status, setStatus] = useState<{
    loading: boolean
    success?: boolean
    message?: string
  }>({
    loading: true,
  })

  const checkApiStatus = async () => {
    setStatus({ loading: true })
    try {
      const result = await testApiConnection()
      setStatus({
        loading: false,
        success: result.success,
        message: result.success ? "API is working correctly" : result.message,
      })
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        message: `Error checking API: ${error instanceof Error ? error.message : String(error)}`,
      })
    }
  }

  useEffect(() => {
    checkApiStatus()
  }, [])

  return (
    <div className="mb-4">
      {status.loading ? (
        <Alert>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Checking API connection...</span>
          </div>
        </Alert>
      ) : status.success ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">API Connected</AlertTitle>
          <AlertDescription className="text-green-700">{status.message}</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Connection Error</AlertTitle>
          <AlertDescription>
            {status.message}
            <div className="mt-2">
              <Button size="sm" onClick={checkApiStatus} variant="outline">
                Retry Connection
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
