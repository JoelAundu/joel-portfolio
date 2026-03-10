# Joel Mosio Aundu — Portfolio

Personal portfolio website built with React, Three.js, GSAP, and Framer Motion.

Live at: **joelaundu.dev** *(deploy to set your domain)*

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Foundation |
| TypeScript | Type safety |
| Tailwind CSS | Styling + dark/light mode |
| Framer Motion | Scroll animations, page transitions |
| GSAP | Hero name reveal, text animations |
| Three.js + React Three Fiber | 3D background scene (particles + torus knot) |
| Lenis | Ultra-smooth scrolling |
| i18next | EN / ES / FR language switching |

---

## Features

- 3D animated hero with rotating torus knot and 2,500 particle field
- GSAP staggered letter-by-letter name reveal on load
- Animated role title cycling (Software Engineer → Frontend Architect → Full Stack Developer)
- Custom light blue cursor with spring-follow ring (desktop only)
- Scroll progress bar at top of page
- Dark mode / Light mode with smooth transition (persists across visits)
- Language switcher: English / Spanish / French (persists across visits)
- 3D tilt effect on project cards (mouse-reactive)
- Framer Motion scroll-triggered reveals on every section
- Fully responsive (mobile, tablet, desktop)
- Deployed on Vercel (free)

---

## Sections

1. **Hero** — Name, animated role, 3D scene, social links
2. **About** — Bio, stats (7+ years, 10K+ users, 50K+ farmers)
3. **Skills** — Frontend, Backend, Tools & DevOps, Mobile & Testing
4. **Projects** — Real-Time Task Manager, Enterprise OMS, Agricultural Analytics App
5. **Experience** — Solink (2022–Present), Aerobotics (2019–2022)
6. **Contact** — Form + direct links (email, LinkedIn, GitHub, phone)

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
joel-portfolio/
├── src/
│   ├── canvas/
│   │   └── HeroScene.tsx         # Three.js 3D scene
│   ├── components/
│   │   ├── Navbar.tsx             # Fixed nav + theme toggle + language switcher
│   │   ├── Cursor.tsx             # Custom animated cursor
│   │   ├── ScrollProgress.tsx     # Top scroll progress bar
│   │   ├── Hero.tsx               # Hero section with GSAP animation
│   │   ├── About.tsx              # About + stats
│   │   ├── Skills.tsx             # Skills by category
│   │   ├── Projects.tsx           # Project cards with 3D tilt
│   │   ├── Experience.tsx         # Timeline + education
│   │   ├── Contact.tsx            # Contact form + social links
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useTheme.ts            # Dark/light mode with localStorage
│   │   └── useLenis.ts            # Smooth scroll setup
│   ├── locales/
│   │   ├── en.json                # English
│   │   ├── es.json                # Spanish
│   │   └── fr.json                # French
│   ├── i18n.ts                    # i18next setup
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                  # Tailwind + custom styles
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## Customization

### Update your projects
Edit `src/components/Projects.tsx` — update the `projects` array with your GitHub/live links.

### Update colors
Edit `tailwind.config.js` — change `accent` from `#38bdf8` to any color you like.

### Add a photo
In `src/components/About.tsx` — add an `<img>` tag in the right column.

### Add EmailJS to contact form
In `src/components/Contact.tsx` — replace the `mailto:` fallback with your EmailJS credentials.

---

## Deployment (Vercel — Free)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Click **Deploy** — done

Custom domain: Vercel Settings → Domains → Add your domain.

---

## Contact

**Joel Mosio Aundu**
- Email: joel960801@gmail.com
- LinkedIn: [linkedin.com/in/joelaundu](https://linkedin.com/in/joelaundu)
- GitHub: [github.com/JoelAundu](https://github.com/JoelAundu)
- Location: Cape Town, South Africa
