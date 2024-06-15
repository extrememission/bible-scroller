const CACHE_NAME = 'bible-scroller-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/scripts.js',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    'https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
