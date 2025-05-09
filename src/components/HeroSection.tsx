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
      </div>
    </section>
  );
};

export default HeroSection; 