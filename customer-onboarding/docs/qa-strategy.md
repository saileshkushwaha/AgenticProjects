# QA Strategy: Customer Onboarding (Banking)

**Created**: 2026-08-29T03:52:00Z | **Phase**: Quality Assurance | **Status**: approved
**Author**: Forge Agent (using forge-framework 18-qa) | **Version**: 1.0.0

## Executive Summary
This QA strategy defines the quality approach for the Customer Onboarding module. The current state includes automated backend tests (node:test, 8/8 passing) and front-end component tests (Vitest + Testing Library, 15/15 passing). The strategy focuses on expanding front-end test coverage, adding E2E tests, and integrating quality gates into CI/CD.

## QA Goals
- Achieve ≥80% code coverage for backend logic and ≥60% for front-end components.
- Zero critical/high defects in production.
- Reduce defect escape rate to <5% via shift-left testing.
- Ensure WCAG 2.1 AA accessibility compliance.

## Process Assessment

| Process | Current State | Target State | Gap |
|---------|---------------|--------------|-----|
| Unit testing | Backend complete; frontend partial | 80% backend, 60% frontend | Frontend E2E missing |
| Integration testing | API e2e test exists | Add negative path tests | Gap: error scenarios |
| Security testing | Manual audit only | Add SAST/DAST to CI | Gap: automation |
| Accessibility testing | Manual only | Add axe-core automated tests | Gap: automation |
| CI/CD quality gates | None | Add test + lint + typecheck gates | Gap: pipeline |

## Test Automation Strategy

| Area | Priority | Tool | Coverage Target | Timeline |
|------|----------|------|-----------------|----------|
| Backend unit/integration | High | node:test | 80% line | v1 (done) |
| Frontend component tests | High | Vitest + RTL | 60% line | v1 (done) |
| API contract tests | Medium | Vitest + supertest | 80% line | v1.1 |
| E2E browser tests | Medium | Playwright | Critical paths | v1.1 |
| Accessibility tests | Medium | axe-core + Vitest | WCAG AA | v1.1 |
| Security scans | High | npm audit, Snyk | CI gated | v1.1 |

## Quality Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Backend test pass rate | 100% (8/8) | 100% | node:test |
| Frontend test pass rate | 100% (15/15) | 100% | Vitest |
| Code coverage (backend) | ~100% routes | ≥80% | node:test --coverage |
| Code coverage (frontend) | ~60% components | ≥60% | Vitest --coverage |
| Defect escape rate | N/A (pre-prod) | <5% | Production monitoring |
| Build success rate | 100% | 100% | CI pipeline |
| Type-check pass rate | 100% | 100% | tsc --noEmit |

## Process Improvements

| ID | Improvement | Impact | Effort | Timeline |
|----|-------------|--------|--------|----------|
| I-01 | Add Vitest coverage reporting | Medium | Low | v1.1 |
| I-02 | Integrate axe-core for a11y tests | High | Medium | v1.1 |
| I-03 | Add Playwright E2E for submit flow | High | Medium | v1.1 |
| I-04 | Add CI pipeline with quality gates | High | Medium | v1.1 |
| I-05 | Add API contract tests (supertest) | Medium | Low | v1.1 |

## Test Automation Plan

| Phase | Scope | Tools | Timeline |
|-------|-------|-------|----------|
| v1 (done) | Backend API + KYC adapters + core UI | node:test, Vitest | Complete |
| v1.1 | API contract tests, a11y tests, CI gates | Vitest, axe-core, GitHub Actions | 2 weeks |
| v2 | E2E critical paths, performance tests | Playwright, k6 | 4 weeks |

## Recommendations
1. **[Primary]**: Add Playwright E2E tests for the full onboarding wizard (Personal → Review → Submit) to catch regression in user flows. (Confidence: high)
2. **[Secondary]**: Integrate axe-core into Vitest to automate WCAG 2.1 AA accessibility checks on every commit. (Confidence: high)

## References
- forge-framework 18-qa, 05-test
- Vitest documentation
- Testing Library best practices
- WCAG 2.1 (w3.org/TR/WCAG21)
