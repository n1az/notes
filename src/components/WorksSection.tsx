import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { NeoBrutalistCard, NeoBrutalistButton, NeoBrutalistBadge } from './shared/NeoBrutalistCard';
import { HoverParallaxText } from './shared/ParallaxText';
import type { Work } from '../types';

interface WorksSectionProps {
  works: Work[];
}

// Floating 3D geometric shapes for the background
const FloatingGeometry: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          transparent 
          opacity={0.3} 
          wireframe 
        />
      </mesh>
    </Float>
  );
};

// Interactive 3D logo/icon for project cards
const ProjectIcon: React.FC<{ category: string; hover: boolean }> = ({ category, hover }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = hover ? state.clock.elapsedTime * 2 : state.clock.elapsedTime * 0.5;
      meshRef.current.scale.setScalar(hover ? 1.2 : 1);
    }
  });

  const getGeometry = () => {
    switch (category) {
      case 'web':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'mobile':
        return <cylinderGeometry args={[0.5, 0.5, 1.5, 6]} />;
      case 'design':
        return <torusGeometry args={[0.7, 0.3, 8, 16]} />;
      default:
        return <sphereGeometry args={[0.7, 8, 6]} />;
    }
  };

  const getColor = () => {
    switch (category) {
      case 'web':
        return '#00D4FF';
      case 'mobile':
        return '#9D4EDD';
      case 'design':
        return '#FF6B35';
      default:
        return '#00FF87';
    }
  };

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial 
          color={getColor()} 
          transparent 
          opacity={0.8}
          emissive={getColor()}
          emissiveIntensity={hover ? 0.3 : 0.1}
        />
      </mesh>
    </Float>
  );
};

// Project card component with 3D hover effects
const ProjectCard: React.FC<{ work: Work; index: number }> = ({ work, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Icon Container */}
      <div className="h-32 w-full mb-4 relative">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} intensity={1} color="#00D4FF" />
          <pointLight position={[-2, -2, 2]} intensity={0.5} color="#9D4EDD" />
          <ProjectIcon category={work.category} hover={isHovered} />
        </Canvas>
      </div>

      {/* Project Info Card - Neo-Brutalist */}
      <NeoBrutalistCard
        backgroundColor="bg-brutal-white"
        borderColor="border-brutal-black"
        shadowColor="#000000"
        borderWidth="border-6"
        shadowOffset="10px"
        hoverEffect={true}
        className="p-6"
      >
        <div className="relative z-10">
          {/* Category badge */}
          <NeoBrutalistBadge 
            color={work.category === 'web' ? 'cyan' : work.category === 'mobile' ? 'pink' : work.category === 'design' ? 'yellow' : 'lime'}
            className="mb-4"
          >
            {work.category}
          </NeoBrutalistBadge>

          {/* Project title with parallax */}
          <HoverParallaxText intensity={0.2}>
            <h3 className="font-metanoia text-3xl font-black text-brutal-black mb-4 uppercase leading-tight">
              {work.title}
            </h3>
          </HoverParallaxText>

          {/* Description */}
          <p className="font-helvetica-world text-base text-brutal-black font-medium mb-5 leading-relaxed">
            {work.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-5">
            {work.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-bauhaus font-bold bg-brutal-gray-100 text-brutal-black border-3 border-brutal-black uppercase"
              >
                {tech}
              </span>
            ))}
            {work.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-retro-gray-medium">
                +{work.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {work.links.live && (
              <NeoBrutalistButton
                href={work.links.live}
                backgroundColor="bg-brutal-blue"
                textColor="text-brutal-white"
                className="text-sm px-5 py-2"
              >
                Live Demo
              </NeoBrutalistButton>
            )}
            {work.links.github && (
              <NeoBrutalistButton
                href={work.links.github}
                backgroundColor="bg-brutal-lime"
                className="text-sm px-5 py-2"
              >
                GitHub
              </NeoBrutalistButton>
            )}
          </div>
        </div>
      </NeoBrutalistCard>
    </motion.div>
  );
};

// Filter buttons component
const FilterButtons: React.FC<{
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}> = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-16">
      <NeoBrutalistButton
        onClick={() => onFilterChange('all')}
        backgroundColor={activeFilter === 'all' ? 'bg-brutal-yellow' : 'bg-brutal-white'}
        borderColor="border-brutal-black"
        className="px-6 py-3"
      >
        All Works
      </NeoBrutalistButton>
      {categories.map((category) => (
        <NeoBrutalistButton
          key={category}
          onClick={() => onFilterChange(category)}
          backgroundColor={activeFilter === category ? 'bg-brutal-pink' : 'bg-brutal-white'}
          textColor={activeFilter === category ? 'text-brutal-white' : 'text-brutal-black'}
          borderColor="border-brutal-black"
          className="px-6 py-3 capitalize"
        >
          {category}
        </NeoBrutalistButton>
      ))}
    </div>
  );
};

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Get unique categories
  const categories = Array.from(new Set(works.map(work => work.category)));
  
  // Filter works based on active filter
  const filteredWorks = activeFilter === 'all' 
    ? works 
    : works.filter(work => work.category === activeFilter);

  return (
    <section className="section-padding relative min-h-screen bg-[#F5F1E8]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
          <pointLight position={[-5, -5, 5]} intensity={0.6} color="#9D4EDD" />
          
          {/* Floating geometric shapes */}
          <FloatingGeometry position={[-4, 2, -2]} />
          <FloatingGeometry position={[4, -2, -3]} />
          <FloatingGeometry position={[2, 3, -1]} />
          <FloatingGeometry position={[-3, -1, -2]} />
          <FloatingGeometry position={[0, -3, -4]} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container-lg relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <HoverParallaxText intensity={0.4}>
            <h2 className="font-metanoia text-7xl md:text-8xl font-black text-brutal-white mb-8 uppercase" style={{
              WebkitTextStroke: '3px #000000',
              textShadow: '6px 6px 0px #000000'
            }}>
              Featured Works
            </h2>
          </HoverParallaxText>
          <div className="inline-block bg-brutal-yellow border-5 border-brutal-black px-8 py-4 shadow-brutal-lg">
            <p className="font-bauhaus text-lg text-brutal-black font-bold max-w-2xl">
              A collection of projects showcasing modern web development, 
              mobile applications, and creative design solutions.
            </p>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <FilterButtons 
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid-works"
          >
            {filteredWorks.map((work, index) => (
              <ProjectCard 
                key={work.id} 
                work={work} 
                index={index} 
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No results message */}
        {filteredWorks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="body-lg text-retro-gray-medium">
              No projects found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WorksSection;