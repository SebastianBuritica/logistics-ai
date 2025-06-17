import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onGetStartedClick?: () => void
  onRequestDemoClick?: () => void
}

export const HeroSection = ({ onGetStartedClick, onRequestDemoClick }: HeroSectionProps) => {
  return (
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
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          onClick={onGetStartedClick}
        >
          Get started
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="text-blue-600 border-blue-600 hover:bg-blue-50 px-8"
          onClick={onRequestDemoClick}
        >
          Request demo
        </Button>
      </div>
    </div>
  )
}