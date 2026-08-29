# Design Document: Customer Onboarding — Mock Screens

**Created**: 2026-08-28T19:52:00Z | **Phase**: Design | **Status**: review
**Author**: Forge Agent (using forge-framework 03-design) | **Version**: 1.0.0

## Executive Summary
This document specifies the **high-fidelity mock screens** for the Customer Onboarding module as Figma-equivalent wireframes, then realizes them as a runnable React/TS prototype (the "front-end"). The design applies an enterprise design language: deep navy/indigo primary, neutral slate surfaces, generous whitespace, card-based layouts, and a left-rail + top-bar app shell. Six core screens are defined with component-level specs so implementation is 1:1.

## Design Objectives
- Objective 1: Define an enterprise, WCAG-AA compliant visual language for onboarding.
- Objective 2: Specify each screen as a Figma-style mock (layout, components, states).
- Objective 3: Provide a runnable React prototype that matches the mocks.

## Requirements Traceability
| Requirement | Design Element | Status |
|-------------|----------------|--------|
| FR-02 Wizard | `NewApplication` stepper | addressed |
| FR-03 KYC | `Identity` step | addressed |
| FR-04 Upload | `DocumentUpload` component | addressed |
| FR-08 Status | `ApplicationDetail` timeline | addressed |
| FR-09 RM queue | `Dashboard` application table | addressed |
| NFR-06 Enterprise UI | App shell + tokens | addressed |
| NFR-11 A11y | ARIA + focus mgmt | addressed |

## Architecture
### Architectural Style
SPA (React 18 + TypeScript + Vite), presentational components + local state. Talks to an Express API (`/api`) which proxies KYC vendors.

### Component Architecture
```
App
├─ Layout (Sidebar + Topbar)
├─ Dashboard            (metrics + application queue table)
├─ NewApplication       (Stepper → steps below)
│   ├─ StepPersonal
│   ├─ StepContact
│   ├─ StepFinancial
│   ├─ StepIdentity (KYC + DocumentUpload)
│   └─ StepReview
└─ ApplicationDetail     (status timeline + actions)
```

## Mock Screens (Figma-equivalent)
### App Shell (global)
```
┌──────────────────────────────────────────────────────────────┐
│ [logo] NorthBridge Bank      Search…      🔔  AC  Onboarding │
├──────────────┬───────────────────────────────────────────────┤
│ NAV          │  <Page title>  <Breadcrumb>                   │
│ • Dashboard   │  ┌────────┐ ┌────────┐ ┌────────┐  (KPI cards)│
│ • Applications│  └────────┘ └────────┘ └────────┘            │
│ • KYC Queue   │  ┌─────────────────────────────────────┐    │
│ • Reports     │  │ Table: Applications (status badges) │    │
└──────────────┴───────────────────────────────────────────────┘
```
### Dashboard
3 KPI cards (Total / In Review / Approved) + application queue table with status badges (Draft gray, Submitted blue, In Review amber, Approved green, Rejected red).
### New Application Wizard (5 steps)
Personal → Contact → Financial → Identity (KYC + docs) → Review & Consent. Stepper with back/next, per-step validation, vendor selector, consent gating submit.
### Identity Verification (KYC + Upload)
Document dropzone, doc status badge, liveness "Start", verification-status card (provider, document, liveness, watchlist/PEP, risk score). Calls `/api/kyc/*`.
### Review & Consent
Read-only grouped summary + product Terms and GDPR/CCPA e-consent checkboxes gating submit.
### Application Detail / Status
Header with status badge; decision card (Approve/Reject + reason); vertical timeline (submitted → docs → KYC → compliance → decision).

## Data Model (UI state)
| Entity | Key fields |
|--------|-----------|
| Application | id, applicant, product, status, steps[], createdAt |
| Applicant | firstName, lastName, dob, nationalId, email, phone, address |
| FinancialProfile | employmentStatus, employer, annualIncome, sourceOfFunds |
| KycCheck | docStatus, liveness, watchlist, score |
| Document | name, size, type, status |

## API Specification
### GET /api/applications → Application[]
### POST /api/applications → {firstName,lastName,product,consent} → Application
### GET /api/applications/:id → Application
### POST /api/applications/:id/decision → {decision,reason} → Application
### POST /api/kyc/document → {vendor,fileName,applicantName} → {status,docType,score}
### POST /api/kyc/liveness → {vendor,applicantName} → {status}
### POST /api/kyc/watchlist → {vendor,fullName,nationalId} → {status,details?}

## Architecture Decision Records
### ADR-001: Custom CSS enterprise design system
**Status**: accepted — brand control, small bundle; cost: more initial build.
### ADR-002: Wizard over single page
**Status**: accepted — reduces abandonment; cost: nav state to manage.
### ADR-003: KYC behind vendor abstraction + backend proxy
**Status**: accepted — swappable vendors (onfido/persona/jumio); cost: backend contract to maintain.

## Security Design
**Authentication**: OAuth via existing IAM | **Authorization**: role-gated RM actions | **Data Protection**: PII masked in UI, no PII persisted client-side beyond session, API CORS-restricted.

## Performance Design
**Scalability**: code-split routes | **Caching**: static assets hashed, long-cache.
| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial load | < 2.5s | Lighthouse |
| Step render | < 200ms | RUM |

## Design Principles Applied
1. **Consistency**: Shared tokens, Stepper, Badge, Card components.
2. **Clarity**: One primary action per screen; explicit status.
3. **Accessibility**: ARIA, focus rings, contrast ≥ 4.5:1.

## Trade-offs Accepted
| Trade-off | Gained | Sacrificed |
|-----------|--------|------------|
| Custom CSS | Brand + bundle | Build time |
| Backend KYC proxy | Security + vendor swap | Extra service |

## Open Issues / Next Steps / References
- KYC vendor abstraction IMPLEMENTED: `server/kyc.mjs` (onfido/persona/jumio); front-end calls `/api/kyc/*`.
- Next: wire adapters to live backend `/kyc/*` endpoints (done in this repo).
- Ref: forge-framework 03-design, WCAG 2.1.
