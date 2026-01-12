import React from 'react';
import ThemeProvider from '../components/ThemeProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import MainView from './MainView';

/**
 * AppShell Component
 * 
 * MANDATORY: This component mounts once and never remounts.
 * All global systems (ThemeProvider, Navbar, Footer, etc.) persist here.
 * Only MainView changes based on state.
 */
const AppShell: React.FC = () => {

  // PERFORMANCE: No artificial delays - render immediately
  // Zustand persist middleware automatically restores state on mount
  // Heavy components (3D scenes) are lazy-loaded on demand

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Persistent Shell Components - Never Remount */}
        <Navbar />
        
        {/* Dynamic View Region - Only this changes based on state */}
        <main className="flex-grow">
          <MainView />
        </main>
        
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
};

export default AppShell;
