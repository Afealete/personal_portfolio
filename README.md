# Personal Portfolio

A modern, responsive personal portfolio website built with plain HTML and CSS. This repository contains the source files for a dark-themed, glassmorphism-styled portfolio showcasing projects, resume, and contact information.

---

## Live Demo
If you've hosted this repository (recommended: GitHub Pages), the site will be available at `https://<your-username>.github.io/<repo-name>/` after enabling Pages.

## Features
- Fully responsive layout (desktop, tablet, mobile)
- Fixed navigation that adapts: top bar on large screens, bottom bar on small screens
- Glassmorphism-style cards and containers with subtle gradients and shadows
- Sections: Home, About, Resume, Portfolio, Contact
- Accessible, semantic HTML markup
- Minimal dependencies — no JavaScript frameworks required (optional small JS for mobile hamburger toggle)

## Files
- `index.html` - Primary HTML page containing merged content (home, about, resume, portfolio, contact)
- `styles.css` - Main stylesheet with responsive breakpoints and visual styling
- `me.jpg` - Profile image used on the About section
- `RESUME.pdf` - Downloadable resume file

## Installation / Local development
1. Clone the repo:

   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>

2. Open the site locally:

   - Double-click `index.html` to open in your browser, or
   - Serve with a simple HTTP server (recommended to avoid any local file restrictions):

```powershell
# Windows (PowerShell)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Customization
- Update the content inside `index.html` (sections and text) to reflect your personal details.
- Replace `me.jpg` with your headshot (keep the same filename or update the `img` src).
- Tweak colors and spacing in `styles.css` to match your brand.

