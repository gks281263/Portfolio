import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import { 
  MagneticButton, 
  FloatingCard, 
  TextReveal, 
  GradientText, 
  PulseGlow, 
  ScrollTrigger 
} from '../components/MicroInteractions';


interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}

interface Skill {
  name: string;
  logo: string;
  color: string;
  category: 'Languages' | 'Frameworks' | 'Security' | 'DevOps' | 'Soft Skills';
}

const skills: Skill[] = [
  // Languages
  { 
    name: 'C', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    color: '#00599C',
    category: 'Languages'
  },
  { 
    name: 'Python', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB',
    category: 'Languages'
  },
  { 
    name: 'Go', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    color: '#00ADD8',
    category: 'Languages'
  },
  { 
    name: 'PHP', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    color: '#777BB4',
    category: 'Languages'
  },
  { 
    name: 'JavaScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E',
    category: 'Languages'
  },
  { 
    name: 'TypeScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6',
    category: 'Languages'
  },
  { 
    name: 'Rust', 
    logo: 'https://www.rust-lang.org/static/images/ferris-error.png',
    color: '#000000',
    category: 'Languages'
  },
  // Frameworks
  { 
    name: 'Django', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    color: '#092E20',
    category: 'Frameworks'
  },
  { 
    name: 'React', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB',
    category: 'Frameworks'
  },
  { 
    name: 'Node.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933',
    category: 'Frameworks'
  },
  // Security Tools
  { 
    name: 'Burp Suite', 
    logo: 'https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg',
    color: '#FF6633',
    category: 'Security'
  },
  { 
    name: 'OWASP ZAP', 
    logo: 'https://avatars.githubusercontent.com/u/6716868?s=200&v=4',
    color: '#000000',
    category: 'Security'
  },
  { 
    name: 'Metasploit', 
    logo: 'https://img.icons8.com/?size=48&id=PW0ChfedZvTh&format=png',
    color: '#FE7A16',
    category: 'Security'
  },
  { 
    name: 'Wireshark', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Wireshark_icon.svg/120px-Wireshark_icon.svg.png',
    color: '#1679A7',
    category: 'Security'
  },
  { 
    name: 'Nmap', 
    logo: 'https://nmap.org/images/sitelogo-nmap.svg',
    color: '#000000',
    category: 'Security'
  },
  { 
    name: 'Bettercap', 
    logo: 'https://raw.githubusercontent.com/bettercap/media/master/logo.png',
    color: '#20C933',
    category: 'Security'
  },
  // DevOps
  { 
    name: 'Git', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032',
    category: 'DevOps'
  },
  { 
    name: 'GitHub Actions', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    color: '#2088FF',
    category: 'DevOps'
  },
  { 
    name: 'Docker', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ED',
    category: 'DevOps'
  },
  // Soft Skills
  { 
    name: 'Project Management', 
    logo: 'https://cdn-icons-png.flaticon.com/512/1534/1534939.png',
    color: '#4A90E2',
    category: 'Soft Skills'
  },
  { 
    name: 'Team Leadership', 
    logo: 'https://cdn-icons-png.flaticon.com/512/1534/1534939.png',
    color: '#4A90E2',
    category: 'Soft Skills'
  },
  { 
    name: 'Decision-Making', 
    logo: 'https://cdn-icons-png.flaticon.com/512/1534/1534939.png',
    color: '#4A90E2',
    category: 'Soft Skills'
  }
];

const projects: Project[] = [
  {
    title: 'Telegram Keylogger (Rust)',
    description: 'Developed a keylogger for ethical research purposes using Rust, sending secure logs to Telegram via Bot API.',
    technologies: ['Rust', 'Telegram Bot API'],
    image: './assets/projects/keylogger.jpg',
    link: 'https://github.com/yourusername/telegram-keylogger'
  },
  {
    title: 'E-Commerce Platform (Django)',
    description: 'Built a secure e-commerce web app with user authentication, product management, and an admin panel.',
    technologies: ['Django', 'Python', 'PostgreSQL', 'Bootstrap'],
    image: './assets/projects/ecommerce.jpg',
    link: 'https://github.com/yourusername/ecommerce-platform'
  },
  {
    title: 'Peer-to-Peer Lending Platform (React + Django)',
    description: 'Developed a platform where users can securely lend and rent various items, with dynamic user interfaces and backend integration.',
    technologies: ['React', 'Django', 'REST API', 'PostgreSQL'],
    image: './assets/projects/p2p-lending.jpg',
    link: 'https://github.com/yourusername/p2p-lending'
  },
  {
    title: 'Anonymous Chat Website (Node.js + WebSocket)',
    description: 'Real-time anonymous chat tool, similar to Omegle, built using Node.js and WebSocket.',
    technologies: ['Node.js', 'WebSocket', 'Express', 'MongoDB'],
    image: './assets/projects/chat.jpg',
    link: 'https://github.com/yourusername/anonymous-chat'
  }
];

