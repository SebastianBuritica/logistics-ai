import { BarChart3, Package, Route } from "lucide-react"

export const FeaturesSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Everything you need for modern logistics
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI-powered tools to streamline your operations and grow your business
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Route className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Route Optimization</h3>
          <p className="text-gray-600">AI algorithms optimize delivery routes to save time and fuel costs.</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
          <p className="text-gray-600">Monitor your fleet and shipments in real-time with precise GPS tracking.</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
          <p className="text-gray-600">Get insights into performance metrics and identify optimization opportunities.</p>
        </div>
      </div>
    </div>
  )
}