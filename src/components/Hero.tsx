import { useMode } from "../contexts/ModeContext";
import type { ModeType } from "../contexts/ModeContext";
import { ArrakisObject } from "./ArrakisObject";
import { MetaballCanvas } from "./MetaballCanvas";
import { ThoughtsCanvas } from "./ThoughtsCanvas";
import { Camera, PenTool, Cpu, Brain, Code2, Sparkles } from "lucide-react";

export function Hero() {
  const { mode, setMode, hoveredMode, setHoveredMode } = useMode();

  const handleGridClick = (selectedMode: ModeType) => {
    setMode(selectedMode);
  };

  return (
    <>
      {/* Full-height hero grid selection */}
      <section className="h-screen flex relative overflow-hidden">
        {/* Photo Grid - Left */}
        <div 
          className={`relative flex-1 cursor-pointer transition-all duration-700 ${
            mode === 'photo' ? 'flex-[2]' : 'flex-1'
          }`}
          onMouseEnter={() => setHoveredMode('photo')}
          onMouseLeave={() => setHoveredMode(null)}
          onClick={() => handleGridClick('photo')}
          style={{ backgroundColor: '#FF6B6B' }}
        >
          {/* Large background typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h1 
              className="text-[12rem] font-extrabold text-white/10 uppercase select-none leading-none whitespace-nowrap transition-opacity duration-500"
              style={{ 
                fontFamily: 'Metanoia, sans-serif',
                opacity: (hoveredMode === 'photo' || mode === 'photo') ? 1 : 0
              }}
            >
              Photographer
            </h1>
          </div>

          {/* 3D Object */}
          <div className="absolute inset-0">
            <ArrakisObject 
              lightColor1="#FF6B6B"
              lightColor2="#FF8E8E"
              darkColor1="#FF6B6B"
              darkColor2="#FF8E8E"
            />
          </div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Camera 
              className="text-white drop-shadow-2xl transition-all duration-500" 
              size={mode === 'photo' ? 120 : 80} 
              strokeWidth={2} 
            />
          </div>
        </div>

        {/* AI Grid - Middle (Wider) */}
        <div 
          className={`relative cursor-pointer transition-all duration-700 overflow-hidden ${
            mode === 'ai' ? 'flex-[3]' : 'flex-1'
          }`}
          onMouseEnter={() => setHoveredMode('ai')}
          onMouseLeave={() => setHoveredMode(null)}
          onClick={() => handleGridClick('ai')}
          style={{ backgroundColor: '#0a0f14' }}
        >
          {/* Large background typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-10">
            <h1 
              className="text-[12rem] font-extrabold text-white/10 uppercase select-none leading-none whitespace-nowrap transition-opacity duration-500"
              style={{ 
                fontFamily: 'Metanoia, sans-serif',
                opacity: (hoveredMode === 'ai' || mode === 'ai') ? 1 : 0
              }}
            >
              AI Engineer
            </h1>
          </div>

          {/* 3D Object (when not selected) */}
          {mode !== 'ai' && (
            <div className="absolute inset-0">
              <ArrakisObject 
                lightColor1="#9D529D"
                lightColor2="#B87FB8"
                darkColor1="#9D529D"
                darkColor2="#B87FB8"
              />
            </div>
          )}

          {/* Center icon or expanded content */}
          {mode !== 'ai' ? (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Cpu 
                className="text-white drop-shadow-2xl transition-all duration-500" 
                size={80} 
                strokeWidth={2} 
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 text-white pointer-events-none">
              <div className="flex gap-6 mb-8">
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30">
                  <Brain size={24} />
                  <span className="font-bold uppercase tracking-wider">Deep Learning</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30">
                  <Code2 size={24} />
                  <span className="font-bold uppercase tracking-wider">MLOps</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30">
                  <Sparkles size={24} />
                  <span className="font-bold uppercase tracking-wider">Computer Vision</span>
                </div>
              </div>
              <p className="text-xl text-center max-w-2xl text-white/80 font-mono">
                Building intelligent systems • Neural networks • AI solutions
              </p>
            </div>
          )}

        </div>

        {/* Thought Grid - Right */}
        <div 
          className={`relative flex-1 cursor-pointer transition-all duration-700 ${
            mode === 'thought' ? 'flex-[2]' : 'flex-1'
          }`}
          onMouseEnter={() => setHoveredMode('thought')}
          onMouseLeave={() => setHoveredMode(null)}
          onClick={() => handleGridClick('thought')}
          style={{ backgroundColor: '#1a1a1a' }}
        >
          {/* Large background typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h1 
              className="text-[12rem] font-extrabold text-white/10 uppercase select-none leading-none whitespace-nowrap transition-opacity duration-500"
              style={{ 
                fontFamily: 'Metanoia, sans-serif',
                opacity: (hoveredMode === 'thought' || mode === 'thought') ? 1 : 0
              }}
            >
              Writer
            </h1>
          </div>

          {/* 3D Object - only when not selected */}
          {mode !== 'thought' ? (
            <div className="absolute inset-0">
              <ArrakisObject 
                lightColor1="#4ECDC4"
                lightColor2="#6FE3DB"
                darkColor1="#4ECDC4"
                darkColor2="#6FE3DB"
              />
            </div>
          ) : (
            /* Main Hero Text when selected */
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
              <h1 className="text-white text-5xl md:text-6xl font-light text-center leading-tight mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
                Where matter becomes<br/>thought and thought<br/>becomes form
              </h1>
              <p className="text-gray-400 text-xs uppercase tracking-wider" style={{ fontFamily: 'monospace' }}>
                our vessel drifts through consciousness
              </p>
            </div>
          )}

          {/* Center icon (when not selected) */}
          {mode !== 'thought' && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <PenTool 
                className="text-white drop-shadow-2xl transition-all duration-500" 
                size={80} 
                strokeWidth={2} 
              />
            </div>
          )}

        </div>
      </section>

      {/* Fixed background layers that extend into sections */}
      {mode === 'ai' && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <MetaballCanvas />
        </div>
      )}
      {mode === 'photo' && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, backgroundColor: '#FF6B6B' }}>
          <div className="absolute inset-0">
            <ArrakisObject 
              lightColor1="#FF6B6B"
              lightColor2="#FF8E8E"
              darkColor1="#FF6B6B"
              darkColor2="#FF8E8E"
            />
          </div>
        </div>
      )}
      {mode === 'thought' && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, backgroundColor: '#0f0f0f' }}>
          <ThoughtsCanvas />
        </div>
      )}
    </>
  );
}