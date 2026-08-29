# Project Scaffold: BankingApp

**Created**: 2026-08-29T17:15:00Z | **Phase**: Initiation | **Status**: draft
**Author**: Forge Agent (using AgenticWorld forge-framework 00-greenfield-master) | **Version**: 1.0.0
**Project**: BankingApp

## Executive Summary

BankingApp is a full-featured digital banking platform enabling retail and business customers to open accounts, manage transactions, transfer funds, and complete KYC verification through a modern, accessible web interface. Built with React 18, TypeScript, Vite, Tailwind CSS, and Lucide icons, it delivers a production-grade banking experience with real-time analytics and compliance-ready audit trails.

## Project Charter

### Vision

Democratize access to enterprise-grade banking technology by delivering a complete, open-source digital banking platform that any financial institution can deploy, customize, and extend — from account opening to transaction management to regulatory compliance.

### Goals

1. **Complete Banking Features**: Account management (checking/savings/business), transaction history, internal/external/wire transfers, KYC identity verification, and beneficial ownership tracking.
2. **Modern UI/UX**: Responsive, accessible (WCAG 2.1 AA), real-time dashboard with analytics, dark mode support, and mobile-first design.
3. **Production-Ready**: TypeScript end-to-end, comprehensive test coverage, CI/CD pipeline, security audit, and deployment automation.
4. **Compliance-First**: GDPR/CCPA data handling, FATF KYC/AML screening, immutable audit logs, and consent management.

### Success Criteria

- **Functional**: All banking features (accounts, transfers, KYC, dashboard) work end-to-end with <200ms UI response time.
- **Quality**: ≥80% test coverage, zero critical/high defects, Lighthouse accessibility score ≥90.
- **Performance**: Initial load <2.5s, Time to Interactive <3s, 99.9% uptime.
- **Compliance**: WCAG 2.1 AA, GDPR data minimization, KYC/AML screening integrated.

### Target Users

- **Retail Customers**: Individuals opening personal checking/savings accounts, managing transactions, transferring funds.
- **Business Customers**: Companies requiring business accounts, multi-user access, beneficial ownership tracking, higher transfer limits.
- **Bank Officers (RM/Compliance)**: Relationship managers reviewing applications, approving/rejecting accounts, monitoring transactions.
- **Administrators**: System admins managing users, configuring KYC vendors, monitoring system health.

### Constraints

- Timeline: 4-6 weeks for v1 MVP
- Team: 1-2 developers (full-stack)
- Budget: Open-source stack (free tiers for hosting)
- Compliance: GDPR, CCPA, FATF KYC/AML, WCAG 2.1 AA
- Tech: React 18 + TypeScript + Vite + Tailwind CSS + Lucide icons (mandatory)

## Project Structure

### Directory Layout

```
BankingApp/
├── README.md
├── LICENSE
├── .gitignore
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── api-reference.md
│   ├── research-report.md
│   ├── analysis-report.md
│   ├── design-document.md
│   ├── test-plan.md
│   ├── deployment-plan.md
│   ├── security-audit-report.md
│   ├── compliance-audit-report.md
│   └── adr/
│       ├── 001-tech-stack.md
│       ├── 002-database-choice.md
│       └── 003-kyc-approach.md
├── src/
│   ├── main/
│   │   ├── frontend/
│   │   │   ├── components/
│   │   │   │   ├── ui/           # shadcn-style primitives
│   │   │   │   ├── layout/       # App shell, sidebar, topbar
│   │   │   │   ├── dashboard/    # KPI cards, charts
│   │   │   │   ├── accounts/     # Account cards, details
│   │   │   │   ├── transactions/ # Transaction list, filters
│   │   │   │   ├── transfers/    # Transfer forms, confirmations
│   │   │   │   ├── kyc/          # Document upload, verification
│   │   │   │   └── onboarding/   # Multi-step wizard
│   │   │   ├── screens/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Accounts.tsx
│   │   │   │   ├── AccountDetail.tsx
│   │   │   │   ├── Transactions.tsx
│   │   │   │   ├── Transfers.tsx
│   │   │   │   ├── NewApplication.tsx
│   │   │   │   ├── ApplicationDetail.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   └── Settings.tsx
│   │   │   ├── hooks/
│   │   │   ├── services/         # API client
│   │   │   ├── stores/           # State management
│   │   │   ├── types/            # Domain types
│   │   │   ├── utils/            # Helpers, formatters
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   └── backend/
│   │       ├── routes/
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── models/
│   │       ├── middleware/
│   │       └── index.mjs
│   └── test/
│       ├── unit/
│       ├── integration/
│       └── e2e/
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   └── render.yaml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── scripts/
│   ├── setup.sh
│   ├── test.sh
│   └── deploy.sh
├── forge.config.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

### Configuration Files

#### forge.config.md

```markdown
# Forge Configuration

