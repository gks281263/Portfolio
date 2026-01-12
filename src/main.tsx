import React from 'react';
import ReactDOM from 'react-dom/client';
import AppShell from './app/AppShell';
import './index.css';

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Portfolio/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

/**
 * Application Entry Point
 * 
 * CRITICAL: AppShell mounts once and persists for the entire session.
 * No routing wrapper. Pure SPA architecture.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>
);
