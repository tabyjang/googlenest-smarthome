# Architecture

**Analysis Date:** 2026-01-18

## Pattern Overview

**Overall:** Client-Side React SPA (Single Page Application) with 3D Visualization

**Key Characteristics:**
- Component-based React architecture
- Client-side routing with React Router
- 3D room planner using Three.js
- Code-split pages for performance
- No server-side rendering

## Layers

**Presentation Layer:**
- Purpose: UI components and page layouts
- Contains: React components (`.tsx` files)
- Location: `components/`, `pages/`
- Depends on: No backend layer (client-side only)
- Used by: React Router routes in `App.tsx`

**Component Categories:**
- Layout components: `components/layout/` (Navigation, Footer, Layout wrapper)
- Feature components: `components/room-planner/`, `components/estimator/`, `components/demo/`
- Product components: `components/products/` (ProductCard, ProductGrid)
- 3D components: `components/three/` (Three.js/R3F components)

**API/Service Layer:**
- Purpose: External service integrations
- Location: `api/` directory
- Contains: API client functions
- Example: `api/send-quote.ts` for email service

**Routing Layer:**
- Purpose: Client-side navigation
- Location: `App.tsx`
- Pattern: Lazy-loaded routes for code splitting
- Routes: /, /products, /products/:productId, /experience

## Data Flow

**Page Navigation:**

1. User clicks link or navigates to URL
2. React Router matches route in `App.tsx`
3. Lazy load page component (HomePage, ProductsPage, etc.)
4. Page renders within `<Layout>` wrapper
5. Components fetch data or interact with services as needed

**3D Room Planner Flow:**

1. User interacts with room planner (`components/room-planner/RoomPlanner.tsx`)
2. Drag products from ProductDock to PlannerCanvas
3. Three.js renders 3D scene via React Three Fiber
4. DraggableProduct components handle user interactions
5. State managed locally (no backend persistence)

**State Management:**
- React local state (useState, useContext likely)
- No global state management library detected (Redux, Zustand, etc.)

## Key Abstractions

**Page Components:**
- Purpose: Top-level route components
- Location: `pages/` directory
- Pattern: Lazy-loaded via React.lazy()
- Examples: HomePage, ProductsPage, ProductDetailPage, ExperiencePage

**Layout Pattern:**
- Purpose: Consistent page structure
- Location: `components/layout/Layout.tsx`
- Pattern: Wrapper component with Navigation and Footer
- Usage: Wraps all page routes in `App.tsx`

**Feature Modules:**
- Purpose: Self-contained feature implementations
- Examples:
  - room-planner: 3D room visualization and product placement
  - estimator: Cost/quote estimation
  - demo: Interactive product demonstrations
- Pattern: Directory-based organization with index.ts exports

## Entry Points

**Application Entry:**
- Location: `index.tsx` (implied, standard Vite/React pattern)
- Triggers: Browser loads application
- Responsibilities: Render React app, initialize routing

**Main App Component:**
- Location: `App.tsx`
- Triggers: Loaded by index.tsx
- Responsibilities: Route configuration, lazy loading, Suspense boundary

**Public Assets:**
- Location: `public/` directory
- Contains: Static assets, likely including product images
- Accessed: Direct URL paths in production

## Error Handling

**Strategy:** React error boundaries (implied), Suspense for lazy loading

**Patterns:**
- Suspense with PageLoader fallback for route transitions (`App.tsx:12-18`)
- Loading states shown during code splitting

## Cross-Cutting Concerns

**Loading States:**
- PageLoader component with spinner animation
- Used in Suspense fallback

**Routing:**
- Client-side routing via React Router DOM
- Lazy loading for performance optimization

**3D Rendering:**
- Three.js integration via React Three Fiber
- Isolated in room-planner and three component directories

---

*Architecture analysis: 2026-01-18*
*Update when major patterns change*
