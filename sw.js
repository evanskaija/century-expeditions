const CACHE_NAME = 'century-adventures-cache-v48';
const PRECACHE_URLS = [
  'index.html',
  'mobile-reference.css',
  'mobile-reference.js',
  'site-responsive.css',
  'site-effects.css',
  'site-effects.js',
  'destinations.html',
  'serengeti.html',
  'ngorongoro.html',
  'tarangire.html',
  'manyara.html',
  'nyerere.html',
  'ruaha.html',
  'mikumi.html',
  'katavi.html',
  'katavi.css',
  'gombe.html',
  'gombe.css',
  'zanzibar.html',
  'zanzibar.css',
  'family.html',
  'family.css',
  'family.js',
  'honeymoon.html',
  'honeymoon.css',
  'honeymoon.js',
  'migration.html',
  'migration.css',
  'migration.js',
  'volunteer.html',
  'volunteer.css',
  'volunteer.js',
  'vehicles.html',
  'vehicles.css',
  'vehicles.js',
  'gallery.html',
  'gallery.css',
  'gallery.js',
  'health-safety.html',
  'health-safety.css',
  'health-safety.js',
  'kilimanjaro.html',
  'kilimanjaro.css',
  'booking-payment.html',
  'booking-payment.css',
  'assets/booking-hero.jpg',
  'travel-guide.html',
  'travel-guide.css',
  'travel-guide.js',
  'travel-guide-content.json',
  'travel-guide-content.js',
  'assets/guide-hero.jpg',
  'assets/guide-town.jpg',
  'assets/guide-culture.jpg',
  'assets/guide-vehicle.jpg',
  'packages.html',
  'packages.css',
  'packages.js',
  'packages-data.js',
  'mikumi.css',
  'ruaha.css',
  'nyerere.css',
  'manyara.css',
  'tarangire.css',
  'ngorongoro.css',
  'serengeti.css',
  'safaris.html',
  'about.html',
  'contact.html',
  'index.css',
  'index.js',
  'manifest.json',
  'assets/logo.png'
];

/* Ã¢â€â‚¬Ã¢â€â‚¬ Install: precache core assets & take over immediately Ã¢â€â‚¬Ã¢â€â‚¬ */
self.addEventListener('install', event => {
  self.skipWaiting();               // Activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
  );
});

/* Ã¢â€â‚¬Ã¢â€â‚¬ Activate: purge ALL old caches & claim clients Ã¢â€â‚¬Ã¢â€â‚¬ */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())   // Take control of all open pages
  );
});

/* Ã¢â€â‚¬Ã¢â€â‚¬ Fetch: NETWORK-FIRST strategy Ã¢â€â‚¬Ã¢â€â‚¬ */
// Always try the network first so updates show immediately.
// Fall back to cache only when offline.
self.addEventListener('fetch', event => {
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Got a fresh response Ã¢â‚¬â€ cache it for offline use
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed Ã¢â‚¬â€ serve from cache (offline mode)
        return caches.match(event.request);
      })
  );
});
