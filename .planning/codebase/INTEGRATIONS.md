# External Integrations

**Analysis Date:** 2026-01-18

## APIs & External Services

**AI/ML:**
- Google Generative AI (Gemini) - AI-powered features
  - SDK/Client: @google/genai package v1.35.0
  - Auth: API key in GEMINI_API_KEY env var
  - Usage: Exposed as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` (`vite.config.ts:14-15`)

**Email/Communication:**
- Resend - Email service for quote/contact forms
  - SDK/Client: resend npm package v6.7.0
  - Integration point: `api/send-quote.ts`
  - Auth: Likely requires RESEND_API_KEY (to be confirmed in implementation)

**External APIs:**
- Not detected - No additional third-party API integrations found

## Data Storage

**Databases:**
- Not detected - Client-side only application, no database connections found

**File Storage:**
- Browser LocalStorage - Likely used for client-side state persistence
- html-to-image - Client-side image generation (`html-to-image` package)

**Caching:**
- Not detected - No Redis or cache layer

## Authentication & Identity

**Auth Provider:**
- Not detected - No authentication system found
- Application appears to be public-facing without user accounts

**OAuth Integrations:**
- Not detected

## Monitoring & Observability

**Error Tracking:**
- Not detected - No Sentry or error tracking service configured

**Analytics:**
- Not detected - No analytics integration found

**Logs:**
- Browser console only - No centralized logging

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase
- Configured for static hosting (Vite build output)
- Dev server: localhost:3000 (`vite.config.ts:9`)

**CI Pipeline:**
- Not detected - No CI/CD configuration files found

## Environment Configuration

**Development:**
- Required env vars: GEMINI_API_KEY
- Configuration: `.env` files (loaded via Vite)
- No `.env.example` detected

**Production:**
- Secrets management: Depends on hosting platform
- Environment variables injected at build time

## Webhooks & Callbacks

**Incoming:**
- Not detected

**Outgoing:**
- Not detected

---

*Integration audit: 2026-01-18*
*Update when adding/removing external services*
