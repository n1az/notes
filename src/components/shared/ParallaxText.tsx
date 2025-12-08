import { useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxTextProps {
  children: ReactNode
  className?: string
  speed?: number // Multiplier for scroll speed (0.5 = slower, 1.5 = faster)
  enableHover?: boolean // Enable parallax on mouse hover
  hoverRange?: number // Max pixels to move on hover
}

export function ParallaxText({ 
  children, 
  className = '', 
  speed = 1,
  enableHover = false,
  hoverRange = 10
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [parallaxX, setParallaxX] = useState(0)
  const [parallaxY, setParallaxY] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Transform scroll position to parallax offset
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100])

  // Handle mouse move for hover parallax
  useEffect(() => {
    if (!enableHover) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Normalize to -1 to 1 range based on element size
      const normalizedX = deltaX / (rect.width / 2)
      const normalizedY = deltaY / (rect.height / 2)

      // Apply range limit
      const newX = normalizedX * hoverRange
      const newY = normalizedY * hoverRange

      setParallaxX(newX)
      setParallaxY(newY)
    }

    const handleMouseLeave = () => {
      setParallaxX(0)
      setParallaxY(0)
    }

    const element = ref.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [enableHover, hoverRange])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      <motion.div
        animate={{
          x: parallaxX,
          y: parallaxY,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        style={{
          willChange: enableHover ? 'transform' : 'auto',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface ScrollParallaxTextProps {
  children: ReactNode
  className?: string
  offset?: number // Vertical offset in pixels based on scroll
}

// Simpler scroll-only parallax without framer-motion for performance
export function ScrollParallaxText({ 
  children, 
  className = '',
  offset = 50
}: ScrollParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate element visibility in viewport
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2
      
      // Calculate parallax offset based on distance from viewport center
      const distance = elementCenter - viewportCenter
      const parallax = (distance / windowHeight) * offset
      
      setTranslateY(parallax)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

interface HoverParallaxTextProps {
  children: ReactNode
  className?: string
  intensity?: number // How much the text moves (0-1)
}

// Hover-only parallax for performance
export function HoverParallaxText({ 
  children, 
  className = '',
  intensity = 0.5
}: HoverParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height

    setTransform({
      x: x * 20 * intensity,
      y: y * 20 * intensity,
    })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition: 'transform 0.2s ease-out',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
