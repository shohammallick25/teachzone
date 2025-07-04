const CACHE_NAME = "teachzone-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/main.css",
  "/js/script.js",
  "/images/logo.png",
  // add all other important files you want offline
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
