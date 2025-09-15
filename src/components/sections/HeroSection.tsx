import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { ThreeBackground } from '../shared/ThreeBackground'
import { ParticlePreset } from '../shared/ParticleSystem'
import { FloatingShapes } from '../shared/GeometricShape'
import type { PersonalInfo, PortfolioView, ThreeSceneConfig } from '../../types'
import { cn } from '../../lib/utils'

interface HeroSectionProps {
  personalInfo: PersonalInfo
  isVisible: boolean
  onNavigate: (section: PortfolioView) => void
}

export function HeroSection({ personalInfo, isVisible, onNavigate }: HeroSectionProps) {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  const fullTitle = personalInfo.title || "Creative Developer & Designer"

  // Typewriter effect for subtitle
  useEffect(() => {
    if (!isVisible) return

    let i = 0
    const timer = setInterval(() => {
      if (i < fullTitle.length) {
        setTypedText(fullTitle.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [fullTitle, isVisible])

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorTimer)
  }, [])

  // Three.js scene configuration
  const threeConfig: ThreeSceneConfig = {
    background: 'particles',
    particles: {
      count: 500,
      speed: 0.5,
      color: '#00D4FF',
      pattern: 'constellation',
      interactive: true
    },
    camera: {
      position: [0, 0, 10],
      fov: 75
    },
    controls: false,
    fog: true
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-retro-space-navy">
      {/* Three.js Background */}
      <ThreeBackground
        config={threeConfig}
        section="hero"
        isActive={isVisible}
        className="z-0"
      >
        {/* Particle system */}
        <ParticlePreset preset="hero" />
        
        {/* Floating geometric shapes */}
        <FloatingShapes count={6} />
      </ThreeBackground>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-retro-space-navy/20 to-retro-space-navy/40 z-10" />

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Main name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-hangout text-9xl md:text-8xl lg:text-9xl font-bold text-retro-white mb-6 leading-none tracking-tight"
          style={{
            textShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(157, 78, 221, 0.3)'
          }}
        >
          {personalInfo.name || "think"}
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-body text-xl md:text-2xl lg:text-3xl text-retro-electric-blue mb-8 h-12 flex items-center justify-center"
        >
          <span className="mr-1">{typedText}</span>
          {showCursor && <span className="animate-pulse">|</span>}
        </motion.div>

        {/* Bio text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-body text-lg md:text-xl text-retro-light-gray max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {personalInfo.bio || "Crafting digital experiences with modern technology and retro aesthetics."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-16"
        >
          <button
            onClick={() => onNavigate('works')}
            className={cn(
              "group relative px-8 py-4 bg-glass-primary border border-glass-border-primary rounded-lg",
              "backdrop-blur-md hover:bg-glass-light transition-all duration-300",
              "font-accent text-lg font-semibold text-retro-white",
              "hover:scale-105 hover:shadow-lg hover:shadow-retro-electric-blue/25"
            )}
          >
            <span className="relative z-10">View My Works</span>
            <div className="absolute inset-0 bg-gradient-to-r from-retro-electric-blue/20 to-retro-neon-purple/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => onNavigate('thinks')}
            className={cn(
              "group px-8 py-4 border-2 border-retro-electric-blue rounded-lg",
              "font-accent text-lg font-semibold text-retro-electric-blue",
              "hover:bg-retro-electric-blue hover:text-retro-space-navy transition-all duration-300",
              "hover:scale-105 hover:shadow-lg hover:shadow-retro-electric-blue/25"
            )}
          >
            Read My Thinks
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex gap-6 justify-center mb-16"
        >
          {personalInfo.social?.github && (
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-glass-dark border border-glass-border-light rounded-full backdrop-blur-md hover:bg-glass-light transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-retro-electric-blue/25"
            >
              <Github size={24} className="text-retro-white" />
            </a>
          )}
          {personalInfo.social?.linkedin && (
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-glass-dark border border-glass-border-light rounded-full backdrop-blur-md hover:bg-glass-light transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-retro-neon-purple/25"
            >
              <Linkedin size={24} className="text-retro-white" />
            </a>
          )}
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-glass-dark border border-glass-border-light rounded-full backdrop-blur-md hover:bg-glass-light transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-retro-sunset-orange/25"
            >
              <Mail size={24} className="text-retro-white" />
            </a>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onNavigate('works')}
        >
          <span className="font-body text-sm text-retro-light-gray mb-2 tracking-wide">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 border border-retro-electric-blue/50 rounded-full"
          >
            <ChevronDown size={20} className="text-retro-electric-blue" />
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-retro-electric-blue/10 rounded-full blur-3xl animate-pulse-glow z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-retro-neon-purple/10 rounded-full blur-3xl animate-pulse-glow z-0" style={{ animationDelay: '1s' }} />
    </section>
  )
}