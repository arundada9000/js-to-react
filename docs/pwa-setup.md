# PWA Setup Guide

**Author:** [Arun Neupane](https://arunneupane.netlify.app) | [@arundada9000](https://github.com/arundada9000)

![CFC Logo](../assets/logos/cfc-logo.png)

**Repository:** [github.com/arundada9000/js-to-react](https://github.com/arundada9000/js-to-react)  
**Live Site:** [pre-mern.vercel.app](https://pre-mern.vercel.app)

> ✅ **Status:** Implemented. The app is now a fully installable Progressive Web App.

---

## Implementation Summary

| Feature | Status | File |
|---------|--------|------|
| Web App Manifest | ✅ Done | `/manifest.json` |
| Service Worker | ✅ Done | `/sw.js` |
| Offline 404 Page | ✅ Done | `/404.html` |
| Apple Touch Icons | ✅ Done | `assets/icons/` |
| PWA Meta Tags | ✅ Done | `index.html` |
| HTTPS | ✅ Done | Vercel |

## Checklist

- [x] App icons (all required sizes in `assets/icons/`)
- [x] `manifest.json` with screenshots
- [x] Service worker with cache-first strategy
- [x] Offline fallback (404 page)
- [x] Meta tags for PWA (`theme-color`, `apple-touch-icon`)
- [x] JSON-LD structured data for SEO
- [x] HTTPS deployment (Vercel)
- [x] Lighthouse audit verification

## Caching Strategy

The service worker (`/sw.js`) uses three caches:

| Cache | Strategy | Contents |
|-------|----------|----------|
| `js-to-react-static-v2` | Cache-first | Local CSS, JS, assets, manifest |
| `js-to-react-cdn-v2` | Network-first (stale) | CDN resources (Prism, Font Awesome, Google Fonts) |
| `js-to-react-v2` | Cache-first | App shell pages |

## Files Created

### `/manifest.json`
Web app manifest with all 10 icon sizes, theme/background colors, screenshots for the PWA install prompt, and full metadata.

### `/sw.js`
Service worker with:
- Cache-first strategy for local assets (instant loading)
- Network-first with cache fallback for CDN resources
- Offline navigation fallback to 404 page
- Self-skip waiting and clients claim for updates

### `/404.html`
Styled 404 page matching the app design. Used as both a standard 404 and offline fallback.

## Testing

Run Lighthouse audit in Chrome DevTools:
1. Open DevTools -> Lighthouse tab
2. Check **Progressive Web App**
3. Generate report
4. Fix any issues

To test offline:
1. Open DevTools -> Application -> Service Workers
2. Check **Offline** checkbox
3. Reload the page - it should load from cache

---

*Guide maintained by [Arun Neupane](https://arunneupane.netlify.app)*
