# ADR-001: Technology Stack Selection

**Status**: accepted
**Date**: 2026-08-29
**Decided by**: Forge Agent (using AgenticWorld forge-framework)

## Context

BankingApp requires a modern, performant, and maintainable technology stack for a full-featured digital banking platform. The stack must support: real-time dashboard analytics, accessible UI components, type safety end-to-end, and rapid development by a small team (1-2 developers).

## Decision

Adopt the following stack:

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend Framework | React 18 | 18.3.x |
| Language | TypeScript | 5.6.x |
| Build Tool | Vite | 5.4.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | shadcn/ui | latest |
| Icons | Lucide React | latest |
| Data Fetching | TanStack Query | 5.x |
| State Management | Zustand | 4.5.x |
| Forms | React Hook Form + Zod | 7.x + 3.x |
| Charts | Recharts | 2.x |
| Backend Runtime | Node.js | 22.x |
| Backend Framework | Express | 4.x |
| Database (dev) | SQLite | 3.x |
| Database (prod) | Postgres | 16.x |
| ORM | Drizzle | latest |
| Testing (FE) | Vitest + Testing Library | 4.x + 16.x |
| Testing (BE) | node:test | native |

## Rationale

- **React 18 + Vite**: Largest ecosystem, fastest builds, most banking precedent (Tailgrids 2026 confirms React as dominant dashboard choice).
- **shadcn/ui**: Copy-paste model eliminates dependency lock-in; components are accessible-by-default (Radix UI primitives); full customization for banking-specific needs.
- **Lucide**: Standard in shadcn/ui templates; 1,500+ tree-shakeable icons; clean, consistent design language.
- **TanStack Query + Zustand**: Separation of server state (caching, background sync) from UI state (theme, sidebar) — essential for banking data freshness.
- **React Hook Form + Zod**: Performant forms with type-safe validation — critical for banking forms (transfers, KYC, account creation).
- **Recharts**: React-native, composable charts; standard in all major fintech dashboard templates.
- **Node.js + Express**: Largest backend ecosystem; JavaScript end-to-end reduces context switching.
- **SQLite → Postgres**: Zero-config development; production-grade scalability; SQL standard.
- **Drizzle ORM**: Lightweight, type-safe migrations; better fit than Prisma for small teams.

## Consequences

- Positive: Full type safety end-to-end; accessible UI by default; smallest bundle size; no vendor lock-in.
- Negative: No SSR (not needed for auth-gated SPA); requires manual component setup (mitigated by shadcn CLI).
- Risk: Tailwind v4 is newer (mitigated by stable release pinning).

## References

- Tailgrids 2026 Dashboard Report
- shadcn-fintech (github.com/abderrahimghazali/shadcn-fintech)
- AgenticWorld forge-framework 01-research workflow
