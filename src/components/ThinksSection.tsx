import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { NeoBrutalistCard, NeoBrutalistButton, NeoBrutalistBadge } from './shared/NeoBrutalistCard';
import { HoverParallaxText } from './shared/ParallaxText';
import type { Think } from '../types';

interface ThinksSectionProps {
  thinks: Think[];
}

// Animated particle field for background
const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;
  
  // Generate particle positions
  const positions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <pointsMaterial
        transparent
        color="#9D4EDD"
        size={0.02}
        sizeAttenuation={true}
        opacity={0.6}
      />
    </Points>
  );
};

// Floating thought bubbles
const ThoughtBubble: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshStandardMaterial 
        color="#FF6B35" 
        transparent 
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
};

// Think card component
const ThinkCard: React.FC<{ think: Think; index: number }> = ({ think, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative h-full"
    >
      <NeoBrutalistCard
        backgroundColor="bg-brutal-white"
        borderColor="border-brutal-black"
        shadowColor="#000000"
        borderWidth="border-6"
        shadowOffset="10px"
        hoverEffect={true}
        className="p-6 h-full flex flex-col"
      >
        <div className="relative z-10 flex flex-col h-full">
          {/* Published date and read time */}
          <div className="flex items-center justify-between text-sm font-bauhaus font-bold text-brutal-black mb-4">
            <time dateTime={think.createdAt} className="uppercase">
              {formatDate(think.createdAt)}
            </time>
            <span className="flex items-center gap-1 bg-brutal-lime px-3 py-1 border-3 border-brutal-black">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {think.readTime} MIN
            </span>
          </div>

          {/* Think title with parallax */}
          <HoverParallaxText intensity={0.2}>
            <h3 className="font-metanoia text-3xl font-black text-brutal-black mb-4 uppercase leading-tight">
              {think.title}
            </h3>
          </HoverParallaxText>

          {/* Excerpt */}
          <p className="font-helvetica-world text-base text-brutal-black font-medium mb-5 flex-grow leading-relaxed">
            {think.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {think.tags.slice(0, 3).map((tag) => (
              <NeoBrutalistBadge
                key={tag}
                color={index % 3 === 0 ? 'pink' : index % 3 === 1 ? 'cyan' : 'purple'}
                className="text-xs"
              >
                #{tag}
              </NeoBrutalistBadge>
            ))}
            {think.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-retro-gray-medium">
                +{think.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Read more link */}
          <NeoBrutalistButton
            backgroundColor="bg-brutal-orange"
            className="self-start text-sm px-5 py-2"
          >
            Read More →
          </NeoBrutalistButton>
        </div>
      </NeoBrutalistCard>
    </motion.article>
  );
};

// Tag filter buttons
const TagFilter: React.FC<{
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}> = ({ tags, activeTag, onTagChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      <NeoBrutalistButton
        onClick={() => onTagChange('all')}
        backgroundColor={activeTag === 'all' ? 'bg-brutal-purple' : 'bg-brutal-white'}
        textColor={activeTag === 'all' ? 'text-brutal-white' : 'text-brutal-black'}
        className="px-5 py-2 text-sm"
      >
        All Topics
      </NeoBrutalistButton>
      {tags.map((tag) => (
        <NeoBrutalistButton
          key={tag}
          onClick={() => onTagChange(tag)}
          backgroundColor={activeTag === tag ? 'bg-brutal-pink' : 'bg-brutal-white'}
          textColor={activeTag === tag ? 'text-brutal-white' : 'text-brutal-black'}
          className="px-5 py-2 text-sm capitalize"
        >
          #{tag}
        </NeoBrutalistButton>
      ))}
    </div>
  );
};

const ThinksSection: React.FC<ThinksSectionProps> = ({ thinks }) => {
  const [activeTag, setActiveTag] = useState('all');
  
  // Get unique tags from all thinks
  const allTags = Array.from(
    new Set(thinks.flatMap(think => think.tags))
  ).slice(0, 8); // Limit to 8 tags for UI
  
  // Filter thinks based on active tag
  const filteredThinks = activeTag === 'all'
    ? thinks
    : thinks.filter(think => think.tags.includes(activeTag));

  return (
    <section className="section-padding relative min-h-screen bg-[#E8E3D6]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.6} color="#9D4EDD" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#FF6B35" />
          
          {/* Particle field */}
          <ParticleField />
          
          {/* Floating thought bubbles */}
          <ThoughtBubble position={[-3, 2, -2]} />
          <ThoughtBubble position={[4, -1, -3]} />
          <ThoughtBubble position={[1, 3, -1]} />
          <ThoughtBubble position={[-2, -2, -2]} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
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
              Thinks & Insights
            </h2>
          </HoverParallaxText>
          <div className="inline-block bg-brutal-pink border-5 border-brutal-black px-8 py-4 shadow-brutal-lg">
            <p className="font-bauhaus text-lg text-brutal-white font-bold max-w-2xl">
              Thoughts on technology, design, and the intersection of creativity 
              and code. Exploring ideas that shape the digital landscape.
            </p>
          </div>
        </motion.div>

        {/* Tag Filter */}
        <TagFilter 
          tags={allTags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />

        {/* Thinks Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid-thinks"
          >
            {filteredThinks.map((think, index) => (
              <ThinkCard 
                key={think.id} 
                think={think} 
                index={index} 
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No results message */}
        {filteredThinks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="body-lg text-retro-gray-medium">
              No thoughts found for this topic.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ThinksSection;