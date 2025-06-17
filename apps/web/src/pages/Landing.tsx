// src/pages/Landing.tsx
import { Header } from "@/components/landing/Header"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, CheckCircle, Package, Route, Truck } from "lucide-react"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
     <Header 
  onSignInClick={() => console.log('Sign in clicked')}
  onStartTrialClick={() => console.log('Start trial clicked')}
    />

      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-800">
                LogiAI Pro 2.0 has arrived!
              </span>
            </div>
            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              See what's new
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build the right logistics,{" "}
            <span className="text-blue-600">faster</span> with LogiAI Pro
          </h1>
          
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Understand your fleet needs, optimize routes, and streamline operations with our intelligent logistics platform.
          </p>
          
          <p className="text-lg text-purple-600 font-medium mb-8">
            Powered by AI
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Get started
            </Button>
            <Button size="lg" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 px-8">
              Request demo
            </Button>
          </div>

          {/* Dashboard Preview - Static Images Placeholder */}
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - AI Insights */}
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

              {/* Center Column - Main Dashboard */}
              <div className="lg:col-span-1">
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
                      <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Analytics */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
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
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xl font-bold">LogiAI Pro</span>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                AI-powered logistics platform designed to optimize your operations and drive growth.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3 text-sm text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Route Optimization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fleet Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real-time Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-blue-100">
                <li><a href="#" className="hover:text-white transition-colors">Customers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                    <span>Careers</span>
                    <span className="text-xs">🚀</span>
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Open Positions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Resources & Support */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-blue-100">
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                    <span>Help Center</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Academy</a></li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                    <span>System Status</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-blue-500 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-100 text-sm mb-4 md:mb-0">
                Copyright © 2025 LogiAI Pro, Inc. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <p className="text-blue-100 text-sm">
                  Designed in Colombia. Made for the world.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start space-x-6 mt-4 text-xs text-blue-200">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}