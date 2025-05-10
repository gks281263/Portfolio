import React, { useEffect, useRef, useState } from 'react';
import GlobeSection from './GlobeSection';

const HeroSection: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceFromTop = rect.top;
      const height = rect.height;
      
      // Calculate progress based on element's position in viewport
      const progress = Math.min(1, Math.max(0, 
        (viewportHeight - distanceFromTop) / height
      ));
      
      setScrollProgress(progress);
    };

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[200vh] bg-gradient-to-b from-black to-gray-900"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <GlobeSection scrollProgress={scrollProgress} />
        {scrollProgress < 0.1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none select-none">
            <span className="text-foreground/80 text-lg font-medium mb-2 animate-pulse">Scroll to explore</span>
            <svg className="w-8 h-8 text-primary animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection; 