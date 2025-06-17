import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnnouncementBannerProps {
  onSeeWhatsNewClick?: () => void
}

export const AnnouncementBanner = ({ onSeeWhatsNewClick }: AnnouncementBannerProps) => {
  return (
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
          <Button 
            size="sm" 
            variant="outline" 
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
            onClick={onSeeWhatsNewClick}
          >
            See what's new
          </Button>
        </div>
      </div>
    </div>
  )
}