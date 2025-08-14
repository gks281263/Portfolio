import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import ThemeProvider from './components/ThemeProvider';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '#about', label: 'About' },
    { path: '#skills', label: 'Skills' },
    { path: '#projects', label: 'Projects' },
    { path: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          <Home />
        </main>
        <Footer />
        <ScrollToTop />
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navLinks={navLinks}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
