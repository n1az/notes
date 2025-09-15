import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import type { PersonalInfo, PortfolioView } from '../types';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  onNavigate: (section: PortfolioView) => void;
}

// Interactive 3D Avatar/Logo
const InteractiveAvatar: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={hovered ? "#FF6B35" : "#00D4FF"}
          emissive={hovered ? "#9D4EDD" : "#00D4FF"}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// Floating skill bubbles
const SkillBubble: React.FC<{ 
  position: [number, number, number]; 
  text: string; 
  color: string;
}> = ({ position, text, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.8}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 0.35]}
          fontSize={0.15}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/HelveticaWorld-Regular.ttf"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
};

// Contact link component
const ContactLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}> = ({ href, icon, label, color }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-gradient-to-r transition-all duration-300`}
    style={{
      '--hover-from': color,
      '--hover-to': color + '80'
    } as React.CSSProperties}
  >
    <div className="text-2xl" style={{ color }}>
      {icon}
    </div>
    <span className="font-body text-retro-white font-semibold">{label}</span>
  </motion.a>
);

const AboutSection: React.FC<AboutSectionProps> = ({ personalInfo, onNavigate }) => {
  const skills = [
    'React', 'TypeScript', 'Three.js', 'Design', 'Node.js', 'Python'
  ];
  
  const skillColors = [
    '#00D4FF', '#9D4EDD', '#FF6B35', '#00FF87', '#FFD700', '#FF69B4'
  ];

  return (
    <section className="section-padding relative min-h-screen">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
          <pointLight position={[-5, -5, 5]} intensity={0.6} color="#9D4EDD" />
          <spotLight position={[0, 10, 0]} intensity={0.5} color="#FF6B35" />
          
          {/* Main interactive avatar */}
          <InteractiveAvatar />
          
          {/* Floating skill bubbles */}
          {skills.map((skill, index) => (
            <SkillBubble
              key={skill}
              position={[
                Math.cos((index / skills.length) * Math.PI * 2) * 3,
                Math.sin((index / skills.length) * Math.PI * 2) * 2,
                -2
              ]}
              text={skill}
              color={skillColors[index]}
            />
          ))}
          
          <Environment preset="night" />
          <ContactShadows opacity={0.3} scale={10} blur={2} />
          
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - About content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-retro-white mb-6 retro-glow-blue">
                About Me
              </h2>
              <p className="body-lg text-retro-gray-light leading-relaxed">
                {personalInfo.bio || 
                  "A creative developer passionate about building immersive digital experiences that bridge the gap between design and technology. I specialize in modern web development with a focus on 3D graphics, interactive interfaces, and user-centered design."}
              </p>
            </div>

            {/* Experience highlights */}
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-retro-electric-blue mb-4">
                What I Do
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Frontend Development', desc: 'React, TypeScript, Next.js' },
                  { title: '3D Graphics', desc: 'Three.js, WebGL, Spline' },
                  { title: 'UI/UX Design', desc: 'Figma, Adobe Creative Suite' },
                  { title: 'Backend Development', desc: 'Node.js, Python, Databases' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="glass-card p-4 rounded-lg"
                  >
                    <h4 className="font-body font-semibold text-retro-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-retro-gray-medium">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact links */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-retro-neon-purple mb-4">
                Let's Connect
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContactLink
                  href={personalInfo.social?.github || "#"}
                  icon="🐙"
                  label="GitHub"
                  color="#00D4FF"
                />
                <ContactLink
                  href={personalInfo.social?.linkedin || "#"}
                  icon="💼"
                  label="LinkedIn"
                  color="#9D4EDD"
                />
                <ContactLink
                  href={`mailto:${personalInfo.email || 'hello@example.com'}`}
                  icon="📧"
                  label="Email"
                  color="#FF6B35"
                />
                <ContactLink
                  href={personalInfo.social?.twitter || "#"}
                  icon="🐦"
                  label="Twitter"
                  color="#00FF87"
                />
              </div>
            </div>

            {/* Navigation button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('hero')}
              className="btn-retro-primary"
            >
              Back to Top
            </motion.button>
          </motion.div>

          {/* Right side - 3D space for interaction */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 lg:h-full min-h-[400px] glass-card rounded-xl p-4"
          >
            <div className="text-center text-retro-gray-light mb-4">
              <p className="text-sm">Interactive 3D Skills Visualization</p>
              <p className="text-xs">Drag to rotate • Hover to interact</p>
            </div>
            {/* 3D space is handled by the background canvas */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;