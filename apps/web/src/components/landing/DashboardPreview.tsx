import { AIInsights } from "./AIInsights"
import { MainDashboard } from "./MainDashboard"
import { AnalyticsPanel } from "./AnalyticsPanel"

interface DashboardPreviewProps {
  onSubmitClick?: () => void
}

export const DashboardPreview = ({ onSubmitClick }: DashboardPreviewProps) => {
  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - AI Insights */}
        <AIInsights />

        {/* Center Column - Main Dashboard */}
        <div className="lg:col-span-1">
          <MainDashboard onSubmitClick={onSubmitClick} />
        </div>

        {/* Right Column - Analytics */}
        <AnalyticsPanel />
      </div>
    </div>
  )
}