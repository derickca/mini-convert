# Mini-convert

**Miniature Scale Converter** — convert real-world measurements to dollhouse/miniature scale and back.
Presets for 1:6, 1:12, 1:24, 1:48 and 1:144, plus a custom ratio, with a quick-reference table
of common household dimensions at the selected scale.

Installable as a PWA and works offline.

## Install on a phone

- **iOS (Safari):** Share → Add to Home Screen
- **Android (Chrome):** menu (⋮) → Install app

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | App shell, PWA meta tags, service worker registration |
| `app.js` | The converter (React, precompiled from JSX — no build step needed) |
| `styles.css` | Self-contained utility CSS |
| `vendor/` | React 18.3.1 UMD builds, served locally so the app works offline |
| `manifest.json` | PWA manifest |
| `sw.js` | Service worker — caches the app shell |
| `icons/` | 192px, 512px and maskable 512px icons |

All paths are relative, so the site works from a GitHub Pages project subpath.

## Run locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

A service worker requires `https://` or `localhost` — opening `index.html` via `file://`
will render the app but skip offline caching.

## Credit

Built from a Claude artifact.
