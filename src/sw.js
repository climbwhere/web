const CACHE_NAME = "climbwhere-sg-cache-v1.0";

const urlsToCache = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
  "/api.js",
  "/constants.js",
  "/telegram.png",
  "/App.svelte.js",
  "/components/Button.svelte.css",
  "/components/Button.svelte.css.proxy.js",
  "/components/Button.svelte.js",
  "/components/Slots.svelte.css",
  "/components/Slots.svelte.css.proxy.js",
  "/components/Slots.svelte.js",
  "/components/FilterModal.svelte.css",
  "/components/FilterModal.svelte.css.proxy.js",
  "/components/FilterModal.svelte.js",
  "/components/MoreInfoModal.svelte.css",
  "/components/MoreInfoModal.svelte.css.proxy.js",
  "/components/MoreInfoModal.svelte.js",
  "/components/NavBar.svelte.css",
  "/components/NavBar.svelte.css.proxy.js",
  "/components/NavBar.svelte.js",
  "/components/TableRow.svelte.css",
  "/components/TableRow.svelte.css.proxy.js",
  "/components/TableRow.svelte.js",
];

self.addEventListener("install", function (event) {
  console.log("Activate");
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
