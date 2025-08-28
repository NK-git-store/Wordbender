self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    clients.claim();
});

// Optional: passthrough fetch (не обязательно, но явно показывает намерение)
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});