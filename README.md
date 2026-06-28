#  Ranganathan Sadhula — 3D AI Innovation Campus Portfolio

An immersive, interactive 3D portfolio built with Next.js, Three.js, and React Three Fiber. Visitors explore a futuristic AI Innovation Campus to discover projects, skills, experience, and more.

---

## ✨ Features

- **Full 3D interactive campus** — explore by walking through the environment
- **Cinematic entrance** — animated intro with glassmorphism UI
- **8 unique campus zones** — Lobby, AI Lab, Projects, GitHub, Skills, Experience, Certifications, Contact
- **Day / Night toggle** — dynamic lighting, stars, clouds
- **Holographic displays** — floating 3D text panels
- **Post-processing effects** — Bloom, Chromatic Aberration, Vignette
- **Custom cursor** — animated dot + ring cursor
- **Smooth camera** — WASD / Arrow keys + mouse look
- **Glassmorphism UI** — side panel for each section
- **Framer Motion animations** — smooth transitions throughout
- **Fully responsive** — works on desktop and mobile

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14, React 18, TypeScript |
| 3D | Three.js, React Three Fiber, Drei |
| Post-processing | @react-three/postprocessing |
| Animation | Framer Motion, GSAP |
| State | Zustand |
| Styling | Tailwind CSS |

---

##  Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

## 🎮 Controls

| Action | Key / Input |
|--------|-------------|
| Move Forward | W / ↑ |
| Move Backward | S / ↓ |
| Move Left | A / ← |
| Move Right | D / → |
| Look Around | Click + Drag mouse |
| Sprint | Hold Shift + WASD |
| Navigate Sections | Left sidebar icons |
| Full Menu | Top-right hamburger |
| Day/Night Toggle | ☀️/🌙 button |
| Mute/Unmute | 🔊 button |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── canvas/             # 3D components
│   │   ├── CampusExperience.tsx
│   │   ├── CampusScene.tsx
│   │   ├── CampusBuildings.tsx
│   │   ├── CampusEnvironment.tsx
│   │   ├── CampusLights.tsx
│   │   ├── HolographicDisplays.tsx
│   │   └── PlayerController.tsx
│   ├── ui/                 # Interface components
│   │   ├── LoadingScreen.tsx
│   │   ├── EntranceScreen.tsx
│   │   ├── HUDOverlay.tsx
│   │   ├── SectionPanel.tsx
│   │   └── CustomCursor.tsx
│   └── sections/           # Content panels
│       ├── LobbySection.tsx
│       ├── AILabSection.tsx
│       ├── ProjectsSection.tsx
│       ├── GitHubSection.tsx
│       ├── SkillsSection.tsx
│       ├── ExperienceSection.tsx
│       ├── CertificationsSection.tsx
│       └── ContactSection.tsx
├── lib/
│   ├── store.ts            # Zustand state
│   └── data.ts             # Portfolio content
└── styles/
    └── globals.css
```

---

## ✏️ Customization

All personal data lives in `src/lib/data.ts`:

```typescript
export const PERSONAL_INFO = { ... }
export const SKILLS = { ... }
export const PROJECTS = [ ... ]
export const EXPERIENCE = [ ... ]
export const CERTIFICATIONS = [ ... ]
```

Edit these to update your portfolio content.

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

---

## 📄 License

Built By Ranganathan Sadhula 

---

> *"Building intelligent digital experiences."*
