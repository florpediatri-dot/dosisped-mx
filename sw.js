// =============================================
//  DosísPed MX — Service Worker v1.0
//  Soporte offline completo
// =============================================

const CACHE_NAME = 'dosisped-mx-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ——— INSTALL: precache all static assets ———
self.addEventListener('install', event => {
  console.log('[SW] Installing DosísPed MX Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Precaching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ——— ACTIVATE: clean old caches ———
self.addEventListener('activate', event => {
  console.log('[SW] Activating new Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ——— FETCH: Cache First con fallback a red ———
self.addEventListener('fetch', event => {
  // Solo manejar requests GET
  if (event.request.method !== 'GET') return;

  // Ignorar requests de extensiones del navegador
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Actualizar cache en background (stale-while-revalidate)
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse;
      }

      // No está en cache: ir a red y guardar
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      }).catch(() => {
        // Offline fallback para navegación
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// ——— BACKGROUND SYNC (para futura funcionalidad) ———
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
});

// ——— PUSH NOTIFICATIONS (para futuras actualizaciones) ———
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title || 'DosísPed MX', {
      body: data.body || 'Nueva actualización disponible',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      tag: 'dosisped-update',
      renotify: true
    });
  }
});
