# Portfolio — Alex Voss

A dark, editorial portfolio website built with vanilla HTML, CSS, and JavaScript. Designed for deployment on Vercel via GitHub.

## Stack
- Vanilla HTML5 / CSS3 / JS (zero dependencies)
- Google Fonts (Unbounded, Cormorant Garamond, DM Mono)
- Unsplash placeholder images

## Structure
```
portfolio/
├── index.html        ← Home page
├── work.html         ← Work / case studies
├── about.html        ← About page
├── css/
│   └── style.css     ← All styles
└── js/
    └── main.js       ← Cursor, scroll reveal, nav behavior
```

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the GitHub repo
4. Leave all settings as default (Vercel auto-detects static sites)
5. Click Deploy — done ✓

## Customization

Replace placeholder content in each HTML file:
- Name: `Alex Voss` → your name
- Email: `hello@alexvoss.co` → your email
- Role/tagline: update in `<title>`, `<meta>`, and hero sections
- Social links: search for `href="#"` in nav/footer
- Projects: update each `.work-item` in `work.html`
- Images: swap Unsplash URLs for your own project screenshots

## Features
- Custom cursor with grow effect on hover
- Scroll-triggered reveal animations
- Sticky project nav on Work page (highlights active section)
- Infinite marquee ticker
- Auto-hiding nav on scroll down
- Grain texture overlay
- Fully responsive (mobile-first breakpoints at 768px)
