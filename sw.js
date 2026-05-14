var CACHE_NAME = "monthly-tracker-v1";
var URLS_TO_CACHE = [".", "index.html", "manifest.json",
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"];
self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(URLS_TO_CACHE); }));
  self.skipWaiting();
});
self.addEventListener("activate", function(event) {
  event.waitUntil(caches.keys().then(function(names) {
    return Promise.all(names.filter(function(n) { return n !== CACHE_NAME; }).map(function(n) { return caches.delete(n); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function(event) {
  event.respondWith(fetch(event.request).catch(function() { return caches.match(event.request); }));
});