const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAboutSectionLocked, setIsAboutSectionLocked] = useState(false);



  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Responsive scroll system - adapts to screen size
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fallback for mobile - ensure content is always visible
  useEffect(() => {
    if (isMobile) {
      // Force all text to be visible on mobile after a short delay
      const timer = setTimeout(() => {
        const textElements = document.querySelectorAll('.text-foreground\\/80');
        textElements.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Responsive scroll offsets - earlier triggers on mobile
  const mobileOffset: ["start end", "center center"] = ["start end", "center center"];
  const desktopOffset: ["start end", "end start"] = ["start end", "end start"];

  // Scroll progress for About section
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: isMobile ? mobileOffset : desktopOffset
  });

  // Scroll progress for Education section
  const { scrollYProgress: educationScrollProgress } = useScroll({
    target: educationRef,
    offset: isMobile ? mobileOffset : desktopOffset
  });

  // Scroll progress for Experience section
  const { scrollYProgress: experienceScrollProgress } = useScroll({
    target: experienceRef,
    offset: isMobile ? mobileOffset : desktopOffset
  });

  // Scroll progress for Certifications section
  const { scrollYProgress: certificationsScrollProgress } = useScroll({
    target: certificationsRef,
    offset: isMobile ? mobileOffset : desktopOffset
  });

  // Responsive scale animations - more subtle on mobile
  const aboutScale = useSpring(
    useTransform(aboutScrollProgress, [0, isMobile ? 0.5 : 0.3], [0.9, 1.05]), 
    { stiffness: 80, damping: 25 }
  );

  const educationScale = useSpring(
    useTransform(educationScrollProgress, [0, isMobile ? 0.5 : 0.3], [0.9, 1.05]), 
    { stiffness: 80, damping: 25 }
  );

  const experienceScale = useSpring(
    useTransform(experienceScrollProgress, [0, isMobile ? 0.5 : 0.3], [0.9, 1.05]), 
    { stiffness: 80, damping: 25 }
  );

  const certificationsScale = useSpring(
    useTransform(certificationsScrollProgress, [0, isMobile ? 0.5 : 0.3], [0.9, 1.05]), 
    { stiffness: 80, damping: 25 }
  );

  // Responsive line progress - earlier and faster on mobile
  const aboutLine1Progress = useTransform(aboutScrollProgress, 
    isMobile ? [0.1, 0.3] : [0.3, 0.4], [0, 1]);
  const aboutLine2Progress = useTransform(aboutScrollProgress, 
    isMobile ? [0.2, 0.4] : [0.4, 0.5], [0, 1]);
  const aboutLine3Progress = useTransform(aboutScrollProgress, 
    isMobile ? [0.3, 0.5] : [0.5, 0.6], [0, 1]);

  const educationLine1Progress = useTransform(educationScrollProgress, 
    isMobile ? [0.1, 0.3] : [0.3, 0.4], [0, 1]);
  const educationLine2Progress = useTransform(educationScrollProgress, 
    isMobile ? [0.2, 0.4] : [0.4, 0.5], [0, 1]);
  const educationLine3Progress = useTransform(educationScrollProgress, 
    isMobile ? [0.3, 0.5] : [0.5, 0.6], [0, 1]);

  const experienceLine1Progress = useTransform(experienceScrollProgress, 
    isMobile ? [0.1, 0.3] : [0.3, 0.4], [0, 1]);
  const experienceLine2Progress = useTransform(experienceScrollProgress, 
    isMobile ? [0.2, 0.4] : [0.4, 0.5], [0, 1]);


  const certificationsLine1Progress = useTransform(certificationsScrollProgress, 
    isMobile ? [0.1, 0.3] : [0.3, 0.4], [0, 1]);
  const certificationsLine2Progress = useTransform(certificationsScrollProgress, 
    isMobile ? [0.2, 0.4] : [0.4, 0.5], [0, 1]);
  const certificationsLine3Progress = useTransform(certificationsScrollProgress, 
    isMobile ? [0.3, 0.5] : [0.5, 0.6], [0, 1]);

  // Responsive overall progress
  const aboutTotalHighlightProgress = useTransform(
    aboutScrollProgress,
    isMobile ? [0.1, 0.5] : [0.3, 0.6],
    [0, 1]
  );



  // Scroll lock effect
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!isAboutSectionLocked) return;

      const aboutSection = aboutRef.current;
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isInView) {
        const progress = aboutTotalHighlightProgress.get();
        if (progress < 0.8) {
          e.preventDefault();
          // Allow controlled scrolling within the section
          const scrollAmount = e.deltaY * 0.5;
          window.scrollBy(0, scrollAmount);
        } else {
          setIsAboutSectionLocked(false);
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [isAboutSectionLocked, aboutTotalHighlightProgress]);

  // Set scroll lock when entering About section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'about') {
            setIsAboutSectionLocked(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const refs = {
        '#about': aboutRef,
        '#skills': skillsRef,
        '#projects': projectsRef,
        '#contact': contactRef
      };
      
      const targetRef = refs[hash as keyof typeof refs];
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);



  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Project card animation variants
  const projectCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Contact card animation variants
  const contactCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section with Globe Animation */}
      <HeroSection />

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef} 
        className="section min-h-[80vh] flex flex-col md:flex-row items-center justify-center py-6 md:py-12 bg-background/50 backdrop-blur-sm"
      >
        <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ scale: aboutScale }}
            className="max-w-5xl mx-auto"
          >
            <div className="backdrop-blur-sm bg-background/30 rounded-lg p-6 sm:p-8 md:p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                {/* Profile Picture */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg"
                >
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQEiQYtYRyscxA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722104835775?e=1758153600&v=beta&t=MA8DBX_fuomOXHg4DawVz_yWbskC_P_EhuNzPh8H5uY"
                    alt="Gaurav Kumar"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="flex-1 w-full">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-8 text-foreground"
              >
                About Me
              </motion.h2>
              
              <motion.div className="space-y-6">
                <motion.div
                  className="relative"
                  style={{
                    opacity: aboutLine1Progress,
                    filter: useTransform(aboutLine1Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(aboutLine1Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      opacity: isMobile ? 1 : aboutLine1Progress,
                      background: useTransform(
                        aboutLine1Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Driven second-year Computer Science student specializing in <strong>Cyber Security</strong>, with hands-on experience in <strong>full-stack development</strong>, <strong>workflow automation</strong>, <strong>penetration testing</strong>, and <strong>malware analysis</strong>. My expertise lies in integrating robust security protocols with seamless user experiences, ensuring every application is both resilient and intuitive.
                  </motion.p>
                </motion.div>
                
                <motion.div
                  className="relative"
                  style={{
                    opacity: aboutLine2Progress,
                    filter: useTransform(aboutLine2Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(aboutLine2Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      opacity: isMobile ? 1 : aboutLine2Progress,
                      background: useTransform(
                        aboutLine2Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Co-founded a marketing startup, developing <strong>backend systems</strong>, optimizing processes, and scaling digital tools. With a deep command of modern web technologies and cybersecurity best practices, I specialize in architecting applications that are visually compelling and fortified against evolving threats.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="relative"
                  style={{
                    opacity: aboutLine3Progress,
                    filter: useTransform(aboutLine3Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(aboutLine3Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      opacity: isMobile ? 1 : aboutLine3Progress,
                      background: useTransform(
                        aboutLine3Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Passionate about <strong>secure software design</strong>, <strong>API development</strong>, and <strong>ethical hacking</strong>. Eager to secure an internship to further enhance cybersecurity and backend expertise while delivering high-impact, scalable solutions that exceed expectations in both functionality and security.
                  </motion.p>
                </motion.div>
              </motion.div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section 
        id="education" 
        ref={educationRef}
        className="section min-h-[80vh] flex items-center justify-center py-6 md:py-12 bg-background/50 backdrop-blur-sm"
      >
        <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ scale: educationScale }}
            className="max-w-5xl mx-auto"
          >
            <div className="backdrop-blur-sm bg-background/30 rounded-lg p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-8 text-foreground"
              >
                Education
              </motion.h2>
              
              <motion.div className="space-y-6">
                <motion.div
                  className="relative"
                  style={{
                    opacity: educationLine1Progress,
                    filter: useTransform(educationLine1Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(educationLine1Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        educationLine1Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Bachelor of Technology in Computer Science, Specialization in Cyber Security
                  </motion.p>
                </motion.div>
                
                <motion.div
                  className="relative"
                  style={{
                    opacity: educationLine2Progress,
                    filter: useTransform(educationLine2Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(educationLine2Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        educationLine2Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Parul University, Vadodara, Gujarat
                  </motion.p>
                </motion.div>

                <motion.div
                  className="relative"
                  style={{
                    opacity: educationLine3Progress,
                    filter: useTransform(educationLine3Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(educationLine3Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        educationLine3Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Expected Graduation: 2028
                  </motion.p>
                </motion.div>
              </motion.div>

              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        ref={experienceRef}
        className="section min-h-[80vh] flex items-center justify-center py-6 md:py-12 bg-background/50 backdrop-blur-sm"
      >
        <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ scale: experienceScale }}
            className="max-w-5xl mx-auto"
          >
            <div className="backdrop-blur-sm bg-background/30 rounded-lg p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-8 text-foreground"
              >
                Experience
              </motion.h2>
              
              <motion.div className="space-y-12">
                {/* First Experience - Co-Founder */}
                <motion.div
                  className="relative border-l-4 border-primary/30 pl-6 pb-8"
                  style={{
                    opacity: experienceLine1Progress,
                    filter: useTransform(experienceLine1Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(experienceLine1Progress, [0, 1], [20, 0])
                  }}
                >
                  <div className="absolute left-[-8px] top-0 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                  
                  <motion.div 
                    className="mb-4"
                    style={{
                      background: useTransform(
                        experienceLine1Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-2">Co-Founder</h3>
                    <p className="text-primary font-semibold text-lg mb-1">Promotionia (Startup)</p>
                    <p className="text-foreground/70 text-base">June 2023 – March 2025</p>
                  </motion.div>

                  <motion.ul 
                    className="text-foreground/80 text-lg leading-relaxed list-disc list-inside space-y-3"
                    style={{
                      background: useTransform(
                        experienceLine1Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine1Progress, [0.3, 0.4], [0, 1]),
                        filter: useTransform(experienceLine1Progress, [0.3, 0.4], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine1Progress, [0.3, 0.4], [20, 0])
                      }}
                    >
                      Engineered and launched two full-stack marketing platforms with advanced order processing and SEO optimization, driving measurable business growth.
                    </motion.li>
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine1Progress, [0.4, 0.5], [0, 1]),
                        filter: useTransform(experienceLine1Progress, [0.4, 0.5], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine1Progress, [0.4, 0.5], [20, 0])
                      }}
                    >
                      Automated Instagram account management and internal workflows using Python and Google Sheets, reducing manual workload by 90% and boosting operational efficiency.
                    </motion.li>
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine1Progress, [0.5, 0.6], [0, 1]),
                        filter: useTransform(experienceLine1Progress, [0.5, 0.6], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine1Progress, [0.5, 0.6], [20, 0])
                      }}
                    >
                      Led and mentored a 15-member marketing team, fostering a culture of innovation and achieving a 30% improvement in team productivity.
                    </motion.li>
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine1Progress, [0.6, 0.7], [0, 1]),
                        filter: useTransform(experienceLine1Progress, [0.6, 0.7], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine1Progress, [0.6, 0.7], [20, 0])
                      }}
                    >
                      Strengthened brand identity and digital presence across multiple platforms, resulting in increased engagement and market reach.
                    </motion.li>
                  </motion.ul>
                </motion.div>

                {/* Second Experience - Backend Developer Intern */}
                <motion.div
                  className="relative border-l-4 border-primary/30 pl-6"
                  style={{
                    opacity: experienceLine2Progress,
                    filter: useTransform(experienceLine2Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(experienceLine2Progress, [0, 1], [20, 0])
                  }}
                >
                  <div className="absolute left-[-8px] top-0 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                  
                  <motion.div 
                    className="mb-4"
                    style={{
                      background: useTransform(
                        experienceLine2Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-2">Backend Developer Intern</h3>
                    <p className="text-primary font-semibold text-lg mb-1">AiiQA Powered by Code2Tech Innovation Pvt. Ltd</p>
                    <p className="text-foreground/70 text-base">May 2025 - Aug 2025</p>
                  </motion.div>

                  <motion.ul 
                    className="text-foreground/80 text-lg leading-relaxed list-disc list-inside space-y-3"
                    style={{
                      background: useTransform(
                        experienceLine2Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine2Progress, [0.3, 0.4], [0, 1]),
                        filter: useTransform(experienceLine2Progress, [0.3, 0.4], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine2Progress, [0.3, 0.4], [20, 0])
                      }}
                    >
                      <strong>Developed robust backend services and RESTful APIs</strong> using Django Rest Framework (DRF), implementing comprehensive data models, serializers, and view sets for scalable web applications.
                    </motion.li>
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine2Progress, [0.4, 0.5], [0, 1]),
                        filter: useTransform(experienceLine2Progress, [0.4, 0.5], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine2Progress, [0.4, 0.5], [20, 0])
                      }}
                    >
                      <strong>Dockerized the complete project infrastructure</strong> for consistent deployment across different environments, creating optimized Docker containers and docker-compose configurations for seamless CI/CD integration.
                    </motion.li>
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine2Progress, [0.5, 0.6], [0, 1]),
                        filter: useTransform(experienceLine2Progress, [0.5, 0.6], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine2Progress, [0.5, 0.6], [20, 0])
                      }}
                    >
                      <strong>Designed and implemented secure software architecture</strong> with authentication, authorization, and data validation while optimizing code performance through database query optimization and caching strategies.
                    </motion.li>
                    <motion.li
                      style={{
                        opacity: useTransform(experienceLine2Progress, [0.6, 0.7], [0, 1]),
                        filter: useTransform(experienceLine2Progress, [0.6, 0.7], ['blur(5px)', 'blur(0px)']),
                        y: useTransform(experienceLine2Progress, [0.6, 0.7], [20, 0])
                      }}
                    >
                      <strong>Collaborated on comprehensive API documentation</strong> and system integration for scalable applications, ensuring seamless communication between frontend and backend systems with proper error handling and logging.
                    </motion.li>
                  </motion.ul>
                </motion.div>
              </motion.div>

              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section 
        id="certifications" 
        ref={certificationsRef}
        className="section min-h-[80vh] flex items-center justify-center py-6 md:py-12 bg-background/50 backdrop-blur-sm"
      >
        <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ scale: certificationsScale }}
            className="max-w-5xl mx-auto"
          >
            <div className="backdrop-blur-sm bg-background/30 rounded-lg p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-8 text-foreground"
              >
                Certifications
              </motion.h2>
              
              <motion.div className="space-y-6">
                <motion.div
                  className="relative group"
                  style={{
                    opacity: certificationsLine1Progress,
                    filter: useTransform(certificationsLine1Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(certificationsLine1Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed flex items-center gap-3 cursor-pointer relative"
                    style={{
                      background: useTransform(
                        certificationsLine1Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                    onClick={() => window.open('/Portfolio/PAC.png', '_blank')}
                  >
                    Cybersecurity Foundation – Palo Alto Networks Academy
                    <span className="relative group">
                      <span className="ml-2 underline text-primary hover:text-primary/80 transition-colors">(View Certificate)</span>
                      <span className="absolute left-1/2 top-full z-20 hidden group-hover:block group-focus:block w-64 p-2 bg-background border border-border rounded-lg shadow-lg mt-2 -translate-x-1/2 animate-fade-in">
                        <img src="/Portfolio/PAC.png" alt="PAC Certificate Preview" className="w-full h-auto rounded-md object-contain" />
                      </span>
                    </span>
                  </motion.p>
                </motion.div>
                
                <motion.div
                  className="relative"
                  style={{
                    opacity: certificationsLine2Progress,
                    filter: useTransform(certificationsLine2Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(certificationsLine2Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        certificationsLine2Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Credential ID: 3ymKKfahiz
                  </motion.p>
                </motion.div>

                <motion.div
                  className="relative"
                  style={{
                    opacity: certificationsLine3Progress,
                    filter: useTransform(certificationsLine3Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(certificationsLine3Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        certificationsLine3Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    Issued: May 6, 2025
                  </motion.p>
                </motion.div>
              </motion.div>

              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={skillsRef} 
        className="section py-12 md:py-20 relative bg-background/50 backdrop-blur-sm overflow-hidden"
      >
        {/* White Net Pattern with Gradient Fade */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.08)_25%,rgba(255,255,255,0.08)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.08)_75%,rgba(255,255,255,0.08)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.08)_25%,rgba(255,255,255,0.08)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.08)_75%,rgba(255,255,255,0.08)_76%,transparent_77%,transparent)] bg-[length:100px_100px] opacity-30" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <ScrollTrigger
            animation="fade-in"
            className="text-center mb-8 md:mb-16"
          >
            <TextReveal className="mb-2 md:mb-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                <GradientText>Skills & Expertise</GradientText>
              </h2>
            </TextReveal>
            <TextReveal delay={200}>
              <p className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg">
                A curated portfolio of technologies and tools I leverage to deliver secure, scalable, and innovative solutions in cybersecurity and software development.
              </p>
            </TextReveal>
          </ScrollTrigger>

          <div className="grid grid-cols-1 gap-8 md:gap-16">
            {Object.entries(groupedSkills).map(([category, skills], groupIndex) => (
              <ScrollTrigger
                key={category}
                animation="fade-in"
                delay={groupIndex * 200}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg" />
                <div className="relative p-4 sm:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-8 text-foreground">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
                    {skills.map((skill, index) => (
                      <FloatingCard
                        key={skill.name}
                        intensity={0.5}
                        className="flex flex-col items-center group"
                      >
                        <ScrollTrigger
                          animation="scale-in"
                          delay={index * 50}
                          className="flex flex-col items-center"
                        >
                          <PulseGlow
                            color={`${skill.color}40`}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 transition-all duration-300"
                            style={{
                              backgroundColor: `${skill.color}15`,
                              boxShadow: `0 0 20px ${skill.color}30`
                            }}
                          >
                            <img
                              src={skill.logo}
                              alt={skill.name}
                              className="w-full h-full object-contain filter dark:invert"
                            />
                          </PulseGlow>
                          <span className="text-xs sm:text-sm text-foreground/80 group-hover:text-foreground transition-colors text-center">
                            {skill.name}
                          </span>
                        </ScrollTrigger>
                      </FloatingCard>
                    ))}
                  </div>
                </div>
              </ScrollTrigger>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={projectsRef} 
        className="section py-12 md:py-20 bg-background/50 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">Featured Projects</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg">
              A showcase of my recent work, demonstrating expertise in secure web development and automation solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                custom={index}
                variants={projectCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
              >
                <div className="backdrop-blur-sm bg-background/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/80 mb-2 md:mb-4 line-clamp-2 text-sm md:text-base">{project.description}</p>
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-0.5 md:py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center text-sm md:text-base"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        View Project
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef} 
        className="section py-12 md:py-20 bg-background/50 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">Get in Touch</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg">
              Ready to collaborate or discuss how I can contribute to your next project? Let's connect and create secure, innovative solutions together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
            {/* Email */}
            <motion.div
              custom={0}
              variants={contactCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="backdrop-blur-sm bg-background/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Email</h3>
              </div>
              <a
                href="mailto:gks281263@gmail.com"
                className="text-foreground/80 hover:text-primary transition-colors block"
              >
                gks281263@gmail.com
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              custom={1}
              variants={contactCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="backdrop-blur-sm bg-background/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Phone</h3>
              </div>
              <a
                href="https://wa.me/6205829376"
                className="text-foreground/80 hover:text-primary transition-colors block"
              >
                +91 6205829376
              </a>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              custom={2}
              variants={contactCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="md:col-span-2 backdrop-blur-sm bg-background/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">LinkedIn</h3>
              </div>
              <div className="aspect-video w-full bg-background/50 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7166204061531205632"
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="backdrop-blur-sm bg-background/30 rounded-lg max-w-2xl w-full p-6 border border-border/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-muted rounded-lg mb-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">{selectedProject.title}</h2>
            <p className="text-foreground/80 mb-6">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center"
              >
                View Project
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </motion.div>
        </motion.div>
      )}



      {/* Back to Top Button */}
      <ScrollTrigger
        animation="fade-in"
        className="fixed bottom-8 right-8 z-40"
        threshold={0.1}
      >
        <MagneticButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 hover:bg-primary/30 transition-all duration-300 group"
        >
          <PulseGlow className="w-full h-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </PulseGlow>
        </MagneticButton>
      </ScrollTrigger>
    </div>
  );
};

export default Home; 