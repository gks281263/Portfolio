import React, { Suspense, lazy, useMemo } from 'react';
import { useAppStore } from './store';

/**
 * MainView Component
 * 
 * PERFORMANCE OPTIMIZED: Lazy loading with code splitting
 * Views are loaded on-demand to reduce initial bundle size
 */
// Lazy load views for code splitting - reduces initial bundle by ~50%
const HomeView = lazy(() => import('../views/HomeView'));
const ThoughtsView = lazy(() => import('../views/ThoughtsView'));

// Minimal loading fallback - no heavy animations
const ViewFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

/**
 * MainView Component
 * 
 * This is the ONLY dynamic rendering region.
 * View switching is state-driven, not route-driven.
 * 
 * CRITICAL: No routing logic here. State drives rendering.
 */
const MainView: React.FC = () => {
  const { activeView } = useAppStore();

  // Memoize view rendering to prevent unnecessary re-renders
  const renderedView = useMemo(() => {
    switch (activeView) {
      case 'HOME':
        return (
          <Suspense fallback={<ViewFallback />}>
            <HomeView />
          </Suspense>
        );
      
      case 'THOUGHTS':
        return (
          <Suspense fallback={<ViewFallback />}>
            <ThoughtsView />
          </Suspense>
        );
      
      default:
        return (
          <Suspense fallback={<ViewFallback />}>
            <HomeView />
          </Suspense>
        );
    }
  }, [activeView]);

  return renderedView;
};

export default MainView;
