# Design Document: BankingApp

**Created**: 2026-08-29T17:30:00Z | **Phase**: Design | **Status**: draft
**Author**: Forge Agent (using AgenticWorld forge-framework 03-design) | **Version**: 1.0.0

## Executive Summary

This document specifies the complete architecture and design for BankingApp — a full-featured digital banking platform. The design adopts a SPA architecture (React 18 + Vite) backed by a REST API (Node.js + Express) with SQLite/Postgres database. The component architecture follows shadcn/ui primitives with domain-specific banking components. All design decisions trace to functional requirements FR-01 through FR-12 and non-functional requirements NFR-01 through NFR-15.

## Design Objectives

- Objective 1: Design a scalable SPA architecture supporting all banking features (accounts, transactions, transfers, KYC).
- Objective 2: Define a normalized data model supporting audit trails, KYC records, and multi-account relationships.
- Objective 3: Specify a REST API contract enabling optimistic updates, pagination, and vendor-agnostic KYC.
- Objective 4: Integrate security (CSP, input sanitization, Helmet.js) and accessibility (WCAG 2.1 AA) into the design.
- Objective 5: Document all significant design decisions as ADRs with rationale and trade-offs.

## Requirements Traceability

| Requirement | Design Element | Status |
|-------------|----------------|--------|
| FR-01 Account opening wizard | `NewApplication` screen + `onboarding/` components | addressed |
| FR-02 KYC verification | `KycVerification` component + `/api/kyc/*` endpoints | addressed |
| FR-03 Account dashboard | `Dashboard` screen + `AccountCard` components | addressed |
| FR-04 Transaction history | `Transactions` screen + virtualized table | addressed |
| FR-05 Internal transfers | `TransferForm` component + `/api/transfers` endpoint | addressed |
| FR-06 External transfers | `ExternalTransferForm` + ACH/wire flow | addressed |
| FR-07 Officer review queue | `ReviewQueue` screen + `/api/applications` endpoints | addressed |
| FR-08 Beneficial ownership | `BeneficialOwner` component + KYC integration | addressed |
| FR-09 User profile | `Profile` screen + `/api/users/:id` endpoints | addressed |
| FR-10 Notifications | `NotificationCenter` + WebSocket/SSE | addressed |
| FR-11 Dark mode | CSS variables + Tailwind `dark:` variant | addressed |
| FR-12 Multi-language | i18n provider + locale files | addressed |
| NFR-01-NFR-04 Performance | TanStack Query caching, virtualized lists, code splitting | addressed |
| NFR-NFR-08 Security | Helmet.js, CSP, input sanitization, Zod validation | addressed |
| NFR-11 Accessibility | shadcn/ui primitives (Radix), axe-core CI | addressed |
| NFR-14 Test coverage | Vitest + Testing Library + node:test | addressed |
| NFR-15 Audit trail | `audit_logs` table + immutable append-only design | addressed |

## Architecture

### Architectural Style

**SPA (Single Page Application) with REST API backend.**

Rationale: BankingApp is an auth-gated internal tool where SSR provides no SEO benefit. SPA delivers fastest development, simplest deployment, and best DX. The backend serves a REST API consumed by the SPA.

### System Context

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (React SPA)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │Dashboard │  │Accounts  │  │Transfers │  │Onboarding    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │              │               │           │
│  ┌────┴──────────────┴──────────────┴───────────────┴───────┐  │
│  │              TanStack Query (Data Fetching)               │  │
│  └──────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │ HTTPS (TLS 1.3)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express API (Node.js)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │Auth      │  │Accounts  │  │Transfers │  │KYC Proxy     │   │
│  │Routes    │  │Routes    │  │Routes    │  │Routes        │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │              │               │           │
│  ┌────┴──────────────┴──────────────┴───────────────┴───────┐  │
│  │                    Drizzle ORM                            │  │
│  └──────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                SQLite (dev) / PostgreSQL (prod)                  │
│  ┌────────┐ ┌─────────┐ ┌────────────┐ ┌─────────┐ ┌───────┐ │
│  │users   │ │accounts │ │transactions│ │kyc      │ │audit  │ │
│  └────────┘ └─────────┘ └────────────┘ └─────────┘ └───────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App
├── Router (React Router v6)
│   ├── /dashboard          → Dashboard
│   ├── /accounts           → Accounts
│   ├── /accounts/:id       → AccountDetail
│   ├── /transactions       → Transactions
│   ├── /transfers          → Transfers
│   ├── /applications       → NewApplication
│   ├── /applications/:id   → ApplicationDetail
│   ├── /profile            → Profile
│   └── /settings           → Settings
├── Layout
│   ├── Sidebar (navigation)
│   ├── Topbar (search, notifications, avatar)
│   └── Main (page content)
├── Providers
│   ├── QueryClientProvider (TanStack Query)
│   ├── ThemeProvider (dark mode)
│   └── AuthProvider (session context)
└── Stores (Zustand)
    ├── useAuthStore
    ├── useThemeStore
    └── useUIStore
