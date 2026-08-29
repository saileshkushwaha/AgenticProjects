# Analysis Report: Customer Onboarding Module (Banking Application)

**Created**: 2026-08-28T19:52:00Z | **Phase**: Analysis | **Status**: review
**Author**: Forge Agent (using forge-framework 02-analyze) | **Version**: 1.0.0

## Executive Summary
This report analyzes the requirements, feasibility, risks, and constraints for a **Customer Onboarding module** within a retail/business banking application. The module enables prospects to open accounts (checking, savings, loan) through a guided, compliant, and verifiable digital journey. Analysis concludes the module is technically and operationally feasible as a React-based front-end backed by standard banking services, with KYC/AML compliance and data security as the dominant non-functional drivers. Primary risks are regulatory complexity, identity-verification integration, and abandonment during long forms—each with defined mitigations.

## Analysis Objectives
- Objective 1: Elicit and document functional + non-functional requirements for digital customer onboarding.
- Objective 2: Assess technical, economic, and operational feasibility of a React enterprise front-end.
- Objective 3: Identify risks (compliance, security, UX abandonment) with mitigations.
- Objective 4: Analyze trade-offs (build vs buy KYC, wizard vs single-page, design system choice).

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-01 | Self-service account opening (personal + business) | Must | User selects product, completes guided flow, submits in < 10 min median |
| FR-02 | Multi-step onboarding wizard | Must | Progress indicator, back/next, save-and-resume, field validation per step |
| FR-03 | Identity verification (KYC) | Must | Document capture (ID/passport), selfie/liveness, watchlist screen, PEP check |
| FR-04 | Document upload | Must | Drag-drop, type/size validation, per-document status |
| FR-05 | Personal/entity details capture | Must | Name, DOB, tax ID, address, contact; validated; duplicate detection |
| FR-06 | Employment & financial profile | Should | Income source, employer, expected activity; risk scoring input |
| FR-07 | Review & consent | Must | Summary of entries, product T&Cs, e-consent captured with timestamp |
| FR-08 | Application status tracking | Must | Real-time status (Draft/Submitted/In Review/Approved/Rejected) + timeline |
| FR-09 | Officer review工作台 (RM/Compliance) | Should | Queue, view applicant, approve/reject with reason, audit log |
| FR-10 | Notifications | Should | Email/SMS on status change; configurable per channel |
| FR-11 | Accessibility (WCAG 2.1 AA) | Must | Keyboard nav, contrast, screen-reader labels, ARIA roles |
| FR-12 | Multi-language (en + es) | Could | Locale switch without reload; localized validation messages |

### Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| NFR-01 | Page interaction latency | Performance | < 200ms UI response; initial load < 2.5s |
| NFR-02 | Availability | Reliability | 99.9% uptime monthly for public onboarding |
| NFR-03 | Concurrent sessions | Scalability | 5,000 simultaneous onboarding sessions at peak |
| NFR-04 | Data encryption | Security | TLS 1.3 in transit, AES-256 at rest, no PII in logs |
| NFR-05 | KYC/AML compliance | Compliance | Meets FATF, GDPR/CCPA, local KYC; audit trail immutable |
| NFR-06 | Enterprise look & feel | Usability | Consistent design system, WCAG AA, responsive (desktop-first) |
| NFR-07 | Observability | Operability | Front-end telemetry + error tracking; funnel analytics |

## Feasibility Assessment

### Technical: Feasible with constraints
- Technology readiness: React 18 + TypeScript + Vite is mature and well-supported.
- Integration complexity: Medium — KYC vendor (Onfido/Persona/Jumio) and core banking/CRM APIs required.
- Team capability: Standard React skills sufficient; KYC integration needs security review.

### Economic: Feasible
- Development cost: ~$180K (front-end heavy, ~6–8 wks for v1) | Operational: ~$4K/month (hosting + KYC per-check fees).
- ROI: Faster onboarding → higher conversion; payback ~12 months via reduced branch/Ops cost.

### Operational: Feasible
- Operational readiness: Fits within existing CI/CD and design-system governance.
- Process changes: Compliance sign-off gate added; RM queue workflow introduced.

## Risk Assessment

