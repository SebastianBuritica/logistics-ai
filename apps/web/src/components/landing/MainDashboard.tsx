import { Route } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MainDashboardProps {
  onSubmitClick?: () => void
}

export const MainDashboard = ({ onSubmitClick }: MainDashboardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-xl border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Route className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Route Optimization</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>JAN</span>
          <span>FEB</span>
          <span>MAR</span>
          <span>APR</span>
          <span>MAY</span>
        </div>

        {/* Route Cards */}
        <div className="space-y-4">
          <div className="bg-yellow-400 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Objective 1</h3>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">New delivery route</p>
                <p className="text-xs text-gray-600">Optimized path</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Objective 2</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Fleet tracking improvements</p>
                  <p className="text-xs text-blue-100">Real-time monitoring</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Custom delivery scheduling</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Feedback Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Transport Co.</p>
          <p className="text-sm text-gray-800">
            A customer was asking for this feature... It's critical for their logistics operations!
          </p>
          <Button 
            size="sm" 
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onSubmitClick}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}