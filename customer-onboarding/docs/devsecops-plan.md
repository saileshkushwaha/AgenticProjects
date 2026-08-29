# DevSecOps Plan: Customer Onboarding (Banking)

**Created**: 2026-08-29T03:52:00Z | **Phase**: DevSecOps | **Status**: approved
**Author**: Forge Agent (using forge-framework 30-devsecops) | **Version**: 1.0.0

## Executive Summary
This plan defines the DevSecOps transformation for the Customer Onboarding module, shifting security left into the CI/CD pipeline. Current state: manual security audit, no automated security scanning, no compliance-as-code. Target state: SAST, SCA, secrets scanning, and accessibility checks automated in CI with quality gates that fail builds on critical issues.

## Current State Assessment
- **Security practices**: Manual code review + security audit report.
- **CI/CD**: None (local `npm test` and `npm run build`).
- **Dependency management**: `npm audit` run ad-hoc; 2 moderate/high vulnerabilities present.
- **Secrets management**: KYC vendor keys simulated via env vars; no real secrets in repo.
- **Compliance**: Manual checklist; no automated compliance checks.

## Security Toolchain Design

| Tool | Purpose | Integration Point | Cost |
|------|---------|-------------------|------|
| ESLint + security plugins | SAST (static analysis) | Pre-commit + CI | Free |
| npm audit / Snyk | SCA (dependency scanning) | CI on every PR | Free/Paid |
| git-secrets / gitleaks | Secrets scanning | Pre-commit + CI | Free |
| axe-core | Accessibility scanning | Vitest CI | Free |
| Helmet.js | Security headers | Express middleware | Free |
| express-rate-limit | DoS protection | Express middleware | Free |

## Pipeline Integration

| Stage | Tool | Gate | Fail Condition |
|-------|------|------|----------------|
| Lint | ESLint | Code style + security rules | Any error |
| Type check | tsc --noEmit | Type safety | Any error |
| Unit tests | node:test + Vitest | Functional correctness | Any failure |
| SCA | npm audit | Dependency vulnerabilities | High/Critical |
| Secrets | gitleaks | Hardcoded secrets | Any finding |
| A11y | axe-core + Vitest | WCAG 2.1 AA violations | Critical violations |

## Compliance as Code

| Policy | Implementation | Enforcement |
|--------|---------------|-------------|
| No secrets in repo | gitleaks pre-commit hook | CI fails on detection |
| Dependency vulnerabilities | npm audit in CI | CI fails on high/critical |
| Accessibility | axe-core tests | CI fails on critical violations |
| CORS policy | Environment-specific config | CI lint of config files |
| Security headers | Helmet.js middleware | Integration test verifies headers |

## Monitoring and Response

| Signal | Tool | Response |
|--------|------|----------|
| CI build failure | GitHub Actions / GitLab CI | Notify team; block merge |
| Dependency CVE | Dependabot / Snyk | Auto-PR for patch; manual for major |
| Runtime errors | Express error handler + logging | Alert via webhook; create incident |

## Training and Adoption

| Activity | Audience | Timeline |
|----------|----------|----------|
| Pre-commit hook setup | Engineering | v1.1 |
| CI pipeline walkthrough | Engineering | v1.1 |
| Security champion designation | Engineering lead | v1.1 |

## Recommendations
1. **[Primary]**: Implement GitHub Actions CI pipeline with SAST, SCA, secrets scanning, and accessibility gates on every PR. (Confidence: high)
2. **[Secondary]**: Add Dependabot for automated dependency updates and enable security advisories. (Confidence: high)

## Decisions & Rationale

| Decision | Options | Rationale |
|----------|---------|-----------|
| CI platform | GitHub Actions / GitLab CI / CircleCI | GitHub Actions for repo-native integration |
| SCA tool | npm audit / Snyk / Dependabot | npm audit (free) + Dependabot (auto-PR) |
| Secrets scanning | gitleaks / git-secrets / truffleHog | gitleaks: fast, open-source, CI-friendly |

## References
- forge-framework 30-devsecops, 10-security
- OWASP DevSecOps Guide
- GitHub Actions documentation
