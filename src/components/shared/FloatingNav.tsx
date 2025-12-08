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
      <div className="bg-brutal-white border-5 border-brutal-black p-3 shadow-brutal">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.id as PortfolioView)}
                className={`
                  relative flex items-center justify-center w-14 h-14 border-4 border-brutal-black transition-all duration-200
                  ${currentSection === item.id
                    ? 'bg-brutal-yellow shadow-[4px_4px_0px_0px_#000000]'
                    : 'bg-brutal-white hover:bg-brutal-lime hover:translate-x-1 hover:translate-y-1'
                  }
                `}
                title={item.label}
              >
                <span className="text-2xl">{item.icon}</span>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-4 px-4 py-2 bg-brutal-black text-brutal-white font-bauhaus font-bold text-sm uppercase whitespace-nowrap pointer-events-none border-3 border-brutal-white shadow-[4px_4px_0px_0px_#FFFFFF]"
                >
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-brutal-black border-y-8 border-y-transparent"></div>
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