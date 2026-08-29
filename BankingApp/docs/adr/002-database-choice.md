# ADR-002: Database Strategy (SQLite → Postgres)

**Status**: accepted
**Date**: 2026-08-29
**Decided by**: Forge Agent (using AgenticWorld forge-framework)

## Context

BankingApp requires a database strategy that balances development simplicity with production reliability. The database must store: accounts, transactions, users, KYC records, audit logs, and session data with ACID compliance.

## Decision

Use **SQLite for development** and **PostgreSQL for production**, with **Drizzle ORM** for type-safe schema definition and migrations.

## Rationale

- **SQLite (dev)**: Zero configuration; file-based; perfect for local development and testing. No Docker or external services needed.
- **PostgreSQL (prod)**: Industry standard for financial applications; ACID compliant; JSON support; excellent Drizzle integration; free tier on Render/Railway.
- **Drizzle ORM**: Lightweight; type-safe schema; generates SQL migrations; better fit than Prisma for small teams (no codegen overhead).

## Schema Overview

```typescript
// Core entities
users          → id, email, password_hash, role, created_at
accounts       → id, user_id, type (checking/savings/business), balance, currency, status
transactions   → id, account_id, type (credit/debit), amount, description, category, date
transfers      → id, from_account_id, to_account_id, amount, status, reference
kyc_records    → id, user_id, status, document_type, vendor, score, verified_at
audit_logs     → id, user_id, action, entity_type, entity_id, metadata, timestamp
sessions       → id, user_id, token, expires_at
```

## Consequences

- Positive: Simple local dev; production-grade reliability; type-safe queries.
- Negative: Requires migration path from SQLite to Postgres (handled by Drizzle migrations).
- Risk: SQLite and Postgres have minor type differences (mitigated by Drizzle's dialect abstraction).

## References

- Drizzle ORM documentation (orm.drizzle.team)
- PostgreSQL official docs (postgresql.org)
- AgenticWorld forge-framework 03-design workflow