```

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare Pages                         │
│                   (Static SPA Hosting)                        │
│              dist/ → CDN → Browser                           │
└──────────────────────────┬──────────────────────────────────┘
                           │ /api/*
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Render Web Service                        │
│                   (Express API + SPA fallback)                │
│              :8787 → Express → Drizzle → SQLite/Postgres     │
└─────────────────────────────────────────────────────────────┘
```

## Component Designs

### Component 1: Dashboard

**Responsibility**: Display financial overview with KPI cards, spending charts, and quick actions.

**Interface**:
- Input: `userId` (from auth context)
- Output: Rendered dashboard with account balances, spending chart, recent transactions

**Dependencies**: `useAccounts` hook, `useTransactions` hook, `AccountCard`, `SpendingChart`, `RecentTransactions`

**Design Patterns**: Container/Presentational (Dashboard container fetches data; presentational components render)

**Internal Structure**:
```
Dashboard
├── KpiCards (total balance, monthly income, monthly expenses, savings rate)
├── SpendingChart (Recharts area/bar chart, category breakdown)
├── QuickActions (transfer, pay, deposit buttons)
└── RecentTransactions (last 5 transactions, link to full history)
```

### Component 2: NewApplication (Onboarding Wizard)

**Responsibility**: Guide users through multi-step account opening with KYC verification.

**Interface**:
- Input: None (creates new application)
- Output: Application submitted; redirect to dashboard

**Dependencies**: `useForm` (React Hook Form), `Zod` schema, `KycVerification` component, `useCreateApplication` mutation

**Design Patterns**: Stepper pattern (5 steps with validation gate per step); Compound component (StepPersonal, StepContact, StepFinancial, StepIdentity, StepReview)

**Internal Structure**:
```
NewApplication
├── Stepper (progress indicator)
├── StepPersonal (name, DOB, SSN — required)
├── StepContact (email, phone, address — required)
├── StepFinancial (employment, income — optional)
├── StepIdentity (KYC document upload, liveness, watchlist — required)
├── StepReview (summary, consent checkboxes — required)
└── Navigation (back/next/submit buttons)
```

### Component 3: TransferForm

**Responsibility**: Handle internal and external fund transfers with validation and confirmation.

**Interface**:
- Input: Transfer type (internal/external), source account, destination, amount, memo
- Output: Transfer submitted; optimistic balance update; success/error toast

**Dependencies**: `useForm` + `Zod`, `useTransfer` mutation, `useAccounts` query

**Design Patterns**: Optimistic update (balance updates immediately; rolls back on error); Confirmation dialog for large amounts

**Internal Structure**:
```
TransferForm
├── TransferTypeSelector (internal / external)
├── SourceAccountSelect (populated from accounts)
├── DestinationInput (account number + routing for external)
├── AmountInput (currency formatted, min/max validation)
├── MemoInput (optional)
├── ConfirmationDialog (shows fees, total, recipient)
└── SubmitButton (disabled until valid)
```

### Component 4: KycVerification

**Responsibility**: Handle document upload, liveness check, and watchlist screening.

**Interface**:
- Input: Applicant name, document file, vendor selection
- Output: Verification result (Verified/Failed/Pending), risk score

**Dependencies**: `useKycDocument`, `useKycLiveness`, `useKycWatchlist` mutations

**Design Patterns**: Adapter pattern (vendor-agnostic); Status polling (check result after upload)

**Internal Structure**:
```
KycVerification
├── VendorSelector (onfido / persona / jumio)
├── DocumentUpload (drag-drop, PDF/JPG/PNG, max 10MB)
├── DocumentStatus (Verified/Failed/Failed with score)
├── LivenessCheck (selfie capture, Passed/Failed)
├── WatchlistScreen (Clear/Hit with details)
└── RiskScoreDisplay (0-100, color-coded)
```

## Data Model

