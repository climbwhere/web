const VERSION = '1.2.5';
const CACHE_NAME = `${VERSION}-climbwhere-sg-cache`;

const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
  '/api.js',
  '/telegram.webp',
  '/logo.webp',
  '/App.svelte.js',
  '/App.svelte.css.proxy.js',
  '/App.svelte.css',
  '/components/NavBar.svelte.css',
  '/components/NavBar.svelte.css.proxy.js',
  '/components/NavBar.svelte.js',
  '/screens/Slots/index.svelte.css',
  '/screens/Slots/index.svelte.css.proxy.js',
  '/screens/Slots/index.svelte.js',
  '/screens/Slots/components/DatePicker.svelte.css',
  '/screens/Slots/components/DatePicker.svelte.css.proxy.js',
  '/screens/Slots/components/DatePicker.svelte.js',
  '/screens/Slots/components/GymBadge.svelte.css',
  '/screens/Slots/components/GymBadge.svelte.css.proxy.js',
  '/screens/Slots/components/GymBadge.svelte.js',
  '/screens/Slots/components/GymPicker.svelte.css',
  '/screens/Slots/components/GymPicker.svelte.css.proxy.js',
  '/screens/Slots/components/GymPicker.svelte.js',
  '/screens/Slots/components/SlotsTable.svelte.css',
  '/screens/Slots/components/SlotsTable.svelte.css.proxy.js',
  '/screens/Slots/components/SlotsTable.svelte.js',
  '/screens/Slots/components/TableRow.svelte.css',
  '/screens/Slots/components/TableRow.svelte.css.proxy.js',
  '/screens/Slots/components/TableRow.svelte.js',
  '/screens/About.svelte.css',
  '/screens/About.svelte.css.proxy.js',
  '/screens/About.svelte.js',
  '/screens/Report.svelte.css',
  '/screens/Report.svelte.css.proxy.js',
  '/screens/Report.svelte.js',
  '/screens/Error.svelte.css',
  '/screens/Error.svelte.css.proxy.js',
  '/screens/Error.svelte.js',
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
