# ADR-003: KYC Vendor Abstraction Approach

**Status**: accepted
**Date**: 2026-08-29
**Decided by**: Forge Agent (using AgenticWorld forge-framework)

## Context

BankingApp requires Know Your Customer (KYC) identity verification to comply with FATF/AML regulations. Multiple vendors exist (Onfido, Persona, Jumio) with different APIs, pricing, and regional availability. The architecture must support vendor switching without frontend changes.

## Decision

Implement a **vendor-agnostic KYC proxy** on the backend with swappable adapters for Onfido, Persona, and Jumio. The frontend communicates only with the bank's backend, never directly with KYC vendors.

## Architecture

```
Frontend (React)
    │  POST /api/kyc/document
    │  POST /api/kyc/liveness
    │  POST /api/kyc/watchlist
    ▼
Express API (Node.js)
    │  getVendor(vendorName)
    ▼
KYC Adapter Interface
    ├─ OnfidoAdapter
    ├─ PersonaAdapter
    └─ JumioAdapter
    ▼
Vendor SDK (API keys held server-side)
```

## Rationale

- **Security**: API keys never exposed to the frontend; all vendor calls proxied through backend.
- **Swappability**: Vendor selection via `KYC_VENDOR` env var or per-request `vendor` field.
- **Data Residency**: Backend proxy satisfies data residency requirements (PII never leaves bank infrastructure).
- **Testability**: Mock adapters enable development without vendor credentials.

## Adapter Contract

```typescript
interface KycVendorAdapter {
  name: string;
  verifyDocument(input: { fileName: string; applicantName: string }): Promise<KycDocumentCheck>;
  checkLiveness(input: { applicantName: string }): Promise<KycLivenessCheck>;
  screenWatchlist(input: { fullName: string; nationalId: string }): Promise<KycWatchlistCheck>;
}
```

## Consequences

- Positive: Vendor-agnostic; secure; testable; compliant.
- Negative: Additional backend layer to maintain.
- Risk: Vendor API changes (mitigated by adapter pattern).

## References

- FATF KYC/AML guidance (fatf-gafi.org)
- Onfido/Persona/Jumio SDK documentation
- AgenticWorld forge-framework 03-design workflow
