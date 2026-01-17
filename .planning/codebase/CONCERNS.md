# Codebase Concerns

**Analysis Date:** 2026-01-18

## Tech Debt

**No automated testing:**
- Issue: Zero test coverage, no testing framework configured
- Why: Likely rapid prototyping phase, tests not yet prioritized
- Impact: Refactoring is risky, bugs may go undetected, confidence in changes is low
- Fix approach: Add Vitest + Testing Library, start with critical paths (room planner, estimator)

**Hard-coded environment variables exposure:**
- Issue: GEMINI_API_KEY exposed to client-side code via `vite.config.ts:14-15`
- Why: Quick integration without backend proxy
- Impact: API key visible in browser, potential security risk and cost exposure
- Fix approach: Create serverless API route/function to proxy Gemini API calls, keep key server-side only

**No error boundaries:**
- Issue: No React error boundaries detected in component tree
- Why: Not implemented yet
- Impact: Component errors cause full app crash (white screen of death)
- Fix approach: Add error boundary component wrapping routes in `App.tsx`, catch and display graceful error UI

## Known Bugs

**No specific bugs documented**
- No TODO/FIXME comments found in codebase
- No known issues at this time
- Monitor as project evolves

## Security Considerations

**Client-side API key exposure:**
- Risk: `GEMINI_API_KEY` defined in browser-accessible code (`vite.config.ts`)
- Current mitigation: None - key is compiled into JavaScript bundle
- Recommendations:
  - Create backend API route (serverless function) to proxy Gemini API
  - Move API key to server-side environment only
  - Rate limit API calls to prevent abuse

**No .env.example file:**
- Risk: Developers may not know required environment variables
- Current mitigation: None
- Recommendations:
  - Create `.env.example` with `GEMINI_API_KEY=your_key_here`
  - Document required variables in README
  - Add validation to fail fast if env vars missing

**No authentication system:**
- Risk: None currently (public-facing app)
- Current mitigation: Application appears intentionally public
- Note: If user accounts are added later, implement proper auth (Supabase, Auth0, etc.)

## Performance Bottlenecks

**Large bundle size potential:**
- Problem: Three.js (0.182.0) is a large dependency (~600KB)
- Measurement: Not yet measured, but Three.js typically adds significant bundle size
- Cause: 3D library required for room planner feature
- Improvement path:
  - Verify code splitting is working (`vite.config.ts:25-36` configures manual chunks)
  - Consider dynamic imports for Three.js components
  - Tree-shake unused Three.js modules

**No lazy loading for components:**
- Problem: Only pages are lazy-loaded, not feature components
- Measurement: May impact initial load time
- Cause: Not yet optimized
- Improvement path: Lazy load heavy features (room-planner, estimator) on demand

## Fragile Areas

**3D room planner:**
- Why fragile: Complex drag-and-drop + Three.js scene management
- Common failures: Performance issues, state synchronization bugs
- Safe modification: Add tests before changes, isolate Three.js logic from React state
- Test coverage: None

**No configuration validation:**
- Why fragile: Missing env vars fail silently or cause runtime errors
- Common failures: Undefined API keys, broken integrations
- Safe modification: Add startup validation for required env vars
- Test coverage: None

## Scaling Limits

**Client-side only:**
- Current capacity: Limited by browser memory and performance
- Limit: Complex room plans with many products may cause slowdowns
- Symptoms at limit: Browser lag, memory issues, crashes
- Scaling path: Consider server-side scene rendering or optimization of Three.js scene

**No backend database:**
- Current capacity: No persistent storage beyond localStorage
- Limit: Cannot save/share room designs across devices or users
- Symptoms at limit: Users lose work if localStorage is cleared
- Scaling path: Add backend (Supabase, Firebase) for persistence and sharing

## Dependencies at Risk

**React 19.2.3:**
- Risk: React 19 is very recent, ecosystem may have compatibility issues
- Impact: Some libraries may not yet support React 19
- Migration plan: Monitor for issues, potentially downgrade to React 18 if problems arise

**No dependency version pinning:**
- Risk: Caret ranges (^) in package.json allow minor/patch updates
- Impact: Unexpected breaking changes from automatic updates
- Migration plan: Consider exact versioning for production stability

## Missing Critical Features

**Error tracking and logging:**
- Problem: No Sentry or error monitoring service
- Current workaround: Errors only visible in browser console
- Blocks: Cannot detect production errors, no error analytics
- Implementation complexity: Low (add Sentry integration)

**Environment configuration documentation:**
- Problem: No .env.example or setup documentation
- Current workaround: Developers must guess required variables
- Blocks: Difficult onboarding for new developers
- Implementation complexity: Very low (create .env.example file)

**Accessibility (a11y):**
- Problem: No detected accessibility testing or ARIA attributes
- Current workaround: None
- Blocks: May not be accessible to screen reader users
- Implementation complexity: Medium (audit + fix)

## Test Coverage Gaps

**Entire application:**
- What's not tested: Everything (no tests exist)
- Risk: High - any refactoring or change is risky
- Priority: High
- Difficulty to test: Medium (need to set up infrastructure)

**Critical paths to test first:**
1. Room planner drag-and-drop logic (`components/room-planner/`)
2. Cost estimator calculations (`components/estimator/`)
3. API integrations (`api/send-quote.ts`)
4. Routing and page navigation (`App.tsx`)
5. 3D scene rendering (Three.js components)

---

*Concerns audit: 2026-01-18*
*Update as issues are fixed or new ones discovered*
