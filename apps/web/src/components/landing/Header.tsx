// src/components/landing/Header.tsx
import { ArrowRight, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onSignInClick?: () => void
  onStartTrialClick?: () => void
}

export const Header = ({ onSignInClick, onStartTrialClick }: HeaderProps) => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LogiAI Pro</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-gray-700 hover:text-gray-900 transition-colors">Platform</span>
              <ArrowRight className="w-4 h-4 rotate-90 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-gray-700 hover:text-gray-900 transition-colors">Solutions</span>
              <ArrowRight className="w-4 h-4 rotate-90 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <span className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
              Pricing
            </span>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-gray-700 hover:text-gray-900 transition-colors">Resources</span>
              <ArrowRight className="w-4 h-4 rotate-90 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900"
              onClick={onSignInClick}
            >
              Sign in
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onStartTrialClick}
            >
              Start free trial
            </Button>
          </div>

          {/* Mobile Menu Button (for future) */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}