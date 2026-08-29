# Customer Onboarding (Banking) — Front-end + API

Enterprise digital customer onboarding built with the **Forge framework**
(analysis: `docs/analysis-report.md`, design/mock screens: `docs/mock-screens.md`).
This is a complete, runnable full-stack vertical slice:

- **Front-end** — React 18 + TypeScript + Vite, custom enterprise design system.
- **Back-end** — Express API with an in-memory store and a **vendor-agnostic KYC
  proxy** (Onfido / Persona / Jumio adapters).

## Architecture

```
Browser (React SPA)
   │  REST /api/*
   ▼
Express API (:8787)            Vite dev proxy /api → :8787
   ├─ /api/applications        list / get / create / decide
   └─ /api/kyc/*               vendor proxy → KYC adapters (onfido|persona|jumio)
```

The front-end never talks to a KYC vendor directly; it goes through the
bank's backend (which would hold vendor keys + satisfy data residency). The
adapters model that contract and are swappable at runtime.

## Two deployment options

### A) Single service (simplest) — Render
Express also serves the built SPA, so API + SPA deploy as **one** service
(same origin, no CORS/proxy). See `render.yaml`. Only caveat: free tier
spins down after ~15 min idle (~30–60s cold start).

### B) Split (never-sleeping SPA) — Cloudflare Pages + Render API
- SPA → **Cloudflare Pages** (free, unlimited bandwidth, no sleep).
- API → **Render** free web service (`render.yaml` API service).
- Set `VITE_API_URL` (build env var in Cloudflare Pages) to the Render API URL
  so the SPA calls the API cross-origin. CORS is enabled on the API.

## Run locally

```bash
npm install
npm run dev        # starts API (:8787) + web (:5173) together
```
Open http://localhost:5173

Pieces separately:
```bash
npm run dev:server   # API only  → http://localhost:8787/api/health
npm run dev:web      # web only   → http://localhost:5173  (needs API running)
```

### Production build
```bash
npm run build        # type-check + bundle to dist/
npm run preview      # serve the built front-end (front-end only)
```

## Deploy: Option A — Render (single service)
1. Push this folder to GitHub.
2. Render: *New → Web Service* → connect repo (auto-reads `render.yaml`) or set:
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Health check: `/api/health`
   - Plan: **Free**
3. You get a `*.onrender.com` URL serving both app and `/api`.

## Deploy: Option B — Cloudflare Pages (SPA) + Render (API)
1. **API**: deploy `render.yaml` to Render as the API service (plan Free).
   Note its URL, e.g. `https://customer-onboarding-api.onrender.com`.
2. **SPA**: connect the repo to **Cloudflare Pages**:
   - Build command: `npm run build`
   - Build output: `dist`
   - **Build environment variable**: `VITE_API_URL = <your Render API URL>`
   - `public/_redirects` provides the SPA fallback (`/* /index.html 200`).
   - Or deploy via CLI: `npx wrangler pages deploy dist` (uses `wrangler.toml`).
3. The SPA calls `${VITE_API_URL}/api/*`; the API has CORS enabled.

## KYC vendor selection
Set `VITE_KYC_VENDOR` (front-end default) and/or `KYC_VENDOR` (backend default)
to `onfido`, `persona`, or `jumio` (default `persona`). Switchable at runtime
from the Identity step UI. See `.env.example`.

## API reference
| Method | Path | Body | Result |
|--------|------|------|--------|
| GET | `/api/applications` | — | Application[] |
| GET | `/api/applications/:id` | — | Application |
| POST | `/api/applications` | `{firstName,lastName,product,consent,...}` | Application (201) |
| POST | `/api/applications/:id/decision` | `{decision:"Approved"|"Rejected",reason?}` | Application |
| POST | `/api/kyc/document` | `{vendor,fileName,applicantName}` | `{status,docType,score}` |
| POST | `/api/kyc/liveness` | `{vendor,applicantName}` | `{status}` |
| POST | `/api/kyc/watchlist` | `{vendor,fullName,nationalId}` | `{status,details?}` |

> The store is in-memory and seeded; restarting the API resets data. Swap
> `server/index.mjs` for a real database in production.

## Project layout
```
customer-onboarding/
├─ server/            Express API + KYC adapters
│  ├─ index.mjs       routes + in-memory store (+ serves dist/ in prod)
│  └─ kyc.mjs         vendor adapters (onfido/persona/jumio)
├─ src/
│  ├─ components/      Layout, UI primitives
│  ├─ screens/         Dashboard, NewApplication, ApplicationDetail
│  ├─ services/        api.ts (HTTP client) + kyc/types.ts
│  ├─ data/mock.ts     domain types
│  └─ styles/global.css  enterprise design tokens
├─ docs/             Forge analysis + mock-screen design docs
├─ public/_redirects  Cloudflare Pages SPA fallback
├─ render.yaml        Render API service (Options A & B)
├─ wrangler.toml      Cloudflare Pages config (Option B)
└─ index.html
```
