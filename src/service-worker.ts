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
