
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('we-push-the-sky').then((cache) => cache.addAll([
      './static',
      './index.html',
      './interaction.html',
      './static/css/app.css',
      './static/js/app.js',
      './static/js/lib/jquery1.10.2.min.js',
      './static/js/lib/jquery.rwdImageMaps.min.js',
      './static/js/lib/ios-orientationchange-fix.min.js',
      './static/media/banner-320h.webp',
      './static/media/icons8-chevron-right-96.png',
      './static/media/icons8-chevron-left-96.png',
      './static/media/video.mp4',
      './static/media/vid-poster.png',
      './static/media/Nisha_Abdulla_Edit1_April15-192k.mp3',
      './static/media/91c38a_6ecd823227914975860e8bada-1.webp'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});