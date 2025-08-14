const CACHE_NAME = 'gaurav-portfolio-v1.2.0';
const STATIC_CACHE = 'static-v1.2.0';
const DYNAMIC_CACHE = 'dynamic-v1.2.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/Portfolio/',
  '/Portfolio/index.html',
  '/Portfolio/src/main.tsx',
  '/Portfolio/src/App.tsx',
  '/Portfolio/src/pages/Home.tsx',
  '/Portfolio/src/components/Navbar.tsx',
  '/Portfolio/src/components/Footer.tsx',
  '/Portfolio/src/components/GlobeSection.tsx',
  '/Portfolio/src/components/HeroSection.tsx',
  '/Portfolio/src/components/ThemeProvider.tsx',
  '/Portfolio/src/index.css',
  '/Portfolio/src/App.css',
  '/Portfolio/site.webmanifest',
  '/Portfolio/GK.jpeg',
  '/Portfolio/earth-blue-marble.jpg',
  '/Portfolio/earth-clouds.png',
  '/Portfolio/earth-specular.jpg',
  '/Portfolio/earth-topology.png',
  '/Portfolio/GCV.pdf',
  '/Portfolio/PAC.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Orbitron:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/Portfolio/') || url.origin === location.origin) {
    // Local assets - cache first strategy
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((fetchResponse) => {
              // Cache successful responses
              if (fetchResponse && fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return fetchResponse;
            })
            .catch(() => {
              // Return offline page for navigation requests
              if (request.destination === 'document') {
                return caches.match('/Portfolio/');
              }
            });
        })
    );
  } else if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    // Fonts - cache first strategy
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((fetchResponse) => {
              if (fetchResponse && fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return fetchResponse;
            });
        })
    );
  } else {
    // External resources - network first strategy
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/Portfolio/GK.jpeg',
    badge: '/Portfolio/assets/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/Portfolio/assets/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/Portfolio/assets/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Gaurav Kumar Portfolio', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/Portfolio/')
    );
  }
});

// Helper function for background sync
async function doBackgroundSync() {
  try {
    // Perform any background tasks here
    console.log('Service Worker: Background sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
