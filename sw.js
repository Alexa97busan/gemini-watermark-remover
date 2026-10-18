// Offline support: keep the app's files cached and serve them first, while
// refreshing the cache in the background so the next visit gets updates.
// Bump VERSION when releasing so old caches are dropped.
const VERSION = 'v3';
const CACHE = 'watermark-remover-' + VERSION;
const FILES = [
  './', './index.html', './engine.js', './worker.js', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './og-image.jpg',
];

self.addEventListener('install', (e) => {
  // `reload` skips the HTTP cache so a release never precaches stale files
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('watermark-remover-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // `?lang=` and other query strings all map to the same cached page
  const key = req.mode === 'navigate' ? './' : req;
  const opened = caches.open(CACHE);
  const fresh = opened.then((cache) => fetch(req).then((res) => {
    if (res.ok) cache.put(key, res.clone());
    return res;
  }));
  e.waitUntil(fresh.catch(() => {}));
  e.respondWith(
    opened.then((cache) => cache.match(key, { ignoreSearch: req.mode === 'navigate' })).then((cached) => cached || fresh)
  );
});
