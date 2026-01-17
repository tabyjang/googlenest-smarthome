# Coding Conventions

**Analysis Date:** 2026-01-18

## Naming Patterns

**Files:**
- PascalCase.tsx for React components (App.tsx, HomePage.tsx, ProductCard.tsx)
- kebab-case.ts for utilities and API files (send-quote.ts)
- lowercase.json for config files (package.json, tsconfig.json)

**Functions:**
- camelCase for all functions
- PascalCase for React components (React.FC pattern)
- Descriptive names (e.g., InteractiveDemo, EstimatorForm)

**Variables:**
- camelCase for variables
- Likely UPPER_SNAKE_CASE for constants (in `constants.tsx`)
- No underscore prefix detected

**Types:**
- PascalCase for interfaces and types
- No I prefix (modern TypeScript convention)
- Type definitions in `types.ts`

## Code Style

**Formatting:**
- 2-space indentation (based on `tsconfig.json` and common React practice)
- Single quotes likely (standard Vite/React default)
- Semicolons likely required (TypeScript convention)
- No explicit Prettier config detected

**Linting:**
- No ESLint config detected
- TypeScript strict mode not explicitly enabled in `tsconfig.json`
- `skipLibCheck: true` for faster builds

## Import Organization

**Order:**
1. React imports first
2. Third-party packages (react-router-dom, etc.)
3. Local components
4. Observed in `App.tsx:1-3`

**Grouping:**
- React imports at top
- Blank lines between import groups (example: `App.tsx`)

**Path Aliases:**
- `@/*` maps to project root (`tsconfig.json:22-24`, `vite.config.ts:18-20`)
- Usage: `@/components/*`, `@/pages/*`, etc.

## Component Patterns

**React Components:**
- React.FC type annotation (e.g., `const App: React.FC = () => {...}`)
- Functional components only (no class components detected)
- Lazy loading for pages: `lazy(() => import('./pages/HomePage'))`

**Component Structure:**
```typescript
const ComponentName: React.FC = () => {
  // State and hooks
  // Handler functions
  // Render
  return (
    <div>...</div>
  );
};

export default ComponentName;
```

**Loading States:**
- Custom loading components (PageLoader in `App.tsx:12-19`)
- Suspense boundaries for lazy loading
- Visual feedback with spinners and messages

## TypeScript Usage

**Configuration:**
- Target: ES2022
- Module: ESNext with bundler resolution
- JSX: react-jsx (new JSX transform)
- Experimental decorators enabled
- Allow importing TS extensions (noEmit mode)

**Type Safety:**
- TypeScript across all source files
- Shared types in `types.ts`
- Type definitions for third-party libraries (@types/node, @types/three)

## File Organization

**Component Files:**
- One component per file
- Export default for component
- Named exports for utilities if needed

**Feature Directories:**
- Related components grouped in subdirectories
- Example: `components/room-planner/` contains all room planner components
- Optional `index.ts` for barrel exports

**Lazy Loading:**
- Pages lazy loaded for code splitting
- Pattern: `const Page = lazy(() => import('./pages/Page'));`

## Comments

**When to Comment:**
- Inline comments for complex logic (observed in `vite.config.ts:26-35`)
- Section headers for clarity (// React core, // Three.js ecosystem)

**JSDoc/TSDoc:**
- Not consistently used (lightweight approach)
- Type annotations in TypeScript serve as documentation

**Comment Style:**
- Inline comments with //
- Descriptive comments for configuration (build chunks, etc.)

## Module Design

**Exports:**
- Default exports for React components
- Named exports for utilities
- Barrel files (index.ts) in feature directories for clean imports

**Import Patterns:**
- Absolute imports using @ alias preferred
- Relative imports for sibling files
- Lazy imports for routes

---

*Convention analysis: 2026-01-18*
*Update when patterns change*
