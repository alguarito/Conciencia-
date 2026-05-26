// === ConciencIA Service Worker v2.1.0-redesign ===
// Estrategia: Network-first para index.html (siempre fresco),
// cache-first para assets estáticos (offline funcional).
// Build: 2026-05-26 · Rediseño Bento Jurídico

const CACHE_NAME = 'conciencia-v2.1.0-redesign-20260526';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Recursos externos que vale la pena cachear
const EXTERNAL_CACHE = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com'
];

// === INSTALACIÓN: cachear core assets ===
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cacheando assets esenciales');
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Algunos assets no se pudieron cachear:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// === ACTIVACIÓN: limpiar caches antiguos ===
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nombres) => {
      return Promise.all(
        nombres.filter((n) => n !== CACHE_NAME).map((n) => {
          console.log('[SW] Borrando cache antiguo:', n);
          return caches.delete(n);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// === FETCH: network-first para HTML/JSON, cache-first para assets ===
// Esto previene que los usuarios vean versiones viejas tras un deploy.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith('http')) return;

  const url = new URL(req.url);
  const accept = req.headers.get('accept') || '';
  const esHTML = accept.includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/');
  const esJSON = url.pathname.endsWith('.json');

  // === NETWORK-FIRST para HTML y JSON (contenido que cambia con cada deploy) ===
  if (esHTML || esJSON) {
    event.respondWith(
      fetch(req).then((resp) => {
        if (resp && resp.status === 200) {
          const copia = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copia));
        }
        return resp;
      }).catch(() => {
        // Sin red: caer al cache (offline mode)
        return caches.match(req).then((cached) => {
          if (cached) return cached;
          if (esHTML) return caches.match('./index.html');
          return new Response('Sin conexión y recurso no cacheado', { status: 503 });
        });
      })
    );
    return;
  }

  // === CACHE-FIRST para assets estáticos (fonts, imágenes, libs CDN) ===
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        // Stale-while-revalidate en segundo plano
        fetch(req).then((nuevoResp) => {
          if (nuevoResp && nuevoResp.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, nuevoResp));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(req).then((resp) => {
        if (!resp || resp.status !== 200) return resp;
        const cacheable = EXTERNAL_CACHE.some((dom) => url.origin.includes(dom)) ||
                          url.origin === self.location.origin;
        if (cacheable) {
          const respCopia = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, respCopia));
        }
        return resp;
      }).catch(() => new Response('Sin conexión y recurso no cacheado', { status: 503 }));
    })
  );
});

// Mensajes desde la app (para forzar actualizaciones futuras)
self.addEventListener('message', (event) => {
  if (event.data?.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
