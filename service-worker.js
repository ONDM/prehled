const cacheName = 'prehled-cache-v2';

self.addEventListener('install', (event) =>
{
  console.log('Service Worker Installed');
  event.waitUntil(
  caches.open(cacheName).then((cache) =>
  {
    return cache.addAll([
      '/prehled/',
      '/prehled/manifest.json',
      '/prehled/style.css',
      '/prehled/script.js',
      '/prehled/favicon.png',
      '/prehled/logo.png',
      '/prehled/HTML/html1.jpg',
      '/prehled/html2.jpg',
      '/prehled/HTML/html3.jpg',
      '/prehled/html4.jpg',
      '/prehled/HTML/html5.jpg',
      '/prehled/html6.jpg',
      '/prehled/HTML/html7.jpg',
      '/prehled/html8.jpg',
      '/prehled/html9.jpg',
      '/prehled/CSS/css1.jpg',
      '/prehled/CSS/css2.jpg',
      '/prehled/CSS/css3.jpg',
      '/prehled/CSS/css4.jpg',
      '/prehled/CSS/css5.jpg',
      '/prehled/CSS/css6.jpg',
      '/prehled/CSS/css7.jpg',
      '/prehled/JS/js1.jpg',
      '/prehled/JS/js2.jpg',
      '/prehled/JS/js3.jpg',
      '/prehled/JS/js4.jpg',
      '/prehled/JS/js5.jpg',
      '/prehled/JS/js6.jpg',
      '/prehled/JS/js7.jpg',
      '/prehled/JS/js8.jpg',
      '/prehled/JS/js9.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) =>
{
  event.respondWith(
  caches.match(event.request).then((response) =>
  {
    return response || fetch(event.request);
  })
  );
});
