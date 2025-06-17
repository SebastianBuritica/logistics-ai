import { ArrowRight, BarChart3, CheckCircle } from "lucide-react"

export const AIInsights = () => {
  return (
    <div className="space-y-6">
      {/* Feedback Trend Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Fleet Performance</h3>
        <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4">
          <BarChart3 className="w-12 h-12 text-blue-500" />
        </div>
        <p className="text-sm text-gray-600">Vehicle efficiency tracking</p>
      </div>

      {/* AI Insights Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">Ask AI about insights</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Route optimization</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Fuel efficiency</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Delivery predictions</span>
          </div>
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="bg-white rounded-xl shadow-lg p-6 border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Transport Manager</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            "Excellent platform! 📊 Our delivery times improved by 30% since using LogiAI Pro..."
          </p>
        </div>
      </div>
    </div>
  )
}