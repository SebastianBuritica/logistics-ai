import {
  AnnouncementBanner,
  DashboardPreview,
  FeaturesSection,
  Footer,
  Header,
  HeroSection
} from "@/components/landing"

const Landing = () => {
  // Event handlers
  const handleSignInClick = () => console.log('Sign in clicked')
  const handleStartTrialClick = () => console.log('Start trial clicked')
  const handleSeeWhatsNewClick = () => console.log('See what\'s new clicked')
  const handleGetStartedClick = () => console.log('Get started clicked')
  const handleRequestDemoClick = () => console.log('Request demo clicked')
  const handleSubmitClick = () => console.log('Submit clicked')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onSignInClick={handleSignInClick}
        onStartTrialClick={handleStartTrialClick}
      />

      {/* Announcement Banner */}
      <AnnouncementBanner onSeeWhatsNewClick={handleSeeWhatsNewClick} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <HeroSection 
          onGetStartedClick={handleGetStartedClick}
          onRequestDemoClick={handleRequestDemoClick}
        />
        
        {/* Dashboard Preview */}
        <DashboardPreview onSubmitClick={handleSubmitClick} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <FeaturesSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Landing