# PWA Setup Guide

**Author:** [Arun Neupane](https://arunneupane.netlify.app) | [@arundada9000](https://github.com/arundada9000)

![CFC Logo](../assets/logos/cfc-logo.png)

**Repository:** [github.com/arundada9000/js-to-react](https://github.com/arundada9000/js-to-react)  
**Live Site:** [pre-mern.vercel.app](https://pre-mern.vercel.app)

> ⚠️ **Status:** Planned - implementation pending icon assets.  
> This guide outlines the steps to convert this project into a fully installable Progressive Web App.

---

## Checklist

- [ ] App icons (all required sizes)
- [ ] `manifest.json`
- [ ] Service worker
- [ ] Offline fallback page
- [ ] Meta tags for PWA
- [ ] HTTPS deployment
- [ ] Lighthouse audit

## 1. App Icons

Required icon sizes for PWA:

| Size | Purpose |
|------|---------|
| 48×48 | Browser |
| 72×72 | - |
| 96×96 | - |
| 128×128 | - |
| 144×144 | - |
| 152×152 | iOS touch icon |
| 192×192 | Android splash |
| 384×384 | - |
| 512×512 | Install manifest |

Current logos in `assets/logos/`:
- `cfc-logo.png`
- `CFC Rupandehi Official Logo.png`

Once proper icons are ready, place them in `assets/icons/`.

## 2. Manifest JSON

Create `manifest.json` in the root:

```json
{
  "name": "JS → React Roadmap",
  "short_name": "JS→React",
  "description": "A structured JavaScript curriculum preparing you for React",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#f5f5f7",
  "theme_color": "#5856d6",
  "orientation": "any",
  "icons": [
    {
      "src": "assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 3. Service Worker

Create `sw.js` in the root:

```javascript
const CACHE_NAME = 'js-to-react-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/curriculum.js',
  '/js/app.js',
  '/js/darkmode.js',
  '/js/projects.js',
  '/js/pomodoro-lofi.js',
  '/js/coderunner.js',
  '/js/gamification.js',
  '/js/flashcards.js',
  '/js/contextmenu.js'
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

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});
```

## 4. Register Service Worker

Add to `index.html` before closing `</body>`:

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
</script>
```

## 5. Offline Page

Create `offline.html` as a fallback when the user is offline and the page isn't cached.

## 6. PWA Meta Tags

Already added (in `index.html`):
- `<meta name="theme-color" content="#5856d6">`

Add iOS-specific:
```html
<link rel="apple-touch-icon" href="assets/icons/icon-152.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
```

## 7. Testing

Run Lighthouse audit in Chrome DevTools:
1. Open DevTools → Lighthouse tab
2. Check **Progressive Web App**
3. Generate report
4. Fix any issues

## 8. Deployment

Ensure HTTPS is enabled on your hosting provider. Vercel (pre-mern.vercel.app) provides HTTPS by default.

---

*Guide maintained by [Arun Neupane](https://arunneupane.netlify.app)*
