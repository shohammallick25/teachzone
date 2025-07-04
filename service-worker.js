const CACHE_NAME = "teachzone-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/normalize.css",
  "/css/main.css",
  "/js/script.js",
  "/images/logo.png",
  // add other assets
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
