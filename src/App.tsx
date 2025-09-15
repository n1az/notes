import { useState, useEffect } from 'react'
import { HeroSection } from './components/sections/HeroSection'
import WorksSection from './components/WorksSection'
import ThinksSection from './components/ThinksSection'
import AboutSection from './components/AboutSection'
import ErrorBoundary from './components/shared/ErrorBoundary'
import FloatingNav from './components/shared/FloatingNav'
import ScrollProgress from './components/shared/ScrollProgress'
import { personalInfo, portfolioWorks, portfolioThinks } from './data/portfolio'
import type { PortfolioView } from './types'

function App() {
  const [currentView, setCurrentView] = useState<PortfolioView>('hero')
  const [isLoading, setIsLoading] = useState(true)

  // Initialize app
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle navigation between sections with smooth scrolling
  const handleNavigate = (section: PortfolioView) => {
    setCurrentView(section)
    
    // Smooth scroll to section
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    console.log(`Navigating to: ${section}`)
  }

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'thinks', 'about']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentView(section as PortfolioView)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-retro-space-navy to-retro-deep-purple flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-retro-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-retro-white font-body text-lg">Loading Portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app bg-retro-space-navy">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Floating Navigation */}
      <FloatingNav currentSection={currentView} onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen">
        <ErrorBoundary>
          <HeroSection
            personalInfo={personalInfo}
            isVisible={currentView === 'hero'}
            onNavigate={handleNavigate}
          />
        </ErrorBoundary>
      </section>
      
      {/* Works Section */}
      <section id="works" className="min-h-screen">
        <ErrorBoundary>
          <WorksSection works={portfolioWorks} />
        </ErrorBoundary>
      </section>
      
      {/* Thinks Section */}
      <section id="thinks" className="min-h-screen">
        <ErrorBoundary>
          <ThinksSection thinks={portfolioThinks} />
        </ErrorBoundary>
      </section>
      
      {/* About Section */}
      <section id="about" className="min-h-screen">
        <ErrorBoundary>
          <AboutSection personalInfo={personalInfo} onNavigate={handleNavigate} />
        </ErrorBoundary>
      </section>
    </div>
  )
}

export default App
