import { ApiStatusChecker } from "@/components/api-status-checker"

export default function ApiTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">API Status Test</h1>
      <p className="mb-4 text-gray-600">This page tests the connection to the RAWG API and displays the status.</p>

      <ApiStatusChecker />

      <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Make sure your <code className="bg-gray-100 px-1 rounded">RAWG_API_KEY</code> environment variable is set
            correctly
          </li>
          <li>Check if the RAWG API is currently experiencing any outages</li>
          <li>Verify your internet connection</li>
          <li>If using a proxy or VPN, try disabling it temporarily</li>
          <li>Check if your deployment platform has any restrictions on outbound API calls</li>
        </ul>
      </div>
    </div>
  )
}
