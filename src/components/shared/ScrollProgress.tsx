import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="fixed top-0 left-0 w-full h-1 bg-retro-space-navy/30 backdrop-blur-sm z-50"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-retro-electric-blue via-retro-neon-purple to-retro-hot-pink"
        style={{
          scaleX: scrollProgress,
          transformOrigin: '0%'
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </motion.div>
  );
};

export default ScrollProgress;