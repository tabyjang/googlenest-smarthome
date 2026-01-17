# Codebase Structure

**Analysis Date:** 2026-01-18

## Directory Layout

```
googlenest2me/
├── .claude/           # Claude Code configuration
├── .planning/         # GSD project planning documents
│   └── codebase/     # Codebase mapping documents
├── api/              # API/service integration functions
├── components/       # React components
│   ├── demo/        # Demo/showcase components
│   ├── estimator/   # Cost estimator feature
│   ├── hero/        # Hero section components
│   ├── layout/      # Layout components (Nav, Footer, Layout)
│   ├── products/    # Product display components
│   ├── room-planner/ # 3D room planning feature
│   └── three/       # Three.js/R3F components
├── doc/              # Documentation
├── pages/            # Page components for routes
├── public/           # Static assets
│   └── assets/      # Images, icons, etc.
├── App.tsx           # Main application component
├── constants.tsx     # Application constants
├── index.html        # HTML entry point
├── index.tsx         # React entry point
├── types.ts          # TypeScript type definitions
├── package.json      # Project manifest
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite build configuration
```

## Directory Purposes

**api/**
- Purpose: External service integrations
- Contains: API client functions (*.ts)
- Key files: `send-quote.ts` - Email service integration
- Subdirectories: None (flat structure)

**components/**
- Purpose: Reusable React components organized by feature
- Contains: Component files (*.tsx)
- Key features:
  - `demo/` - Interactive product demos
  - `estimator/` - Quote/cost estimation UI
  - `hero/` - Homepage hero section
  - `layout/` - Navigation, Footer, Layout wrapper
  - `products/` - ProductCard, ProductGrid for product display
  - `room-planner/` - Complete 3D room planning feature with drag-drop
  - `three/` - Three.js specific components
- Pattern: Feature-based organization

**pages/**
- Purpose: Top-level page components for routes
- Contains: Page components loaded by React Router
- Key files: HomePage, ProductsPage, ProductDetailPage, ExperiencePage
- Pattern: One file per route

**public/**
- Purpose: Static assets served directly
- Contains: Images, icons, fonts
- Subdirectories: `assets/` for organized asset management
- Access: Direct URL paths (e.g., `/assets/logo.png`)

**.planning/**
- Purpose: GSD (Get Stuff Done) project planning
- Contains: Project documentation, roadmap, phase plans
- Subdirectories: `codebase/` for architecture documentation

## Key File Locations

**Entry Points:**
- `index.html` - HTML entry point with root div
- `index.tsx` - React application entry (renders App)
- `App.tsx` - Main component with routing configuration

**Configuration:**
- `vite.config.ts` - Build configuration, dev server, plugins
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies, scripts, project metadata

**Core Logic:**
- `components/` - All UI and feature logic
- `pages/` - Page-level components
- `api/` - External service integrations

**Types:**
- `types.ts` - Shared TypeScript types and interfaces
- `constants.tsx` - Application-wide constants

**Documentation:**
- `doc/` - Project documentation
- `.planning/` - GSD planning documents

## Naming Conventions

**Files:**
- PascalCase.tsx - React components (`App.tsx`, `HomePage.tsx`)
- kebab-case.ts - Utility/API files (`send-quote.ts`)
- lowercase.json - Configuration files (`package.json`, `tsconfig.json`)

**Directories:**
- kebab-case - All directories (`room-planner/`, `products/`)
- Feature-based naming - Describes purpose (estimator/, hero/)

**Special Patterns:**
- index.ts/tsx - Barrel exports for directories
- App.tsx - Main application component (not in pages/)
- constants.tsx - Application constants (TSX extension despite no JSX)

## Where to Add New Code

**New Page:**
- Implementation: `pages/NewPage.tsx`
- Route: Add to `App.tsx` with lazy loading
- Layout: Wrap in `<Layout>` component

**New Feature:**
- Create directory: `components/feature-name/`
- Add components: Feature components in new directory
- Export: Use `index.ts` for clean imports

**New Component:**
- Reusable: `components/` (top level or in feature directory)
- Page-specific: Keep in `components/` with descriptive naming
- 3D-specific: `components/three/`

**New API Integration:**
- Implementation: `api/service-name.ts`
- Pattern: Export functions for service calls

**Static Assets:**
- Images/icons: `public/assets/`
- Organized by type if needed (images/, icons/)

## Special Directories

**.planning/**
- Purpose: GSD project planning and tracking
- Source: Created by /gsd commands
- Committed: Yes (project documentation)

**public/**
- Purpose: Static assets for production build
- Source: Manually added or generated
- Committed: Yes (assets needed for app)

---

*Structure analysis: 2026-01-18*
*Update when directory structure changes*
