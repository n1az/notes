import React from 'react';
import { motion } from 'framer-motion';
import type { PortfolioView } from '../../types';

interface FloatingNavProps {
  currentSection: PortfolioView;
  onNavigate: (section: PortfolioView) => void;
}

const navItems = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'works', label: 'Works', icon: '💼' },
  { id: 'thinks', label: 'Thinks', icon: '💭' },
  { id: 'about', label: 'About', icon: '👋' },
] as const;

const FloatingNav: React.FC<FloatingNavProps> = ({ currentSection, onNavigate }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="glass-card p-2 rounded-full backdrop-blur-md">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.id as PortfolioView)}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                  ${currentSection === item.id
                    ? 'bg-gradient-to-r from-retro-electric-blue to-retro-neon-cyan text-retro-space-navy shadow-lg'
                    : 'text-retro-white hover:bg-retro-electric-blue/20'
                  }
                `}
                title={item.label}
              >
                <span className="text-xl">{item.icon}</span>
                
                {/* Active indicator */}
                {currentSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-retro-electric-blue to-retro-neon-cyan"
                    style={{ zIndex: -1 }}
                  />
                )}
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-3 px-3 py-1 bg-retro-space-navy text-retro-white text-sm rounded-lg whitespace-nowrap pointer-events-none"
                >
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-retro-space-navy border-y-4 border-y-transparent"></div>
                </motion.div>
              </motion.button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;