## Project Settings
- project_name: BankingApp
- project_type: web
- tech_stack: React 18, TypeScript, Vite, Tailwind CSS, Lucide, Node.js, Express
- team_size: 1-2
- timeline: 4-6 weeks
- compliance: GDPR, CCPA, FATF KYC/AML, WCAG 2.1 AA

## Global Settings
- output_format: markdown
- quality_gates: enabled
- verbosity: standard
- language: en
- strict_mode: true

## Phase Overrides
- 01-research:
  - mode: deep
- 04-implement:
  - verbosity: detailed
```

## Technology Stack

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| Frontend Framework | React 18 | 18.3.x | Concurrent features, Suspense, largest ecosystem |
| Language | TypeScript | 5.6.x | End-to-end type safety, fewer runtime errors |
| Build Tool | Vite | 5.4.x | Fastest HMR, optimized builds, native ESM |
| Styling | Tailwind CSS | 3.4.x | Utility-first, tiny bundle, rapid prototyping |
| UI Components | shadcn/ui | latest | Accessible, customizable, copy-paste primitives |
| Icons | Lucide React | latest | Clean, consistent, tree-shakeable icon set |
| State Management | Zustand | 4.5.x | Minimal boilerplate, TypeScript-first |
| Data Fetching | TanStack Query | 5.x | Caching, background sync, optimistic updates |
| Forms | React Hook Form + Zod | 7.x + 3.x | Type-safe validation, minimal re-renders |
| Charts | Recharts | 2.x | Composable, React-native charts |
| Testing (FE) | Vitest + Testing Library | 4.x + 16.x | Fast, jsdom, great DX |
| Backend | Node.js + Express | 22.x + 4.x | Lightweight, fast, JavaScript everywhere |
| Database | SQLite (dev) / Postgres (prod) | 16.x | Simple dev, scalable prod |
| Testing (BE) | node:test | native | Zero dependencies, built into Node.js |
| CI/CD | GitHub Actions | native | Repo-native, free for public repos |
| Hosting | Render / Cloudflare Pages | — | Free tier, auto-deploy from Git |

## Initial Setup

### Prerequisites

- Node.js 22.x
- npm 10.x
- Git

### Setup Steps

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` (starts API + web together)
4. Open http://localhost:5173

### Verification

- [ ] Build passes (`npm run build`)
- [ ] Tests pass (`npm run test:all`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation complete

## Milestones

| Milestone | Deliverable | Target Date | Status |
|-----------|-------------|-------------|--------|
| M1 | Project scaffold + research | Week 1 | pending |
| M2 | Analysis + design complete | Week 1-2 | pending |
| M3 | MVP implementation (accounts, dashboard) | Week 2-3 | pending |
| M4 | Transfers + KYC + onboarding | Week 3-4 | pending |
| M5 | Testing + security audit | Week 4-5 | pending |
| M6 | Production deployment | Week 5-6 | pending |

## Risk Register

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| R001 | Scope creep (too many banking features) | H | H | Prioritize MVP; defer advanced features to v2 |
| R002 | KYC vendor integration complexity | M | H | Abstraction layer; start with mock adapters |
| R003 | Performance issues with large transaction history | M | M | Virtualized lists; pagination; IndexedDB caching |
| R004 | Security vulnerability (XSS, injection) | L | H | CSP headers; input sanitization; security audit |
| R005 | Accessibility non-compliance | M | M | shadcn/ui primitives; axe-core automated tests |
| R006 | Database migration challenges (SQLite → Postgres) | L | M | Use ORM (Drizzle/Prisma); migration scripts |

## Next Steps

1. Execute research phase (workflow 01) — technology evaluation, competitive analysis
2. Execute analysis phase (workflow 02) — requirements, feasibility, risk assessment
3. Execute design phase (workflow 03) — architecture, component design, API spec
4. Execute implementation phase (workflow 04) — incremental feature development
5. Execute testing phase (workflow 05) — unit, integration, E2E tests
6. Execute deployment phase (workflow 07) — CI/CD, hosting, monitoring

## References

- React 18 Documentation (react.dev)
- Vite Documentation (vitejs.dev)
- Tailwind CSS Documentation (tailwindcss.com)
- shadcn/ui (ui.shadcn.com)
- Lucide Icons (lucide.dev)
- TanStack Query (tanstack.com/query)
- AgenticWorld forge-framework (github.com/saileshkushwaha/AgenticWorld)
