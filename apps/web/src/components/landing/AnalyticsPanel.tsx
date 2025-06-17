import { Route } from "lucide-react"

export const AnalyticsPanel = () => {
  return (
    <div className="space-y-6">
      {/* Efficiency Report */}
      <div className="bg-white rounded-xl shadow-lg p-6 border">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Efficiency Report</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Fuel Usage</span>
            <div className="w-16 h-12 bg-red-200 rounded"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Route Time</span>
            <div className="w-16 h-12 bg-blue-200 rounded"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">On-time Delivery</span>
            <div className="w-16 h-12 bg-yellow-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Route Views */}
      <div className="bg-white rounded-xl shadow-lg p-6 border">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Route Views</h3>
        <div className="h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
          <Route className="w-12 h-12 text-orange-500" />
        </div>
      </div>

      {/* Revenue Alignment */}
      <div className="bg-white rounded-xl shadow-lg p-6 border">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Cost Savings</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900">$9,898,064</span>
          <span className="text-sm text-green-600">+1339</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-blue-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full w-3/4"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-gray-400 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}