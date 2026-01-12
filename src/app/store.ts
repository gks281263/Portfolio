import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Application View Types
 * Views are state-rendered surfaces, not routes
 */
export type AppView = 'HOME' | 'THOUGHTS';

/**
 * Application State Store
 * This is the single source of truth for navigation and app state
 */
interface AppState {
  // Navigation State (CRITICAL: Routes are derived from this, not the reverse)
  activeView: AppView;
  setView: (view: AppView) => void;
  
  // UI State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'portfolio-app-state';

/**
 * Global Application Store
 * This store drives the entire application
 * 
 * CRITICAL: Zustand persist middleware automatically handles state restoration on app boot.
 * Refresh = process restart, and persisted state is automatically restored.
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      activeView: 'HOME',
      isMobileMenuOpen: false,
      
      // Navigation actions
      setView: (view: AppView) => {
        set({ activeView: view, isMobileMenuOpen: false });
      },
      
      setMobileMenuOpen: (open: boolean) => {
        set({ isMobileMenuOpen: open });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeView: state.activeView }),
    }
  )
);
