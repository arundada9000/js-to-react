var CACHE_NAME = "js-to-react-v2";
var STATIC_CACHE = "js-to-react-static-v2";
var CDN_CACHE = "js-to-react-cdn-v2";

var urlsToCache = [
  "/",
  "/index.html",
  "/404.html",
  "/css/styles.css",
  "/js/curriculum.js",
  "/js/app.js",
  "/js/darkmode.js",
  "/js/projects.js",
  "/js/pomodoro-lofi.js",
  "/js/coderunner.js",
  "/js/gamification.js",
  "/js/flashcards.js",
  "/js/contextmenu.js",
  "/js/console-easter-egg.js",
  "/manifest.json",
  "/assets/logos/cfc-logo.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-512x512.png",
];

var cdnPatterns = [
  "cdnjs.cloudflare.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "cdn.jsdelivr.net",
  "www.youtube.com",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) {
            return (
              name !== CACHE_NAME &&
              name !== STATIC_CACHE &&
              name !== CDN_CACHE
            );
          })
          .map(function (name) {
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

function isCdnRequest(url) {
  return cdnPatterns.some(function (pattern) {
    return url.indexOf(pattern) !== -1;
  });
}

function isStaticAsset(url) {
  var path = new URL(url).pathname;
  return (
    path.indexOf("/assets/") === 0 ||
    path.indexOf("/js/") === 0 ||
    path.indexOf("/css/") === 0 ||
    path === "/" ||
    path === "/index.html" ||
    path === "/404.html" ||
    path === "/manifest.json"
  );
}

self.addEventListener("fetch", function (event) {
  var requestUrl = event.request.url;

  if (requestUrl.indexOf("http") !== 0) return;

  if (isCdnRequest(requestUrl)) {
    event.respondWith(
      caches.open(CDN_CACHE).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  if (isStaticAsset(requestUrl)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          if (response) return response;
          return fetch(event.request).then(function (networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request).catch(function () {
          if (event.request.mode === "navigate") {
            return caches.match("/404.html");
          }
        })
      );
    })
  );
});
