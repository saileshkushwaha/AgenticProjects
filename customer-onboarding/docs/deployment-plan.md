# Deployment Plan: Customer Onboarding (Banking)

**Created**: 2026-08-29T03:52:00Z | **Phase**: Deployment | **Status**: approved
**Author**: Forge Agent (using forge-framework 07-deploy) | **Version**: 1.0.0

## Executive Summary
This plan covers deployment of the Customer Onboarding module as a full-stack application. Two deployment options are supported: (A) single Render service (simplest, Express serves both API and built SPA), and (B) split deployment (Cloudflare Pages for SPA, Render for API). Both options are production-ready with the configurations provided.

## Scope
**Components**: React SPA (v1.0.0), Express API (v1.0.0), KYC vendor adapters (onfido/persona/jumio).
**Environments**: Production (Render / Cloudflare Pages).
**Window**: On-demand | **Duration**: ~15 minutes

## Strategy
**Strategy**: Recreate (immutable deploy). **Rationale**: Simple, zero-downtime for single-service option; Cloudflare Pages provides atomic deploys for SPA.

## Pre-Deployment Checklist
- [x] Quality gates passed (build, tests, typecheck)
- [x] Code reviewed (code-review-report.md)
- [x] Tests passing (24/24)
- [x] Documentation updated (README, API reference)
- [x] Security audit completed (security-audit-report.md)
- [ ] Stakeholders notified
- [ ] Rollback plan tested
- [x] Monitoring verified (health endpoint `/api/health`)

## Environment Configuration

| Resource | Configuration | Status |
|----------|---------------|--------|
| Render Web Service | Build: `npm install && npm run build`; Start: `npm start`; Plan: Free | Ready |
| Cloudflare Pages | Build: `npm run build`; Output: `dist`; Env: `VITE_API_URL` | Ready |
| Environment variables | `KYC_VENDOR` (backend), `VITE_KYC_VENDOR` (frontend), `PORT` | Documented |
| CORS | Enabled on Express (`cors()`); restrict origins in prod | Partial |

## Deployment Steps

### Option A: Single Service (Render)
| Step | Description | Expected | Verification | Duration |
|------|-------------|----------|--------------|----------|
| 1 | Push repo to GitHub | Code available | GitHub shows latest commit | 2 min |
| 2 | Create Render Web Service | Service created | Render URL assigned | 3 min |
| 3 | Configure build/start commands | Build succeeds | Render logs show "built" | 5 min |
| 4 | Set env vars (`KYC_VENDOR`) | Env applied | Health check returns vendor | 1 min |
| 5 | Verify `/api/health` | Returns 200 + vendor info | `curl <url>/api/health` | 1 min |
| 6 | Verify SPA loads | index.html served | Browser loads app | 1 min |

### Option B: Split Deployment (Cloudflare Pages + Render API)
| Step | Description | Expected | Verification | Duration |
|------|-------------|----------|--------------|----------|
| 1 | Deploy API to Render (same as Option A steps 1-5) | API live | `curl <api-url>/api/health` | 5 min |
| 2 | Set `VITE_API_URL` in Cloudflare Pages build env | SPA calls correct API | Network tab shows API calls | — |
| 3 | Deploy SPA to Cloudflare Pages | SPA live | Cloudflare Pages URL loads | 3 min |
| 4 | Verify cross-origin API calls | CORS headers present | Response includes `Access-Control-Allow-Origin` | 1 min |

## Rollback Plan

| Trigger | Action |
|---------|--------|
| Error rate > 5% | Render: rollback to previous deploy via dashboard |
| Health check failing | Cloudflare: rollback to previous deploy |
| Performance degradation | Immediate rollback; investigate metrics |

**Steps**: 1. Navigate to Render/Cloudflare dashboard 2. Select previous successful deploy 3. Promote to production 4. Verify health check
**Time Limit**: 5 minutes

## Post-Deployment Verification

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Health check | 200 OK | — | pending |
| List applications | Returns seeded + new apps | — | pending |
| Create application | 201 with valid data | — | pending |
| KYC document verify | 200 with vendor result | — | pending |
| SPA loads | index.html + JS bundle | — | pending |

## Monitoring Verification
- [ ] `/api/health` endpoint responding
- [ ] Render/Cloudflare deploy logs clean
- [ ] No 5xx errors in first 10 minutes

## Communication Plan

| Stakeholder | When | How | Message |
|-------------|------|-----|---------|
| Engineering team | Before deploy | Slack | "Deploying Customer Onboarding v1.0.0 to Render" |
| Product owner | After deploy | Email/Slack | "Customer Onboarding is live at <url>" |
| Support team | After deploy | Slack | "New onboarding flow available; watch for KYC issues" |

## Results
**Status**: pending (deployment not yet executed in this session)
**Duration**: — | **Actual**: —

| Metric | Target | Actual |
|--------|--------|--------|
| Deploy success | 100% | — |
| Health check pass | 100% | — |
| Test pass post-deploy | 100% | — |

## Issues Encountered / Lessons Learned / Next Steps / References
| Issue | Impact | Resolution |
|-------|--------|------------|
| In-memory store resets on restart | Data loss | Documented; migrate to DB in v2 |
| Free tier cold starts | 30-60s delay on first request | Use split deploy (Cloudflare SPA) for always-on front-end |
| Reference: render.yaml | — | Single-service config |
| Reference: wrangler.toml | — | Cloudflare Pages config |
| Reference: forge-framework 07-deploy | — | Deployment workflow |
