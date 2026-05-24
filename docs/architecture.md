# Architecture

**Author:** [Arun Neupane](https://arunneupane.netlify.app) | [@arundada9000](https://github.com/arundada9000)

![CFC Logo](../assets/logos/cfc-logo.png)

**Repository:** [github.com/arundada9000/js-to-react](https://github.com/arundada9000/js-to-react)  
**Live Site:** [pre-mern.vercel.app](https://pre-mern.vercel.app)

---

## Overview

The app is a **single-page application** built with vanilla JavaScript. No frameworks — just HTML, CSS, and JS.

## Data Flow

```
curriculum.js (data) → app.js (renders UI)
                           ↓
                    User interacts
                           ↓
                    localStorage (state persistence)
```

## Module Breakdown

### `js/curriculum.js`
Central data file containing all 10 phases of curriculum. Each phase has:
- `phase` — number
- `title`, `description`
- `icon`, `color` — for UI styling
- `topics` — array of topic tags
- `exercises` — array of exercise objects with `question`, `hint`, `expectedResult`, `solutionCode`

### `js/app.js`
Main application controller:
- Renders sidebar navigation
- Renders curriculum cards
- Handles search, filtering
- Manages collapse/expand
- Tracks progress (localStorage)
- Keyboard shortcuts
- Sparkle animations
- Download as Markdown

### `js/projects.js`
Project showcase section — renders project cards with code tabs, difficulty badges, and copy functionality.

### `js/darkmode.js`
Theme management:
- Toggle between light/dark
- Persists preference in localStorage
- Applies `data-theme` attribute to `<html>`

### `js/pomodoro-lofi.js`
Productivity widgets:
- Pomodoro countdown timer
- Lo-Fi YouTube player
- Toggle visibility on exercise completion

### `js/coderunner.js`
In-browser code execution:
- Textarea editor with terminal UI
- `Function()` execution sandbox
- Fullscreen mode
- Console output capture

### `js/gamification.js`
Progress gamification:
- Completion tracking
- Visual celebrations (canvas-confetti)

### `js/flashcards.js`
Study mode:
- Creates card-flip interface
- Cycles through exercises
- Front (question), back (solution)

### `js/contextmenu.js`
Custom right-click context menu with actions.

## Styling Architecture

CSS uses **custom properties** (design tokens) defined in `:root`. All colors, spacing, shadows, and transitions are centralized.

Media queries at 900px and 480px for responsive breakpoints. Includes `prefers-reduced-motion` and `@media print` support.

## State Management

State is managed via:
- **localStorage** — for persisted data (completed exercises, dark mode preference, pomodoro state)
- **JavaScript closures** — within `DOMContentLoaded` callback
- **DOM attributes** — class toggles for UI state

## PWA Readiness

The app is structured for easy PWA conversion:
- Single `index.html` entry point
- All assets self-hosted (except CDN fonts/icons)
- Minimal external dependencies
- CSS and JS already modular

*See [PWA Setup](pwa-setup.md) for the implementation plan.*