### Entity-Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────────┐
│    users     │       │   accounts   │       │  transactions    │
├──────────────┤       ├──────────────┤       ├──────────────────┤
│ id (PK)      │──┐    │ id (PK)      │──┐    │ id (PK)          │
│ email        │  │    │ user_id (FK) │  │    │ account_id (FK)  │
│ password_hash│  │    │ type         │  │    │ type             │
│ role         │  │    │ balance      │  │    │ amount           │
│ full_name    │  │    │ currency     │  │    │ description      │
│ status       │  │    │ status       │  │    │ category         │
│ created_at   │  │    │ created_at   │  │    │ date             │
│ updated_at   │  │    └──────────────┘  │    │ balance_after     │
└──────────────┘  │                     │    │ created_at       │
                  │                     │    └──────────────────┘
                  │                     │
                  │    ┌──────────────┐ │    ┌──────────────────┐
                  │    │  transfers   │ │    │  audit_logs      │
                  │    ├──────────────┤ │    ├──────────────────┤
                  │    │ id (PK)      │ │    │ id (PK)          │
                  └────│ from_account │ │    │ user_id (FK)     │
                       │ to_account   │ │    │ action           │
                       │ amount       │ │    │ entity_type      │
                       │ type         │ │    │ entity_id        │
                       │ status       │ │    │ metadata (JSON)  │
                       │ reference    │ │    │ timestamp        │
                       │ created_at   │ │    └──────────────────┘
                       └──────────────┘ │
                                        │    ┌──────────────────┐
                                        │    │  kyc_records     │
                                        │    ├──────────────────┤
                                        └────│ id (PK)          │
                                             │ user_id (FK)     │
                                             │ status           │
                                             │ document_type    │
                                             │ vendor           │
                                             │ score            │
                                             │ verified_at      │
                                             └──────────────────┘
