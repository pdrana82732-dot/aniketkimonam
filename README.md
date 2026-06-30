# A Journey of Love — Aniket & Monam

A modern, premium, fully responsive wedding memories website built with React.js.

## Features

- Transparent navbar that turns into a glassmorphism bar on scroll, with mobile hamburger menu
- Full-screen hero video with floating gold particles, parallax-style overlay, and a live countdown to the wedding date
- Animated Love Story timeline (Framer Motion scroll reveals)
- Wedding Events section (Engagement, Haldi, Mehendi, Sangeet, Wedding, Reception) with hover animations
- Photo Gallery: masonry layout, category filters, search, infinite scroll, lightbox modal with zoom/download/share, full-screen gallery mode
- Video Gallery: hover-to-preview cards + modal video player
- Family Section with circular animated profile cards
- Auto-scrolling Guest Wishes carousel
- Footer with social links and back-to-top button
- Bonus: background music toggle, dark/light mode, floating hearts, confetti celebration on the contact form, wedding invitation download, QR code to share the site
- Lazy-loaded route-based code splitting, lazy-loaded images, SEO meta tags

## Tech Stack

- React 19 + Vite
- React Router v7
- Framer Motion
- react-icons
- canvas-confetti
- Plain CSS (CSS variables as design tokens) — no UI framework lock-in

## Installation

```bash
npm install
npm run dev        # start local dev server
npm run build      # production build -> /dist
npm run preview    # preview the production build
```

## Replacing Placeholder Media

This project ships with auto-generated placeholder images (gold-framed labels) so it runs out of the box.
Swap in real assets at the same paths to make it yours:

- `public/images/<event>/*.jpg` — event & gallery photos
- `public/images/family/*.jpg` — family member portraits
- `public/images/hero/poster.jpg` — hero fallback poster image
- `public/videos/hero-bg.mp4` — hero background video
- `public/videos/background-music.mp3` — background music
- `public/videos/*.mp4` — video gallery clips (see `public/videos/README.txt`)
- `public/wedding-invitation.pdf` — replace with the real invitation
- `public/favicon/favicon.png` — replace with a real favicon

Update the matching entries in `src/data/photos.js`, `videos.js`, `events.js`, and `family.js` if you add/remove items
or change captions, categories, or dates.

## Folder Structure

```
wedding-memories/
├── public/
│   ├── images/{hero,engagement,haldi,mehendi,sangeet,wedding,reception,family}/
│   ├── videos/
│   ├── favicon/
│   └── wedding-invitation.pdf
├── src/
│   ├── components/
│   │   ├── Navbar/  Footer/  Hero/  Gallery/  VideoGallery/
│   │   ├── Timeline/ (Timeline.jsx + EventCard.jsx)
│   │   ├── FamilySection/  PhotoModal/  ScrollToTop/  Loader/
│   │   ├── GuestWishes/  MusicToggle/ (music hook, floating hearts, confetti)
│   ├── pages/ (Home, LoveStory, Events, Gallery, Videos, Family, Contact)
│   ├── data/ (photos.js, videos.js, events.js, family.js, wishes.js)
│   ├── context/ (ThemeContext for dark/light mode)
│   ├── routes/ (lazy-loaded route definitions)
│   ├── styles/global.css (design tokens & base styles)
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Design Tokens

| Token        | Hex       |
|--------------|-----------|
| Luxury Gold  | #D4AF37 |
| Ivory White  | #FFFFF0 |
| Royal Black  | #121212 |
| Champagne    | #F7E7CE |

Fonts: Playfair Display (headings) + Poppins (body/UI), loaded via Google Fonts in index.html.

## Notes

- Respects prefers-reduced-motion
- Keyboard-navigable lightbox (Esc / Arrow keys) and visible focus states
- All images use loading="lazy"; pages are code-split via React.lazy

Made with care for Aniket & Monam.
