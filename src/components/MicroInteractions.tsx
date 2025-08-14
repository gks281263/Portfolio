import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`magnetic ${className}`}
      style={{
        x: springX,
        y: springY,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
};

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  color?: string;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  className = '',
  onClick,
  color = 'rgba(255, 255, 255, 0.3)'
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
  };

  return (
    <button
      ref={buttonRef}
      className={`ripple relative overflow-hidden ${className}`}
      onClick={(e) => {
        createRipple(e);
        onClick?.();
      }}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            backgroundColor: color,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </button>
  );
};

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  intensity = 1
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * intensity);
    y.set((e.clientY - centerY) * intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`card-micro ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      className={`text-reveal ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = ''
}) => {
  return (
    <span className={`gradient-text ${className}`}>
      {children}
    </span>
  );
};

interface PulseGlowProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

export const PulseGlow: React.FC<PulseGlowProps> = ({
  children,
  className = '',
  color = 'rgba(0, 255, 255, 0.6)',
  style
}) => {
  return (
    <div
      className={`pulse-glow ${className}`}
      style={{
        '--glow-color': color,
        ...style
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

interface ScrollTriggerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
  threshold?: number;
}

export const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'scroll-fade-in';
      case 'slide-left': return 'scroll-slide-left';
      case 'slide-right': return 'scroll-slide-right';
      case 'scale-in': return 'scroll-scale-in';
      default: return 'scroll-fade-in';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
