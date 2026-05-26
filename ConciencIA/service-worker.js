// === ConciencIA Service Worker v2.0 ===
// Estrategia: Cache-first con actualización en segundo plano.
// Permite que la app funcione 100% offline después de la primera visita.

const CACHE_NAME = 'conciencia-v2.0.0';
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

// === FETCH: estrategia cache-first con fallback a red ===
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Solo manejamos GET (no POST, PUT, etc.)
  if (req.method !== 'GET') return;

  // Esquemas no http (data:, chrome-extension:, etc.)
  if (!req.url.startsWith('http')) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      // Si está en cache, devolver de inmediato
      if (cached) {
        // Actualizar en segundo plano (stale-while-revalidate)
        fetch(req).then((nuevoResp) => {
          if (nuevoResp && nuevoResp.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, nuevoResp));
          }
        }).catch(() => {/* sin red, no pasa nada */});
        return cached;
      }

      // No está en cache, ir a la red
      return fetch(req).then((resp) => {
        // Solo cachear respuestas válidas
        if (!resp || resp.status !== 200) return resp;

        // Cachear los recursos externos relevantes (fonts, CDN)
        const url = new URL(req.url);
        const cacheable = EXTERNAL_CACHE.some((dom) => url.origin.includes(dom)) ||
                          url.origin === self.location.origin;

        if (cacheable) {
          const respCopia = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, respCopia));
        }
        return resp;
      }).catch(() => {
        // Sin red y sin cache: si pide HTML, mostrar el shell
        if (req.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
        return new Response('Sin conexión y recurso no cacheado', { status: 503 });
      });
    })
  );
});

// Mensajes desde la app (para forzar actualizaciones futuras)
self.addEventListener('message', (event) => {
  if (event.data?.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
