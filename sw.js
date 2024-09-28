const CACHE_NAME = "pain-management-cache-v1";
const urlsToCache = [
  "/painApp/",
  "/painApp/index.html",
  "/painApp/styles.css",
  "/painApp/script.js",
  "/painApp/favicon.ico",
  "/painApp/icon-192x192.png",
  "/painApp/icon-512x512.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error("Failed to cache resources:", error);
      })
  );
});

// Fetch event to serve cached content
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
