import { build, files, timestamp } from "$service-worker";

const CACHE_NAME = "climbwhere-sg-cache-v4";

self.addEventListener("install", function (event) {
  console.log("Install");
  caches.open(CACHE_NAME).then((cache) => cache.addAll(files));
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

self.addEventListener("activate", function (event) {
  console.log("Activate");
});
