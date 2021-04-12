const CACHE_NAME = "climbwhere-sg-cache-test-1";
// TODO: update urls to cache on release
const urlsToCache = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
  "/components/Slots.svelte.css",
  "/components/Slots.svelte.css.proxy.js",
  "/components/Slots.svelte.js",
  "/utils/date.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", function (event) {
  console.log("Activate");
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
