import { build, files, timestamp } from "$service-worker";

const CACHE_NAME = `${timestamp}-climbwhere-sg`;

self.addEventListener("install", function (event) {
  caches.open(CACHE_NAME).then((cache) => cache.addAll([...build, ...files]));
  // purge older caches
  caches.keys().then(function (cacheNames) {
    return Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => {
          return caches.delete(cacheName);
        })
    );
  });
});

self.addEventListener("fetch", function (event) {
  // skip requests for extensions
  if (!(event.request.url.indexOf("http") === 0)) return;

  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        let responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
