# Compliance Audit Report: Customer Onboarding (Banking)

**Created**: 2026-08-29T03:52:00Z | **Phase**: Compliance Audit | **Status**: approved
**Author**: Forge Agent (using forge-framework 22-compliance) | **Version**: 1.0.0

## Executive Summary
This compliance audit assesses the Customer Onboarding module against GDPR, CCPA, FATF KYC/AML guidelines, and WCAG 2.1 AA accessibility standards. The module is partially compliant. Key strengths: e-consent capture with timestamps, KYC vendor abstraction for regulatory compliance, data minimization (no PII in client state). Key gaps: immutable audit log not implemented, right-to-erasure not automated, no data retention policies, and accessibility testing is manual only.

## Scope Definition
**Applicable Regulations**: GDPR (EU), CCPA (California), FATF KYC/AML (global), WCAG 2.1 AA (accessibility).
**Systems in Scope**: Express API, React front-end, KYC proxy, in-memory application store.

## Control Assessment

| Control | Requirement | Current Implementation | Gap |
|---------|-------------|------------------------|-----|
| Data minimization | GDPR Art. 5(1)(c) | No PII in client state beyond session | None |
| Consent capture | GDPR Art. 7 | E-consent checkboxes with timestamp in application | None |
| Right to erasure | GDPR Art. 17 | Not implemented | Manual process only |
| Audit trail | FATF, GDPR | Timeline events in application object | Not immutable; lost on restart |
| KYC/AML screening | FATF | Document, liveness, watchlist via vendors | Partial — no ongoing monitoring |
| Data retention | GDPR, CCPA | No policy implemented | Gap |
| Accessibility | WCAG 2.1 AA | Manual a11y design; no automated tests | Gap |
| Data residency | GDPR Art. 3 | KYC proxy in bank backend (simulated) | Not enforced in code |

## Evidence Collection
- Consent records captured in `POST /api/applications` with `consent` boolean.
- Timeline events track application lifecycle (submitted, documents, KYC, decision).
- KYC vendor adapters proxy all identity checks through backend.
- No PII logged to console or exposed in API responses beyond necessary fields.

## Gap Analysis

| Gap | Regulation | Risk | Remediation Priority |
|-----|------------|------|---------------------|
| No immutable audit log | FATF, GDPR | High | P1 |
| Right-to-erasure not automated | GDPR | Medium | P2 |
| No data retention policy | GDPR, CCPA | Medium | P2 |
| Accessibility not automated | WCAG 2.1 AA | Medium | P3 |
| No ongoing PEP monitoring | FATF | Medium | P2 |
| Data residency not enforced | GDPR | Low | P3 |

## Remediation Planning

| Gap | Action | Owner | Timeline |
|-----|--------|-------|----------|
| Immutable audit log | Append-only log table with cryptographic hash chain | Engineering | v2 |
| Right-to-erasure | Add DELETE /api/applications/:id with cascade | Engineering | v2 |
| Data retention policy | Define 7-year retention for KYC; 5-year for applications | Legal + Engineering | v1.1 |
| Automated a11y tests | Add axe-core to Vitest suite | Engineering | v1.1 |
| Ongoing PEP monitoring | Schedule periodic watchlist re-screening | Engineering | v2 |
| Data residency | Enforce region-based vendor routing | Engineering | v2 |

## Compliance Status

| Regulation | Status | Notes |
|------------|--------|-------|
| GDPR | Partial | Data minimization and consent OK; erasure and retention gaps |
| CCPA | Partial | Consent captured; deletion process manual |
| FATF KYC/AML | Partial | Initial screening OK; no ongoing monitoring |
| WCAG 2.1 AA | Partial | Design considers a11y; no automated verification |

## Recommendations
1. **[Primary]**: Implement immutable audit log with hash chaining for all application state changes before production deployment. (Confidence: high)
2. **[Secondary]**: Add automated axe-core accessibility tests to CI and define data retention policies with Legal. (Confidence: high)

## Decisions & Rationale

| Decision | Options | Rationale |
|----------|---------|-----------|
| Audit log | DB table / File / Event stream | DB table for queryability + hash chain for immutability |
| Retention | 5yr / 7yr / Indefinite | 7yr for KYC (FATF), 5yr for applications (banking standard) |
| A11y testing | Manual / Automated / Both | Both; automated catches regressions |

## References
- GDPR (gdpr.eu)
- CCPA (oag.ca.gov)
- FATF KYC/AML guidance (fatf-gafi.org)
- WCAG 2.1 (w3.org/TR/WCAG21)
- forge-framework 22-compliance, 10-security
