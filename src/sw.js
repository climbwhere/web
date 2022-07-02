const VERSION = '1.3.12';
const CACHE_NAME = `${VERSION}-climbwhere-sg-cache`;

const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
  '/index.js.map',
  '/telegram.webp',
  '/logo.webp',
];

self.addEventListener('install', (event) => {
  console.log('Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
  // purge older caches
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName)),
    )),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activate');
});

self.addEventListener('fetch', (event) => {
  // skip requests for extensions
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});
