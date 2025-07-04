const CACHE_NAME = "teachzone-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/normalize.css",
  "/css/utilities.css",
  "/css/main.css",
  "/plugins/slick-1.8.1/slick/slick.css",
  "/plugins/slick-1.8.1/slick/slick-theme.css",
  "/js/script.js",
  "/images/logo.png"
];

// INSTALL: cache essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // activate immediately
});

// ACTIVATE: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// FETCH: serve cache or network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
