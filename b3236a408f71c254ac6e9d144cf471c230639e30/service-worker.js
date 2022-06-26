/*self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('site-store').then((cache) => cache.addAll([
      './static',
      './index.html',
      './interaction.html',
      './static/css/app.css',
      './static/js/app.js'
    ])),
  );
});
*/
self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});