# API Management Report: Customer Onboarding (Banking)

**Created**: 2026-08-29T03:52:00Z | **Phase**: API Management | **Status**: approved
**Author**: Forge Agent (using forge-framework 19-api) | **Version**: 1.0.0

## Executive Summary
This report catalogs the REST API for the Customer Onboarding module, documents the current versioning approach (implicit v1 via path prefix), identifies deprecation risks, and recommends improvements for developer experience and observability. The API is small (7 endpoints), internally consumed by a single SPA, and follows REST conventions.

## API Inventory

| API | Version | Owner | Status | Consumers |
|-----|---------|-------|--------|-----------|
| Applications API | v1 (implicit) | Engineering | Active | React SPA |
| KYC Proxy API | v1 (implicit) | Engineering | Active | React SPA |

### Endpoint Catalog

| Method | Path | Purpose | Auth | Rate Limit |
|--------|------|---------|------|------------|
| GET | /api/health | Health + vendor info | None | None |
| GET | /api/applications | List all applications | None (RM role expected) | None |
| GET | /api/applications/:id | Get single application | None | None |
| POST | /api/applications | Create new application | None | None |
| POST | /api/applications/:id/decision | Approve/reject application | None | None |
| POST | /api/kyc/document | Verify identity document | None | None |
| POST | /api/kyc/liveness | Liveness check | None | None |
| POST | /api/kyc/watchlist | Watchlist/PEP screening | None | None |

## Versioning Strategy
**Approach**: URL path prefix (`/api/`) with implicit v1. **Policy**: Minor changes backward-compatible; breaking changes require new `/api/v2/` prefix. No header-based versioning currently implemented.

## Deprecation Plan

| API | Version | Deprecation Date | Migration Path | Status |
|-----|---------|------------------|----------------|--------|
| None currently | — | — | — | No deprecated APIs |

## Developer Experience

| Aspect | Rating | Findings |
|--------|--------|----------|
| Documentation | 3/5 | README has API table; no OpenAPI/Swagger spec |
| SDKs | 1/5 | No generated SDK; front-end uses raw `fetch` via `api.ts` |
| Sandbox | 2/5 | Local dev server available; no hosted sandbox |
| Onboarding | 3/5 | README covers setup; API reference in table form |

## Analytics

| Metric | Value | Trend |
|--------|-------|-------|
| Total endpoints | 8 | Stable |
| Unique consumers | 1 (SPA) | Stable |
| Error rate | <1% (tests) | N/A (pre-prod) |
| Latency (KYC) | 650-1200ms (simulated) | N/A (mock) |

## Recommendations
1. **[Primary]**: Add OpenAPI 3.0 specification for the API and generate TypeScript client types. (Confidence: high)
2. **[Secondary]**: Add request/response logging middleware and expose metrics at `/api/metrics` for observability. (Confidence: high)

## Decisions & Rationale

| Decision | Options | Rationale |
|----------|---------|-----------|
| API style | REST / GraphQL / gRPC | REST sufficient for CRUD + KYC proxy; simpler for SPA |
| Versioning | URL / Header / Query | URL path is most explicit and widely understood |
| Auth | None / JWT / OAuth | None for v1 (dev); JWT planned for v2 production |

## References
- forge-framework 19-api, 03-design
- OpenAPI Specification (spec.openapis.org)
- REST API Design Rulebook (Mark Massé)
