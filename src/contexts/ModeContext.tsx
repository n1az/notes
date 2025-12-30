import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type ModeType = 'ai' | 'photo' | 'thought';

interface ModeContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  hoveredMode: ModeType | null;
  setHoveredMode: (mode: ModeType | null) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ModeType>('ai');
  const [hoveredMode, setHoveredMode] = useState<ModeType | null>(null);

  return (
    <ModeContext.Provider value={{ mode, setMode, hoveredMode, setHoveredMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