| ID | Risk | Category | Prob | Impact | Score | Mitigation |
|----|------|----------|------|--------|-------|------------|
| R-01 | KYC vendor integration delay | Technical | M | H | 6 | Early sandbox PoC; abstraction layer to swap vendors |
| R-02 | Regulatory/KYC scope creep | Compliance | H | H | 9 | Compliance in design reviews; configurable rule engine |
| R-03 | Form abandonment (long flow) | Usability | H | M | 8 | Save-and-resume, progress UI, prefill, analytics funnel |
| R-04 | PII data exposure | Security | M | H | 6 | Tokenization, no PII in client state beyond session, CSP, masking |
| R-05 | Accessibility non-conformance | Compliance | M | M | 4 | WCAG AA checklist in DoD; automated a11y tests |
| R-06 | Low conversion vs branch | Operational | M | M | 4 | A/B test, inline help, progress incentives |

## Constraints
**Technical**: Must integrate with existing IAM/OAuth; must use bank design system tokens; SPA behind WAF.
**Business**: Launch within current quarter; must support personal + business; approval SLA < 24h.
**Regulatory**: GDPR/CCPA data-minimization; KYC/AML; right-to-erasure; immutable audit log; consent records.

## Trade-off Analysis

### Decision: KYC / Identity Verification approach
| Option | Pros | Cons | Score |
|--------|------|------|-------|
| Build in-house | Full control, no licensing | Slow, high compliance risk, liveness hard | 2.6 |
| Buy (Onfido/Persona/Jumio) | Fast, accurate, compliant, liveness+document | Per-check cost, vendor lock-in | 4.4 |
**Recommendation**: Buy (vendor) behind an abstraction layer to limit lock-in.

### Decision: Onboarding UI structure
| Option | Pros | Cons | Score |
|--------|------|------|-------|
| Single long page | Simple | High abandonment, poor mobile | 2.8 |
| Multi-step wizard | Guided, resumable, analytics per step | More navigation code | 4.5 |
**Recommendation**: Multi-step wizard with save-and-resume.

### Decision: Front-end styling approach
| Option | Pros | Cons | Score |
|--------|------|------|-------|
| Custom CSS design system | Full brand control, tiny bundle | More initial build | 4.1 |
| Component lib (MUI/Ant) | Fast | Theming overhead, larger bundle | 3.7 |
**Recommendation**: Custom CSS system using bank tokens (enterprise, lightweight, on-brand).

## SWOT Analysis
| | Positive | Negative |
|---|----------|----------|
| **Internal** | **Strengths**: Strong React talent, existing design system, secure IAM | **Weaknesses**: No in-house KYC, limited compliance eng |
| **External** | **Opportunities**: Digital-first acquisition, lower CAC | **Threats**: Regulatory change, fraud sophistication |

## Recommendations
1. **Primary**: Build a React/TS SPA onboarding wizard with vendor-KYC abstraction and compliance gate.
2. **Secondary**: Embed analytics + a11y tests in DoD to protect conversion and compliance.
3. **Risk Mitigation**: Ship MVP (personal accounts) first, then business + RM工作台.

## Decisions & Rationale
| Decision | Options | Rationale |
|----------|---------|-----------|
| KYC | Build / Vendor | Vendor for speed and compliance |
| UI | Wizard / Single-page | Wizard reduces abandonment |
| Styling | Custom / Lib | Custom for brand + bundle |
| Language | TS / JS | TS for safety at scale |

## Assumptions
- KYC vendor contract attainable this quarter.
- Core banking/CRM APIs exist or are stubbed for v1.
- Design tokens provided by brand team.

## Open Issues
- Final KYC vendor selection: pending procurement.
- Business-account beneficial-ownership rules: pending legal.
- Per-check KYC budget: pending Finance sign-off.

## Next Steps
1. Finalize KYC vendor + integration contract.
2. Produce high-fidelity mock screens (Figma-equivalent) → see `docs/mock-screens.md`.
3. Implement React front-end (scaffold + wizard + KYC + status).
4. Add a11y + analytics to Definition of Done; compliance review gate.

## References
- FATF KYC/AML guidance (fatf-gafi.org)
- GDPR (gdpr.eu), CCPA (oag.ca.gov)
- WCAG 2.1 (w3.org/TR/WCAG21)
- forge-framework workflows 02-analyze, 03-design
