import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { NeoBrutalistCard, NeoBrutalistButton } from './shared/NeoBrutalistCard';
import { HoverParallaxText } from './shared/ParallaxText';
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
  bgColor: string;
}> = ({ href, icon, label, bgColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-3 p-4 ${bgColor} border-5 border-brutal-black hover:translate-x-1 hover:translate-y-1 transition-all duration-200 shadow-brutal hover:shadow-[4px_4px_0px_0px_#000000]`}
  >
    <div className="text-2xl">
      {icon}
    </div>
    <span className="font-bauhaus text-brutal-black font-bold uppercase text-sm">{label}</span>
  </a>
);

const AboutSection: React.FC<AboutSectionProps> = ({ personalInfo, onNavigate }) => {
  const skills = [
    'React', 'TypeScript', 'Three.js', 'Design', 'Node.js', 'Python'
  ];
  
  const skillColors = [
    '#00D4FF', '#9D4EDD', '#FF6B35', '#00FF87', '#FFD700', '#FF69B4'
  ];

  return (
    <section className="section-padding relative min-h-screen bg-[#F0EAD6]">
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
            className="space-y-10"
          >
            {/* Section Header */}
            <div>
              <HoverParallaxText intensity={0.4}>
                <h2 className="font-metanoia text-6xl md:text-7xl font-black text-brutal-white mb-8 uppercase" style={{
                  WebkitTextStroke: '3px #000000',
                  textShadow: '6px 6px 0px #000000'
                }}>
                  About Me
                </h2>
              </HoverParallaxText>
              <div className="bg-brutal-white border-6 border-brutal-black p-6 shadow-brutal-lg">
                <p className="font-helvetica-world text-lg text-brutal-black font-bold leading-relaxed">
                  {personalInfo.bio || 
                    "A creative developer passionate about building immersive digital experiences that bridge the gap between design and technology. I specialize in modern web development with a focus on 3D graphics, interactive interfaces, and user-centered design."}
                </p>
              </div>
            </div>

            {/* Experience highlights */}
            <div className="space-y-6">
              <div className="inline-block bg-brutal-cyan border-5 border-brutal-black px-6 py-3 shadow-brutal">
                <h3 className="font-bauhaus text-2xl text-brutal-black font-bold uppercase">
                  What I Do
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Frontend Development', desc: 'React, TypeScript, Next.js', color: 'bg-brutal-yellow' },
                  { title: '3D Graphics', desc: 'Three.js, WebGL, Spline', color: 'bg-brutal-pink' },
                  { title: 'UI/UX Design', desc: 'Figma, Adobe Creative Suite', color: 'bg-brutal-lime' },
                  { title: 'Backend Development', desc: 'Node.js, Python, Databases', color: 'bg-brutal-blue' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  >
                    <NeoBrutalistCard
                      backgroundColor={item.color}
                      borderWidth="border-5"
                      shadowOffset="6px"
                      className="p-5 h-full"
                    >
                      <h4 className="font-metanoia font-black text-brutal-black mb-2 text-xl uppercase">
                        {item.title}
                      </h4>
                      <p className="font-bauhaus text-sm text-brutal-black font-bold">
                        {item.desc}
                      </p>
                    </NeoBrutalistCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact links */}
            <div className="space-y-6">
              <div className="inline-block bg-brutal-purple border-5 border-brutal-black px-6 py-3 shadow-brutal">
                <h3 className="font-bauhaus text-2xl text-brutal-white font-bold uppercase">
                  Let's Connect
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContactLink
                  href={personalInfo.social?.github || "#"}
                  icon="🐙"
                  label="GitHub"
                  bgColor="bg-brutal-cyan"
                />
                <ContactLink
                  href={personalInfo.social?.linkedin || "#"}
                  icon="💼"
                  label="LinkedIn"
                  bgColor="bg-brutal-blue"
                />
                <ContactLink
                  href={`mailto:${personalInfo.email || 'hello@example.com'}`}
                  icon="📧"
                  label="Email"
                  bgColor="bg-brutal-orange"
                />
                <ContactLink
                  href={personalInfo.social?.twitter || "#"}
                  icon="🐦"
                  label="Twitter"
                  bgColor="bg-brutal-lime"
                />
              </div>
            </div>

            {/* Navigation button */}
            <NeoBrutalistButton
              onClick={() => onNavigate('hero')}
              backgroundColor="bg-brutal-pink"
              textColor="text-brutal-white"
              className="px-8 py-4"
            >
              Back to Top
            </NeoBrutalistButton>
          </motion.div>

          {/* Right side - 3D space for interaction */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 lg:h-full min-h-[400px]"
          >
            <NeoBrutalistCard
              backgroundColor="bg-brutal-white"
              borderWidth="border-6"
              shadowOffset="12px"
              className="p-6 h-full flex flex-col"
              hoverEffect={false}
            >
              <div className="text-center mb-4">
                <div className="inline-block bg-brutal-yellow border-4 border-brutal-black px-4 py-2 mb-2 shadow-[4px_4px_0px_0px_#000000]">
                  <p className="font-bauhaus text-sm text-brutal-black font-bold uppercase">Interactive 3D Skills</p>
                </div>
                <p className="font-bauhaus text-xs text-brutal-black font-bold uppercase">Drag to rotate • Hover to interact</p>
              </div>
              {/* 3D space is handled by the background canvas */}
            </NeoBrutalistCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;