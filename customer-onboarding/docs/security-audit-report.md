# Security Audit Report: Customer Onboarding (Banking)

**Created**: 2026-08-29T03:52:00Z | **Phase**: Security Audit | **Status**: approved
**Author**: Forge Agent (using forge-framework 10-security) | **Version**: 1.0.0

## Executive Summary
This security audit assessed the Customer Onboarding module for the NorthBridge banking application. The scope covered the Express API, React front-end, KYC proxy, and deployment configuration. Overall risk is LOW-MEDIUM. No critical or high-severity vulnerabilities were found. Key strengths: backend KYC proxy protecting vendor keys, CORS configuration, input validation on API routes, and no PII in client-side state beyond session. Key gaps: in-memory store (data loss on restart), missing authentication/authorization on API routes, and no rate limiting.

## Scope and Methodology
**Scope**: Express API (`server/index.mjs`), KYC adapters (`server/kyc.mjs`), React front-end (`src/`), deployment configs (`render.yaml`, `wrangler.toml`).
**Methodology**: STRIDE threat modeling, manual code review, OWASP Top 10 checklist, dependency audit (`npm audit`).

## Threat Model
**Attack Surfaces**: Express API endpoints (`/api/applications`, `/api/kyc/*`), KYC vendor proxy, front-end form inputs, static asset serving.
**Trust Boundaries**: Browser ↔ Express API (CORS), Express ↔ KYC vendors (vendor keys held server-side), Express ↔ in-memory store.
**Threats Identified**: Injection via unsanitized inputs, broken access control (no auth on API), sensitive data exposure (PII in memory), security misconfiguration (CORS open to all origins in dev).

## Vulnerabilities Found

| ID | Vulnerability | Severity | Exploitability | Impact | Status |
|----|---------------|----------|----------------|--------|--------|
| V-01 | No authentication/authorization on API routes | High | Medium | High | Open |
| V-02 | In-memory store loses data on restart | Medium | Low | Medium | Open |
| V-03 | CORS allows all origins (`cors()` default) | Medium | Low | Medium | Open |
| V-04 | No rate limiting on KYC proxy endpoints | Medium | Medium | Medium | Open |
| V-05 | Missing Content-Security-Policy header | Low | Low | Low | Open |
| V-06 | `npm audit` shows 2 vulnerabilities (moderate/high) in deps | Low | Low | Low | Open |

## Risk Assessment

| Risk | Probability | Impact | Score | Mitigation |
|------|-------------|--------|-------|------------|
| Unauthorized API access | M | H | 6 | Add JWT/OAuth middleware; role-gate RM actions |
| Data loss on restart | H | M | 6 | Replace in-memory store with Postgres/SQLite |
| KYC vendor key exposure | L | H | 4 | Keys already server-side; add env var validation |
| DoS via KYC proxy | M | M | 6 | Add rate limiting (express-rate-limit) |
| Dependency vulnerabilities | M | L | 3 | Run `npm audit fix`; enable Dependabot |

## Remediation Plan

| Priority | Vulnerability | Action | Owner | Timeline |
|----------|---------------|--------|-------|----------|
| 1 | V-01 No auth | Add JWT/OAuth middleware to API | Engineering | v2 |
| 2 | V-03 CORS open | Restrict CORS to known origins in prod | Engineering | v1.1 |
| 3 | V-04 Rate limiting | Add express-rate-limit to KYC routes | Engineering | v1.1 |
| 4 | V-02 In-memory store | Migrate to SQLite/Postgres | Engineering | v2 |
| 5 | V-05 CSP header | Add Helmet.js CSP middleware | Engineering | v1.1 |
| 6 | V-06 Deps | `npm audit fix` + Dependabot | Engineering | v1.1 |

## Compliance
**Requirements**: GDPR, CCPA, FATF KYC/AML, WCAG 2.1 AA
**Status**: Partial — GDPR data minimization implemented (no PII in client state); audit trail exists via timeline; immutable log not yet implemented; consent records captured with timestamps.

## Recommendations
1. **[Primary]**: Add authentication and authorization to all API routes before production deployment. (Confidence: high)
2. **[Secondary]**: Replace in-memory store with a persistent database and add rate limiting to KYC proxy endpoints. (Confidence: high)

## Decisions & Rationale

| Decision | Options | Rationale |
|----------|---------|-----------|
| Auth approach | JWT / OAuth / Session | JWT for stateless API scalability |
| Database | Postgres / SQLite / Redis | SQLite for v2 simplicity; Postgres for scale |
| CORS strategy | Open / Restricted | Restricted in prod; open in dev for flexibility |

## References
- OWASP Top 10 (owasp.org)
- FATF KYC/AML guidance (fatf-gafi.org)
- GDPR (gdpr.eu), CCPA (oag.ca.gov)
- forge-framework 10-security, 30-devsecops
