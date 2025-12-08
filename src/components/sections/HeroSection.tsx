import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { ThreeBackground } from '../shared/ThreeBackground'
import { ParticlePreset } from '../shared/ParticleSystem'
import { FloatingShapes } from '../shared/GeometricShape'
import { ParallaxText, HoverParallaxText } from '../shared/ParallaxText'
import { NeoBrutalistButton } from '../shared/NeoBrutalistCard'
import type { PersonalInfo, PortfolioView, ThreeSceneConfig } from '../../types'

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
      color: '#000000',
      pattern: 'constellation',
      interactive: true
    },
    camera: {
      position: [0, 0, 10],
      fov: 75
    },
    controls: false,
    fog: false
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F5F1E8]">
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

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Main name with parallax */}
        <HoverParallaxText intensity={0.3}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-metanoia text-8xl md:text-9xl lg:text-[12rem] font-black text-brutal-black mb-8 leading-none tracking-tighter uppercase"
            style={{
              WebkitTextStroke: '4px #FFFFFF',
              textShadow: '8px 8px 0px #FFFFFF',
            }}
          >
            {personalInfo.name || "think"}
          </motion.h1>
        </HoverParallaxText>

        {/* Typewriter subtitle with parallax */}
        <ParallaxText speed={0.5} enableHover hoverRange={5}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="inline-block bg-brutal-yellow border-6 border-brutal-black px-8 py-4 mb-10 shadow-brutal-lg"
          >
            <span className="font-bauhaus text-2xl md:text-3xl lg:text-4xl font-bold text-brutal-black uppercase tracking-wide">
              {typedText}
              {showCursor && <span className="animate-pulse ml-1">|</span>}
            </span>
          </motion.div>
        </ParallaxText>

        {/* Bio text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-helvetica-world text-xl md:text-2xl text-brutal-white font-bold max-w-3xl mx-auto mb-14 leading-relaxed bg-brutal-black border-5 border-brutal-black px-8 py-6 shadow-[8px_8px_0px_0px_#000000]"
        >
          {personalInfo.bio || "Crafting digital experiences with modern technology and retro aesthetics."}
        </motion.p>

        {/* CTA Buttons with neo-brutalist style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row gap-8 items-center justify-center mb-16"
        >
          <NeoBrutalistButton
            onClick={() => onNavigate('works')}
            backgroundColor="bg-brutal-cyan"
            shadowColor="#000000"
          >
            View My Works
          </NeoBrutalistButton>

          <NeoBrutalistButton
            onClick={() => onNavigate('thinks')}
            backgroundColor="bg-brutal-pink"
            textColor="text-brutal-white"
            shadowColor="#000000"
          >
            Read My Thinks
          </NeoBrutalistButton>
        </motion.div>

        {/* Social Links with neo-brutalist style */}
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
              className="p-4 bg-brutal-white border-5 border-brutal-black hover:bg-brutal-lime transition-all duration-200 shadow-brutal hover:shadow-[4px_4px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1"
            >
              <Github size={28} className="text-brutal-black" />
            </a>
          )}
          {personalInfo.social?.linkedin && (
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-brutal-white border-5 border-brutal-black hover:bg-brutal-blue transition-all duration-200 shadow-brutal hover:shadow-[4px_4px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1"
            >
              <Linkedin size={28} className="text-brutal-black" />
            </a>
          )}
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-4 bg-brutal-white border-5 border-brutal-black hover:bg-brutal-orange transition-all duration-200 shadow-brutal hover:shadow-[4px_4px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1"
            >
              <Mail size={28} className="text-brutal-black" />
            </a>
          )}
        </motion.div>

        {/* Scroll indicator with neo-brutalist style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onNavigate('works')}
        >
          <span className="font-bauhaus text-sm text-brutal-white font-bold mb-3 tracking-widest uppercase bg-brutal-black px-4 py-2 border-3 border-brutal-white">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 border-5 border-brutal-white bg-brutal-yellow group-hover:bg-brutal-lime transition-colors duration-200 shadow-[6px_6px_0px_0px_#FFFFFF]"
          >
            <ChevronDown size={24} className="text-brutal-black" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient glow effects - keep for 3D background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-retro-electric-blue/10 rounded-full blur-3xl animate-pulse-glow z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-retro-neon-purple/10 rounded-full blur-3xl animate-pulse-glow z-0" style={{ animationDelay: '1s' }} />
    </section>
  )
}