```

### Entity Definitions

#### Entity 1: users

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique user identifier |
| email | text | NOT NULL, UNIQUE | User email (login) |
| password_hash | text | NOT NULL | Bcrypt hashed password |
| role | text | NOT NULL, default 'customer' | customer / officer / admin |
| full_name | text | NOT NULL | Display name |
| status | text | NOT NULL, default 'active' | active / suspended / closed |
| created_at | timestamp | NOT NULL, default now() | Account creation time |
| updated_at | timestamp | NOT NULL, default now() | Last update time |

#### Entity 2: accounts

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique account identifier |
| user_id | uuid | NOT NULL, FK → users.id | Account owner |
| type | text | NOT NULL | checking / savings / business |
| balance | integer | NOT NULL, default 0 | Balance in cents (avoid float rounding) |
| currency | text | NOT NULL, default 'USD' | ISO 4217 currency code |
| status | text | NOT NULL, default 'active' | active / frozen / closed |
| name | text | NOT NULL | Display name (e.g., "Primary Checking") |
| created_at | timestamp | NOT NULL, default now() | Account creation time |

#### Entity 3: transactions

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique transaction identifier |
| account_id | uuid | NOT NULL, FK → accounts.id | Associated account |
| type | text | NOT NULL | credit / debit |
| amount | integer | NOT NULL | Amount in cents (positive) |
| description | text | NOT NULL | Transaction description |
| category | text | | Category (food, transport, salary, etc.) |
| date | timestamp | NOT NULL | Transaction date |
| balance_after | integer | NOT NULL | Account balance after this transaction |
| created_at | timestamp | NOT NULL, default now() | Record creation time |

#### Entity 4: transfers

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique transfer identifier |
| from_account_id | uuid | NOT NULL, FK → accounts.id | Source account |
| to_account_id | uuid | FK → accounts.id | Destination (null for external) |
| external_routing | text | | Routing number for external transfers |
| external_account | text | | Account number for external transfers |
| amount | integer | NOT NULL | Amount in cents |
| type | text | NOT NULL | internal / ach / wire |
| status | text | NOT NULL, default 'pending' | pending / completed / failed |
| reference | text | | Transfer reference/memo |
| created_at | timestamp | NOT NULL, default now() | Transfer initiation time |

#### Entity 5: kyc_records

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique KYC record identifier |
| user_id | uuid | NOT NULL, FK → users.id | Associated user |
| status | text | NOT NULL, default 'pending' | pending / verified / failed |
| document_type | text | | passport / drivers_license / national_id |
| vendor | text | NOT NULL | onfido / persona / jumio |
| score | integer | | Risk score 0-100 |
| verified_at | timestamp | | Verification completion time |
| created_at | timestamp | NOT NULL, default now() | Record creation time |

#### Entity 6: audit_logs

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | Unique audit log identifier |
| user_id | uuid | FK → users.id | Acting user (null for system) |
| action | text | NOT NULL | create_account / transfer / kyc_verify / etc. |
| entity_type | text | NOT NULL | accounts / transactions / transfers / kyc |
| entity_id | uuid | | Affected entity ID |
| metadata | jsonb | | Additional context (before/after values) |
| timestamp | timestamp | NOT NULL, default now() | When the action occurred |

### Indexes

| Entity | Index | Type | Purpose |
|--------|-------|------|---------|
| users | email | UNIQUE | Fast login lookup |
| accounts | user_id | BTREE | List user's accounts |
| transactions | (account_id, date) | BTREE | Filter transactions by account + date range |
| transfers | (from_account_id, created_at) | BTREE | List account's outgoing transfers |
| kyc_records | user_id | BTREE | Get user's KYC status |
| audit_logs | (entity_type, entity_id) | BTREE | Audit trail for specific entity |
| audit_logs | timestamp | BTREE | Time-range audit queries |

## API Specification

### Authentication

All endpoints require `Authorization: Bearer <token>` header except `/api/auth/*`.

### API 1: Authentication

**Endpoint**: `POST /api/auth/register`
**Request**: ```json { "email": "string", "password": "string", "fullName": "string" } ```
**Response**: ```json { "token": "string", "user": { "id": "uuid", "email": "string", "role": "string" } } ```
**Errors**: 400: Validation error | 409: Email already exists

**Endpoint**: `POST /api/auth/login`
**Request**: ```json { "email": "string", "password": "string" } ```
**Response**: ```json { "token": "string", "user": { "id": "uuid", "email": "string", "role": "string" } } ```
**Errors**: 401: Invalid credentials

### API 2: Accounts

**Endpoint**: `GET /api/accounts`
**Response**: ```json { "accounts": [{ "id": "uuid", "type": "checking", "balance": 100000, "currency": "USD", "name": "Primary Checking", "status": "active" }] } ```

**Endpoint**: `POST /api/accounts`
**Request**: ```json { "type": "checking", "name": "Primary Checking" } ```
**Response**: ```json { "id": "uuid", "type": "checking", "balance": 0, ... } ```
**Errors**: 400: Invalid account type

**Endpoint**: `GET /api/accounts/:id`
**Response**: ```json { "id": "uuid", "type": "checking", "balance": 100000, "transactions": [...], ... } ```

### API 3: Transactions

**Endpoint**: `GET /api/transactions?accountId=&startDate=&endDate=&category=&page=1&limit=50`
**Response**: ```json { "transactions": [...], "total": 150, "page": 1, "totalPages": 3 } ```

### API 4: Transfers

**Endpoint**: `POST /api/transfers`
**Request**: ```json { "fromAccountId": "uuid", "toAccountId": "uuid", "amount": 5000, "type": "internal", "reference": "Rent payment" } ```
**Response**: ```json { "id": "uuid", "status": "completed", "fromAccount": {...}, "toAccount": {...} } ```
**Errors**: 400: Insufficient funds | 400: Invalid amount | 404: Account not found

### API 5: KYC

**Endpoint**: `POST /api/kyc/document`
**Request**: ```json { "vendor": "persona", "fileName": "passport.pdf", "applicantName": "Jane Doe" } ```
**Response**: ```json { "status": "Verified", "docType": "Passport", "score": 91 } ```

**Endpoint**: `POST /api/kyc/liveness`
**Request**: ```json { "vendor": "persona", "applicantName": "Jane Doe" } ```
**Response**: ```json { "status": "Passed" } ```

**Endpoint**: `POST /api/kyc/watchlist`
**Request**: ```json { "vendor": "persona", "fullName": "Jane Doe", "nationalId": "123-45-6789" } ```
**Response**: ```json { "status": "Clear" } ```

### API 6: Applications (Onboarding)

**Endpoint**: `POST /api/applications`
**Request**: ```json { "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com", "product": "checking", "consent": true } ```
**Response**: ```json { "id": "uuid", "status": "pending", "createdAt": "2026-08-29T17:30:00Z" } ```

**Endpoint**: `GET /api/applications?status=pending&page=1&limit=20`
**Response**: ```json { "applications": [...], "total": 45, "page": 1, "totalPages": 3 } ```

**Endpoint**: `POST /api/applications/:id/decision`
**Request**: ```json { "decision": "approved" | "rejected", "reason": "Optional reason" } ```
**Response**: ```json { "id": "uuid", "status": "approved", "decidedAt": "2026-08-29T17:35:00Z" } ```

## Architecture Decision Records

### ADR-001: SPA over SSR

**Status**: accepted
**Context**: BankingApp is an auth-gated internal tool. SSR provides no SEO benefit.
**Decision**: Use SPA (React + Vite) instead of SSR (Next.js).
**Consequences**: Positive: Faster builds, simpler deployment, best DX | Negative: No SSR (not needed)

### ADR-002: shadcn/ui over MUI/Ant Design

**Status**: accepted
**Context**: Banking UI requires full customization for domain-specific components.
**Decision**: Use shadcn/ui (copy-paste, Radix primitives) instead of MUI or Ant Design.
**Consequences**: Positive: Full ownership, no lock-in, accessible, smallest bundle | Negative: Manual component setup

### ADR-003: Vendor-Agnostic KYC Proxy

**Status**: accepted
Context: Multiple KYC vendors exist; vendor switching should not require frontend changes.
**Decision**: Backend proxy with adapter pattern; frontend calls `/api/kyc/*` only.
**Consequences**: Positive: Secure (keys server-side), swappable, testable | Negative: Extra backend layer

### ADR-004: Optimistic Updates for Transfers

**Status**: accepted
**Context**: Banking users expect instant feedback when initiating transfers.
**Decision**: Update UI immediately (optimistic); roll back on API error.
**Consequences**: Positive: Instant UX, perceived performance | Negative: Rollback complexity on failure

### ADR-005: Integer Cents for Monetary Values

**Status**: accepted
**Context**: Floating-point arithmetic causes rounding errors in financial calculations.
**Decision**: Store all monetary values as integer cents (e.g., $100.00 = 10000).
**Consequences**: Positive: No rounding errors, precise calculations | Negative: Requires formatting for display

## Security Design

**Authentication**: JWT tokens (HS256) with 24h expiry; refresh token rotation.
**Authorization**: Role-based (customer / officer / admin); middleware enforces role per route.
**Data Protection**: TLS 1.3 in transit; AES-256 at rest (Postgres); bcrypt password hashing (cost 12).
**Headers**: Helmet.js for CSP, X-Content-Type-Options, X-Frame-Options, etc.
**Input Validation**: Zod schemas on all API routes; parameterized queries via Drizzle (SQL injection prevention).
**CORS**: Restricted to known origins in production; open in development.
**Rate Limiting**: express-rate-limit on auth routes (5 req/min) and KYC routes (10 req/min).

## Performance Design

**Scalability**: Stateless API enables horizontal scaling; SQLite for dev, Postgres for prod.
**Caching**: TanStack Query stale-while-revalidate; 30s stale time for balances; 5min for transactions.
**Code Splitting**: React.lazy + Suspense per route; shadcn/ui components tree-shaken.
**Virtualization**: @tanstack/react-virtual for transaction lists >100 rows.

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial load | <2.5s | Lighthouse |
| Time to Interactive | <3.5s | Lighthouse |
| UI response | <200ms | RUM |
| API p95 | <500ms | Server logs |
| Test coverage | ≥80% | Vitest --coverage |

## Design Principles Applied

1. **Single Responsibility**: Each component has one reason to change (AccountCard displays; useAccounts fetches).
2. **Open/Closed**: KYC adapters extend base interface without modifying existing code.
3. **Interface Segregation**: Separate hooks for each domain (useAccounts, useTransactions, useTransfers).
4. **Dependency Inversion**: Components depend on abstractions (hooks), not concrete API implementations.
5. **DRY**: Shared shadcn/ui primitives; shared validation schemas; shared API client.
6. **YAGNI**: No premature abstraction; implement features when needed, not before.

## Trade-offs Accepted

| Trade-off | Gained | Sacrificed |
|-----------|--------|------------|
| SPA over SSR | Fastest dev, simplest deploy | No SSR (not needed) |
| shadcn/ui over MUI | Full ownership, no lock-in | Manual component setup |
| SQLite for dev | Zero config, instant setup | Minor dialect differences |
| Optimistic updates | Instant UX | Rollback complexity |
| Integer cents | Precision | Display formatting needed |

## Open Issues / Next Steps / References

- Issue: WebSocket vs SSE for real-time notifications (leaning toward SSE for simplicity).
- Issue: Drizzle ORM vs Prisma (leaning toward Drizzle for lightweight approach).
- Step: Execute implementation phase (workflow 04) — scaffold project, implement features incrementally.
- Step: Execute testing phase (workflow 05) — unit, integration, E2E tests.
- Step: Execute deployment phase (workflow 07) — CI/CD, hosting, monitoring.
- Reference: AgenticWorld forge-framework 03-design workflow
- Reference: shadcn-fintech (github.com/abderrahimghazali/shadcn-fintech)
- Reference: BankingApp research-report.md, analysis-report.md
