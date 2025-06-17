import { ArrowRight, Truck } from "lucide-react"

export const Footer = () => {
  return (
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
  )
}