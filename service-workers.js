const CACHE_NAME = "supernova1.1";
var urlsToCache = [
  "/",
  "index.html",
  "manifest.json",
  "service-workers.js",
  "/pages/nav.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/harga.html",
  "/pages/footer.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/css/icon.css",
  "/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/sw.js",
  "/js/jquery-2.1.1.min.js",
  "/img/alat.jpg",
  "/img/home.jpg",
  "/img/icon192.png",
  "/img/icon512.png",
  "/img/par1.jpg",
  "/img/par2.jpg",
  "/img/rekaman.jpg",
  "/img/studio1.jpg",
  "/img/studio2.jpg",
  "/img/studio3.jpg",
  "/img/studio4.jpg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

