import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import HeroSection from '../components/HeroSection';

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
  category: 'Languages' | 'Frameworks' | 'Security' | 'DevOps';
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
  }
];

const projects: Project[] = [
  {
    title: 'Secure Web Application',
    description: 'Developed a secure web application with authentication, authorization, and data encryption. Implemented OWASP security best practices and conducted penetration testing.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    image: '/projects/secure-web.jpg',
    link: 'https://github.com/yourusername/secure-web'
  },
  {
    title: 'Network Security Monitoring Tool',
    description: 'Created a real-time network monitoring tool that detects and alerts on suspicious activities. Integrated with SIEM systems and implemented automated incident response.',
    technologies: ['Python', 'Wireshark', 'Elasticsearch', 'Kibana'],
    image: '/projects/network-monitor.jpg',
    link: 'https://github.com/yourusername/network-monitor'
  },
  {
    title: 'Automated Security Testing Framework',
    description: 'Built an automated security testing framework that performs vulnerability scanning and generates detailed reports. Supports multiple security tools and custom test cases.',
    technologies: ['Python', 'Docker', 'OWASP ZAP', 'Jenkins'],
    image: '/projects/security-testing.jpg',
    link: 'https://github.com/yourusername/security-testing'
  }
];

const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isAboutSectionLocked, setIsAboutSectionLocked] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll progress for About section
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  // Enhanced scale animation with more zoom
  const scale = useSpring(useTransform(aboutScrollProgress, [0, 0.3], [0.85, 1.1]), {
    stiffness: 100,
    damping: 30
  });

  // Line highlight progress - starting after zoom completes
  const line1Progress = useTransform(aboutScrollProgress, [0.3, 0.4], [0, 1]);
  const line2Progress = useTransform(aboutScrollProgress, [0.4, 0.5], [0, 1]);
  const line3Progress = useTransform(aboutScrollProgress, [0.5, 0.6], [0, 1]);

  // Track overall highlight progress
  const totalHighlightProgress = useTransform(
    aboutScrollProgress,
    [0.3, 0.6],
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
        const progress = totalHighlightProgress.get();
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
  }, [isAboutSectionLocked, totalHighlightProgress]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Scroll progress for Skills section
  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"]
  });

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Animation variants for skill groups
  const groupVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Animation variants for individual skills
  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Scroll progress for Projects section
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"]
  });

  // Scroll progress for Contact section
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });

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
        className="section min-h-[120vh] flex items-center justify-center py-20 bg-background/50 backdrop-blur-sm"
      >
        <div className="container">
          <motion.div
            style={{ scale }}
            className="max-w-4xl mx-auto"
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
                About Me
              </motion.h2>
              
              <motion.div className="space-y-6">
                <motion.div
                  className="relative"
                  style={{
                    opacity: line1Progress,
                    filter: useTransform(line1Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(line1Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        line1Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    I am a passionate Cybersecurity Analyst and Web Developer with expertise in creating secure, 
                    performant applications. My focus is on implementing robust security measures while ensuring 
                    optimal user experience.
                  </motion.p>
                </motion.div>
                
                <motion.div
                  className="relative"
                  style={{
                    opacity: line2Progress,
                    filter: useTransform(line2Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(line2Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        line2Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    With a strong foundation in modern web technologies and security best practices, 
                    I specialize in developing applications that are not only visually appealing but also 
                    fortified against potential threats.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="relative"
                  style={{
                    opacity: line3Progress,
                    filter: useTransform(line3Progress, [0, 1], ['blur(5px)', 'blur(0px)']),
                    y: useTransform(line3Progress, [0, 1], [20, 0])
                  }}
                >
                  <motion.p 
                    className="text-foreground/80 text-xl leading-relaxed"
                    style={{
                      background: useTransform(
                        line3Progress,
                        [0, 1],
                        ['linear-gradient(90deg, transparent 0%, transparent 100%)', 
                         'linear-gradient(90deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)']
                      )
                    }}
                  >
                    My approach combines technical excellence with a deep understanding of security protocols, 
                    ensuring that every project I work on meets the highest standards of both functionality and security.
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
        className="section py-20 relative bg-background/50 backdrop-blur-sm overflow-hidden"
      >
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Skills & Expertise</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              A comprehensive collection of technologies and tools I work with to build secure and efficient solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16">
            {Object.entries(groupedSkills).map(([category, skills], groupIndex) => (
              <motion.div
                key={category}
                custom={groupIndex}
                variants={groupVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg" />
                <div className="relative p-8">
                  <h3 className="text-2xl font-semibold mb-8 text-foreground">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        custom={index}
                        variants={skillVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        className="flex flex-col items-center group"
                      >
                        <div 
                          className="w-16 h-16 rounded-xl p-3 mb-3 transition-all duration-300"
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
                        </div>
                        <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={projectsRef} 
        className="section py-20 bg-background/50 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Background effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Explore my recent work in cybersecurity and web development, showcasing innovative solutions and best practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/80 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
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
                        className="text-primary hover:underline inline-flex items-center"
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
        className="section py-20 bg-background/50 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Background effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Let's connect and discuss how we can work together to create secure and innovative solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
    </div>
  );
};

export default Home; 