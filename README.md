# 🌌 Mysteries of Space

A modern, visually stunning, fully responsive interactive website exploring the unknown depths of the universe. Built with a dark cosmic aesthetic, neon glows, canvas animations, and rich interactivity.

---

## ✅ Completed Features

### 🎨 Visual Design
- Deep space dark background (black/blue/purple gradient)
- Animated multi-layer star field on hero canvas with parallax
- Shooting stars with CSS keyframe animation
- Nebula glow overlays with pulsing animations
- Glowing neon text in blue, purple, cyan, green, orange
- Space-themed fonts: **Orbitron**, **Rajdhani**, **Exo 2** (Google Fonts)
- Hover effects on all interactive cards

### ⚡ Special Effects
- **Custom cursor glow** — follows mouse with lag effect + purple glow on hover
- **Scroll progress indicator** — gradient bar at top of page
- **Loading animation** — star canvas forms as loading bar fills
- **Parallax scrolling** — background images move slower than content
- **Smooth CSS + JS scroll animations** — fadeUp, fadeLeft, fadeRight on section reveal
- **Background music toggle** — space ambient music button in navbar

### 📄 Sections
1. **Hero** — Animated stars, shooting stars, hero stats counter animation, CTA buttons
2. **Black Holes** — CSS black hole animation (accretion disk, photon ring, orbiting particles), fact cards
3. **Dark Matter & Dark Energy** — Animated particle network canvas, SVG pie chart of universe composition
4. **Alien Life** — Planet cards with 3D tilt effect, Fermi Paradox quote, SETI bar
5. **Cosmic Events** — 6 event cards (Supernova, GRBs, Neutron Stars, Gravitational Waves, Quasars, Big Bang) with unique CSS animations
6. **Fun Facts** — 6 flip cards (hover/click to reveal mind-blowing facts)
7. **Did You Know?** — 20-fact random fact generator + Space Quiz (8 questions)
8. **Footer** — Carl Sagan quote, nav links, social media icons, NASA credit

### 🧑‍💻 Technical
- Fully responsive — works on mobile, tablet, desktop
- Semantic HTML5 structure
- IntersectionObserver for scroll-triggered animations
- Canvas API: stars, particles, cosmic nebulas, orbiting particles
- Clean, commented code across 4 files

---

## 📁 File Structure

```
index.html          — Full HTML structure (8 sections + footer)
css/
  └── style.css     — All styles, animations, responsive breakpoints
js/
  ├── stars.js      — Canvas engines (loader, star field, particles, cosmic, interactive)
  └── main.js       — Interactivity (loader, cursor, scroll, quiz, DYK, music, etc.)
```

---

## 🌐 Entry Points

| Path | Description |
|------|-------------|
| `/` or `index.html` | Full website |
| `#hero` | Hero section |
| `#black-holes` | Black Holes section |
| `#dark-matter` | Dark Matter & Energy section |
| `#alien-life` | Alien Life section |
| `#cosmic-events` | Cosmic Events section |
| `#fun-facts` | Fun Facts flip cards |
| `#interactive` | Did You Know + Quiz |

---

## 🔧 Features Not Yet Implemented

- Real background music file (requires an audio CDN or file upload)
- 3D WebGL galaxy renderer
- Newsletter/contact form
- Additional quiz questions expansion
- Space object search/filter
- Animated constellation lines
- Mars/Moon surface explorer

---

## 🚀 Recommended Next Steps

1. Add a real `.mp3` ambient space audio file (replace placeholder URL in `<audio>`)
2. Expand quiz to 20+ questions
3. Add a "Space News" section pulling from a space RSS feed
4. Add WebGL Three.js 3D planet viewer
5. Add more CSS animations for the cosmic events cards
6. Add a "Timeline of the Universe" interactive horizontal scroller

---

## 🎯 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, animations, grid/flexbox, backdrop-filter
- **Vanilla JavaScript** — No frameworks, pure ES6+
- **Canvas API** — 5 animated canvas elements
- **Google Fonts** — Orbitron, Rajdhani, Exo 2
- **Font Awesome 6** — Icon set via CDN

---

*Built for educational purposes. Inspired by NASA, ESA, and the James Webb Space Telescope. "We are all made of star stuff." — Carl Sagan*
