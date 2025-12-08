import { useEffect, useRef, useState } from 'react';
import './Loader.css';

interface LoaderProps {
  onComplete?: () => void;
  duration?: number; // Duration in seconds
}

export function Loader({ onComplete, duration = 6 }: LoaderProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const counterIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messages = ['INITIALIZING', 'DATA_TRANSFER', 'COMPILING', 'FINALIZING', 'COMPLETE'];

  // Update counter with mechanical effect
  useEffect(() => {
    if (currentCount !== targetCount) {
      if (counterIntervalRef.current) {
        clearInterval(counterIntervalRef.current);
      }

      counterIntervalRef.current = setInterval(() => {
        setCurrentCount((current) => {
          if (current === targetCount) {
            if (counterIntervalRef.current) clearInterval(counterIntervalRef.current);
            return current;
          }
          const gap = targetCount - current;
          const step = gap > 10 ? 2 : 1;
          return gap > 0 ? Math.min(targetCount, current + step) : targetCount;
        });
      }, 40);
    }

    return () => {
      if (counterIntervalRef.current) {
        clearInterval(counterIntervalRef.current);
      }
    };
  }, [targetCount, currentCount]);

  // Main progress animation
  useEffect(() => {
    const updateInterval = 50; // Update every 50ms
    const totalUpdates = (duration * 1000) / updateInterval;
    let currentUpdate = 0;

    progressIntervalRef.current = setInterval(() => {
      currentUpdate++;
      const newProgress = Math.min(100, Math.floor((currentUpdate / totalUpdates) * 100));
      
      setProgress(newProgress);
      setTargetCount(newProgress);

      // Update active message based on progress
      const messageIndex = Math.min(4, Math.floor(newProgress / 20));
      setActiveMessageIndex(messageIndex);

      if (newProgress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onComplete?.();
          }, 1000);
        }, 800);
      }
    }, updateInterval);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [duration, onComplete]);

  // Calculate connector line scales
  const getLineScale = (start: number, end: number) => {
    if (progress < start) return 0;
    if (progress >= end) return 1;
    return (progress - start) / (end - start);
  };

  // Calculate block scales
  const getBlockScale = (threshold: number) => {
    if (progress < threshold) return 0;
    return Math.min(1, (progress - threshold) / 20);
  };

  return (
    <div className={`preloader ${isComplete ? 'preloader-exit' : ''}`}>
      {/* Pixel grid elements */}
      <div className="pixel-grid">
        <div className="pixel-row" id="top-row" style={{ width: `${progress}%` }} />
        <div className="pixel-row" id="bottom-row" style={{ width: `${progress}%` }} />
        <div className="pixel-column" id="left-column" style={{ height: `${progress}%` }} />
        <div className="pixel-column" id="right-column" style={{ height: `${progress}%` }} />
      </div>

      {/* Massive counter */}
      <div className="counter-wrapper">
        <div className="counter" id="counter">
          {currentCount}
        </div>
        <div className="counter-outline" aria-hidden="true">
          {currentCount}
        </div>
      </div>

      {/* Status text */}
      <div className="text-container">
        <div className="loading-text">LOADING SYSTEM</div>
        <div className="system-messages">
          {messages.map((message, index) => (
            <div
              key={message}
              className={`message ${index === activeMessageIndex ? 'active' : ''}`}
            >
              {message}
            </div>
          ))}
        </div>
      </div>

      {/* Progress markers */}
      <div className="loading-bar-container">
        <div className="loading-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-bar-markers">
          {[0, 25, 50, 75, 100].map((position) => (
            <div
              key={position}
              className="marker"
              data-position={position}
              style={{ opacity: progress >= position ? 1 : 0.6 }}
            >
              {position.toString().padStart(2, '0')}
            </div>
          ))}
        </div>
        {/* Progressive line fills */}
        <div className="connector-lines">
          <div
            className="connector-line"
            id="line-0-25"
            style={{ transform: `scaleX(${getLineScale(0, 25)})` }}
          />
          <div
            className="connector-line"
            id="line-25-50"
            style={{ transform: `scaleX(${getLineScale(25, 50)})` }}
          />
          <div
            className="connector-line"
            id="line-50-75"
            style={{ transform: `scaleX(${getLineScale(50, 75)})` }}
          />
          <div
            className="connector-line"
            id="line-75-100"
            style={{ transform: `scaleX(${getLineScale(75, 100)})` }}
          />
        </div>
      </div>

      {/* Block elements that progressively fill */}
      <div className="block-container">
        <div
          className="block"
          id="block-1"
          style={{ transform: `scale(${getBlockScale(20)})` }}
        />
        <div
          className="block"
          id="block-2"
          style={{ transform: `scale(${getBlockScale(40)})` }}
        />
        <div
          className="block"
          id="block-3"
          style={{ transform: `scale(${getBlockScale(60)})` }}
        />
        <div
          className="block"
          id="block-4"
          style={{ transform: `scale(${getBlockScale(80)})` }}
        />
      </div>
    </div>
  );
}
