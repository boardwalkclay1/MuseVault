const CACHE_NAME = "musevault-cache-v1";

const ASSETS = [
  "index.html",
  "library.html",
  "playlists.html",
  "profile.html",
  "preview.html",
  "styles/main.css",
  "modules/library.js",
  "modules/playlists.js",
  "modules/profile.js",
  "modules/preview.js",
  "modules/storage.js",
  "modules/player.js",
  "modules/ui.js",
  "manifest.json"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
