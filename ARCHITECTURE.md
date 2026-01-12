# Architecture: Pure SPA Application

## Overview

This application is architected as a **pure Single Page Application (SPA)** following Web WhatsApp principles. It is **NOT** a website or portfolio site—it's a long-lived web application that behaves like a desktop app.

## Core Principles

### 1. Persistent AppShell (MANDATORY)

The `AppShell` component mounts **once** and **never remounts** for the entire session:

```
<AppShell>
  <ThemeProvider />      ← Never remounts
  <Navbar />            ← Never remounts
  <MainView />          ← ONLY dynamic region
  <Footer />            ← Never remounts
  <ScrollToTop />       ← Never remounts
</AppShell>
```

**Critical**: All global systems (WebGL, Three.js, Babylon.js, theme providers) persist in the shell.

### 2. State Is the Source of Truth (CRITICAL)

Navigation is **state-driven**, not route-driven:

- `useAppStore` (Zustand) manages all navigation state
- UI actions mutate state
- State changes drive view rendering
- URLs (if present) are derived side-effects, not authoritative

**Mental Model**: "State drives rendering, not routes."

### 3. Views ≠ Pages

Views are state-rendered surfaces:

```
src/
 ├── app/
 │   ├── AppShell.tsx    ← Persistent shell
 │   ├── MainView.tsx    ← State-driven view switcher
 │   └── store.ts        ← Global state (Zustand)
 ├── views/
 │   ├── HomeView.tsx    ← State-rendered surface
 │   └── ThoughtsView.tsx ← State-rendered surface
```

Views switch via state:
```typescript
switch (activeView) {
  case 'HOME': return <HomeView />;
  case 'THOUGHTS': return <ThoughtsView />;
}
```

### 4. Navigation Pattern (Correct)

```typescript
const { setView } = useAppStore();

<button onClick={() => setView('THOUGHTS')}>
  My Thoughts
</button>
```

**No URL dependency. No routing library. Pure state mutation.**

### 5. Refresh = Process Restart

Page refresh is treated as:
- App restart
- Session rehydration
- State recovery

On load:
- Restore last active view (from localStorage)
- Restore UI preferences
- Restore scroll context (if applicable)

### 6. Application Lifecycle

Code with lifecycle phases in mind:
- **Boot**: App initialization, state restoration
- **Hydration**: WebGL/Three.js scene initialization
- **Idle**: App running, no user interaction
- **Interaction**: User actions mutate state
- **Background**: App still running, no active view
- **Recovery**: Error handling, state restoration

**Avoid page lifecycle thinking entirely.**

## File Structure

```
src/
 ├── app/                    ← Application core
 │   ├── AppShell.tsx       ← Persistent shell (mounts once)
 │   ├── MainView.tsx       ← State-driven view switcher
 │   └── store.ts           ← Global state (Zustand)
 ├── views/                  ← State-rendered surfaces
 │   ├── HomeView.tsx
 │   └── ThoughtsView.tsx
 ├── components/             ← Reusable components
 │   ├── Navbar.tsx         ← State-based navigation
 │   ├── ThreeGlobe.tsx     ← Persistent WebGL scene
 │   ├── BabylonScene.tsx   ← Persistent 3D scenes
 │   └── ...
 ├── data/                   ← Static data
 │   └── thoughts.ts        ← Blog/thoughts content
 └── main.tsx               ← Entry point (renders AppShell)
```

## Navigation Architecture

### State-Driven Navigation

```typescript
// Store defines views
type AppView = 'HOME' | 'THOUGHTS';

// Actions mutate state
setView('THOUGHTS');  // ← This drives rendering

// MainView renders based on state
switch (activeView) {
  case 'THOUGHTS': return <ThoughtsView />;
}
```

### Navbar Implementation

- Uses `useAppStore` for navigation state
- Button clicks call `setView(view)`
- Section scrolling handled via `querySelector` and `scrollTo`
- No React Router
- No Link components
- No route definitions

### View Switching

Views are lazy-loaded with `React.lazy`:
```typescript
const HomeView = lazy(() => import('../views/HomeView'));
const ThoughtsView = lazy(() => import('../views/ThoughtsView'));
```

Wrapped in `Suspense` for smooth loading transitions.

## State Management

### Zustand Store Structure

```typescript
interface AppState {
  activeView: AppView;
  setView: (view: AppView) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  restoreFromSession: () => void;
}
```

### Persistence

- State persisted to `localStorage` via Zustand middleware
- `activeView` automatically restored on page load
- No manual hydration needed

## Performance Discipline

1. **Lazy Loading**: Views are lazy-loaded with React.lazy
2. **Persistent Systems**: WebGL/Three.js scenes initialize once and persist
3. **No Remounts**: Global systems never remount
4. **State Persistence**: Navigation state persists in localStorage
5. **Smooth Transitions**: View switching is instant (no page reloads)
6. **Code Splitting**: Automatic chunk optimization via Vite
7. **Mobile Optimization**: Reduced animation intensity on mobile devices

## Critical Rules (Non-Negotiable)

❌ **NO** page-based architecture  
❌ **NO** route-driven component trees  
❌ **NO** remounting global systems  
❌ **NO** anchor tag navigation  
❌ **NO** full reloads except true crashes  
❌ **NO** "React Router as app brain"  

✅ **YES** state-driven navigation  
✅ **YES** persistent AppShell  
✅ **YES** views as state-rendered surfaces  
✅ **YES** state restoration on refresh  
✅ **YES** application lifecycle thinking  

## Validation Checklist

- ✅ AppShell mounts exactly once
- ✅ Babylon/Three scenes never reinitialize on navigation
- ✅ Navigation feels instant and continuous
- ✅ Refresh restores previous state
- ✅ No page flashes, reloads, or resets
- ✅ App behaves like an Electron app inside the browser
- ✅ Views lazy-loaded for optimal performance
- ✅ Mobile animations optimized for better UX

## Implementation Details

### AppShell Component

```typescript
const AppShell: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          <MainView />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
};
```

### MainView Component

```typescript
const MainView: React.FC = () => {
  const { activeView } = useAppStore();

  switch (activeView) {
    case 'HOME':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <HomeView />
        </Suspense>
      );
    case 'THOUGHTS':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <ThoughtsView />
        </Suspense>
      );
    default:
      return <HomeView />;
  }
};
```

### Store Implementation

```typescript
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeView: 'HOME',
      setView: (view: AppView) => {
        set({ activeView: view, isMobileMenuOpen: false });
      },
      // ... other state
    }),
    {
      name: 'portfolio-app-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeView: state.activeView }),
    }
  )
);
```

## Final Mental Model

**"This is Web WhatsApp running in a browser tab — not a website."**

Code accordingly.
