# Technology Stack

**Analysis Date:** 2026-01-18

## Languages

**Primary:**
- TypeScript 5.8.2 - All application code (`tsconfig.json`, `*.tsx`, `*.ts`)

**Secondary:**
- JavaScript - Build scripts, configuration files

## Runtime

**Environment:**
- Browser (client-side React application)
- Node.js (development server via Vite)

**Package Manager:**
- npm - Package management
- Lockfile: `package-lock.json` present (213 packages)

## Frameworks

**Core:**
- React 19.2.3 - UI framework (`App.tsx`, components)
- React Router DOM 7.12.0 - Client-side routing (`App.tsx:24-28`)

**3D/Graphics:**
- Three.js 0.182.0 - 3D rendering engine
- @react-three/fiber 9.5.0 - React renderer for Three.js
- @react-three/drei 10.7.7 - Three.js helpers and abstractions

**Animation:**
- Framer Motion 12.25.0 - Animation library

**Build/Dev:**
- Vite 6.2.0 - Build tool and dev server (`vite.config.ts`)
- TypeScript 5.8.2 - Type checking and compilation

## Key Dependencies

**Critical:**
- @google/genai 1.35.0 - Google Generative AI (Gemini) integration (`vite.config.ts:14-15`)
- react-draggable 4.5.0 - Drag-and-drop functionality (`components/room-planner/`)
- html-to-image 1.11.13 - Screenshot/export functionality
- resend 6.7.0 - Email service (`api/send-quote.ts`)

**Infrastructure:**
- @vitejs/plugin-react 5.0.0 - Vite React plugin
- @types/node 22.14.0 - Node.js type definitions
- @types/three 0.182.0 - Three.js type definitions

## Configuration

**Environment:**
- Environment variables via Vite's loadEnv (`vite.config.ts:6`)
- Required: `GEMINI_API_KEY` for Google AI integration

**Build:**
- `vite.config.ts` - Build configuration with code splitting
- `tsconfig.json` - TypeScript compiler options
- Path alias: `@/*` maps to project root

## Platform Requirements

**Development:**
- Any platform with Node.js and npm
- Browser for viewing application

**Production:**
- Static hosting (Vercel, Netlify, or similar)
- No server-side rendering detected
- Client-side only application with API calls

---

*Stack analysis: 2026-01-18*
*Update after major dependency changes*
