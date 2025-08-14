import { useEffect, useState, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  const [fps, setFps] = useState(60);
  const [isHighRefreshRate, setIsHighRefreshRate] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect high refresh rate displays
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;

    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFps);
        setIsHighRefreshRate(currentFps >= 90);
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimize animation duration based on FPS
  const getOptimizedDuration = useCallback((baseDuration: number) => {
    if (prefersReducedMotion) {
      return baseDuration * 0.3;
    }

    if (isHighRefreshRate) {
      return baseDuration * 0.8;
    }

    return baseDuration;
  }, [isHighRefreshRate, prefersReducedMotion]);

  // Optimize spring configuration for 120fps
  const getOptimizedSpring = useCallback(() => {
    if (isHighRefreshRate) {
      return {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        mass: 0.5
      };
    }

    return {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8
    };
  }, [isHighRefreshRate]);

  // Optimize easing function
  const getOptimizedEasing = useCallback(() => {
    if (isHighRefreshRate) {
      return [0.4, 0, 0.2, 1];
    }

    return [0.25, 0.46, 0.45, 0.94];
  }, [isHighRefreshRate]);

  return {
    fps,
    isHighRefreshRate,
    prefersReducedMotion,
    getOptimizedDuration,
    getOptimizedSpring,
    getOptimizedEasing
  };
};
