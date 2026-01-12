import React, { useState, useEffect } from 'react';
import { useAppStore } from '../app/store';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navbar Component
 * 
 * CRITICAL: This component uses state-based navigation, not routing.
 * All navigation actions mutate app state, which drives view rendering.
 */
const Navbar: React.FC = () => {
  const { activeView, setView, isMobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Get all sections (only for HOME view)
      if (activeView === 'HOME') {
        const sections = ['#about', '#education', '#experience', '#certifications', '#skills', '#projects', '#contact'];
        
        const currentSection = sections.find(section => {
          const element = document.querySelector(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const isActiveSection = (path: string) => {
    return activeSection === path;
  };

  // Navigation links - sections and views combined
  const navLinks = [
    { path: '#about', label: 'About', type: 'section' as const, view: 'HOME' as const },
    { path: '#education', label: 'Education', type: 'section' as const, view: 'HOME' as const },
    { path: '#experience', label: 'Experience', type: 'section' as const, view: 'HOME' as const },
    { path: '#certifications', label: 'Certifications', type: 'section' as const, view: 'HOME' as const },
    { path: '#skills', label: 'Skills', type: 'section' as const, view: 'HOME' as const },
    { path: '#projects', label: 'Projects', type: 'section' as const, view: 'HOME' as const },
    { path: '#contact', label: 'Contact', type: 'section' as const, view: 'HOME' as const },
    { path: '', label: 'My Thoughts', type: 'view' as const, view: 'THOUGHTS' as const },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    
    if (link.type === 'view') {
      // View navigation - switch to the view
      setView(link.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Section navigation - scroll to section
      if (activeView !== 'HOME') {
        setView('HOME');
        setTimeout(() => {
          const element = document.querySelector(link.path);
          if (element) {
            const offset = 80;
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offsetPosition = rect.top + scrollTop - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(link.path);
        if (element) {
          const offset = 80;
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const offsetPosition = rect.top + scrollTop - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl shadow-lg border-b border-border/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => {
                setView('HOME');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2"
            >
              <img 
                src="./GK.jpeg" 
                alt="GK" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Gaurav Kumar
              </span>
            </motion.button>

            <div className="hidden md:flex items-center space-x-1">
              {/* All navigation links - sections and views */}
              {navLinks.map((link, index) => {
                const isActive = link.type === 'section' 
                  ? activeView === 'HOME' && isActiveSection(link.path)
                  : activeView === link.view;
                
                return (
                  <motion.button
                    key={link.path || link.view}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    onClick={() => handleNavClick(link)}
                    className={`relative px-4 py-2 rounded-full text-foreground hover:text-primary transition-all duration-300 ${
                      isActive 
                        ? 'text-primary font-medium' 
                        : 'hover:bg-primary/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/70"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                          mass: 1
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-primary/5 text-foreground hover:text-primary transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-xl" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              className="absolute inset-y-0 right-0 w-full max-w-xs bg-card shadow-2xl border-l border-border/10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-border/10">
                <button
                  onClick={() => {
                    setView('HOME');
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center space-x-2"
                >
                  <img 
                    src="./GK.jpeg" 
                    alt="GK" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Gaurav Kumar
                  </span>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-primary/5 text-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="p-6 space-y-2">
                {/* All navigation links */}
                {navLinks.map((link) => {
                  const isLinkActive = link.type === 'section' 
                    ? activeView === 'HOME' && isActiveSection(link.path)
                    : activeView === link.view;
                  
                  return (
                    <button
                      key={link.path || link.view}
                      onClick={() => handleNavClick(link)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-foreground hover:text-primary transition-all duration-300 ${
                        isLinkActive 
                          ? 'text-primary font-medium bg-primary/5' 
                          : 'hover:bg-primary/5'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
