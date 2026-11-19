# NEX Creative Studio

NEX is a browser-based vertical video / Reels design studio.

## Project structure

- `index.html` — application entry point
- `assets/css/style.css` — responsive NEX interface
- `assets/js/app.js` — application logic
- `assets/js/export.js` — video export capability detection and export pipeline

## Run locally

Open `index.html` in a modern browser, or serve the repository with a local static web server.

## Deploy with GitHub Pages

The included GitHub Actions workflow publishes the repository root to GitHub Pages when changes are pushed to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Export note

The export module must verify the actual browser codec support before offering MP4. It must never rename WebM output to `.mp4`. MP4 export will be implemented and tested against the target browsers.
