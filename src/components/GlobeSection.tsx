import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Skill {
  name: string;
  logo: string;
  color: string;
}

const skills: Skill[] = [
  { 
    name: 'C', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    color: '#00599C'
  },
  { 
    name: 'Python', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB'
  },
  { 
    name: 'Go', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    color: '#00ADD8'
  },
  { 
    name: 'PHP', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    color: '#777BB4'
  },
  { 
    name: 'JavaScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E'
  },
  { 
    name: 'TypeScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6'
  },
  { 
    name: 'Rust', 
    logo: 'https://www.rust-lang.org/static/images/ferris-error.png',
    color: '#000000'
  },
  { 
    name: 'Django', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    color: '#092E20'
  },
  { 
    name: 'React', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB'
  },
  { 
    name: 'Node.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933'
  },
  { 
    name: 'Burp Suite', 
    logo: 'https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg',
    color: '#FF6633'
  },
  { 
    name: 'OWASP ZAP', 
    logo: 'https://avatars.githubusercontent.com/u/6716868?s=200&v=4',
    color: '#000000'
  },
  { 
    name: 'Metasploit', 
    logo: 'https://img.icons8.com/?size=48&id=PW0ChfedZvTh&format=png',
    color: '#FE7A16'
  },
  { 
    name: 'Wireshark', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Wireshark_icon.svg/120px-Wireshark_icon.svg.png',
    color: '#1679A7'
  },
  { 
    name: 'Nmap', 
    logo: 'https://nmap.org/images/sitelogo-nmap.svg',
    color: '#000000'
  },
  { 
    name: 'Bettercap', 
    logo: 'https://raw.githubusercontent.com/bettercap/media/master/logo.png',
    color: '#20C933'
  },
  { 
    name: 'Git', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032'
  },
  { 
    name: 'GitHub Actions', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    color: '#2088FF'
  },
  { 
    name: 'Docker', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ED'
  }
];

interface GlobeSectionProps {
  scrollProgress: number;
}

const GlobeSection: React.FC<GlobeSectionProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Calculate globe scale and rotation
  const globeScale = 1 + scrollProgress * 2;
  const globeRotation = scrollProgress * 360;

  // Calculate skill icon positions and animations
  const getSkillStyle = (index: number) => {
    const angle = scrollProgress * 4 * Math.PI + (index / skills.length) * 2 * Math.PI;
    const radius = 120 * (1 + scrollProgress); // Increase orbit radius as we zoom in
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle * 2) * radius * 0.6;

    return {
      transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.5})`,
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      opacity: scrollProgress > 0.1 ? 1 : 0,
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900"
    >
      {/* Globe */}
      <motion.div
        className="relative w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500 to-blue-800 shadow-2xl"
        style={{
          transform: `scale(${globeScale}) rotate(${globeRotation}deg)`,
          boxShadow: '0 0 50px rgba(0, 255, 255, 0.3)',
        }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,0.1)_25%,rgba(0,255,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.1)_75%,rgba(0,255,255,0.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,255,0.1)_25%,rgba(0,255,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.1)_75%,rgba(0,255,255,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px] opacity-50" />
      </motion.div>

      {/* Skill Icons */}
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="absolute w-12 h-12 transition-all duration-300 ease-out"
          style={getSkillStyle(index)}
          onMouseEnter={() => setIsHovered(skill.name)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <div className="relative w-full h-full">
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
            />
            {/* Tooltip */}
            {isHovered === skill.name && (
              <div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-sm rounded whitespace-nowrap"
                style={{ border: `1px solid ${skill.color}` }}
              >
                {skill.name}
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,255,255,0.1)_49%,rgba(0,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px] opacity-30" />
      </div>
    </div>
  );
};

export default GlobeSection; 