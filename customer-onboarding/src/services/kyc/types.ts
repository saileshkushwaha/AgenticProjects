// Shared KYC contract types (used by the front-end API client).
// Server-side implementations live in `server/kyc.mjs`.

export type KycVendorName = "onfido" | "persona" | "jumio";

export type DocCheckStatus = "Uploaded" | "Verified" | "Failed";
export type LivenessStatus = "Pending" | "Passed" | "Failed";
export type WatchlistStatus = "Pending" | "Clear" | "Hit";

export interface KycDocumentCheck {
  status: DocCheckStatus;
  docType: string;
  score: number;
}

export interface KycLivenessCheck {
  status: LivenessStatus;
}

export interface KycWatchlistCheck {
  status: WatchlistStatus;
  details?: string;
}

export interface KycVerificationResult {
  document: KycDocumentCheck;
  liveness: KycLivenessCheck;
  watchlist: KycWatchlistCheck;
  overallScore: number | null;
}
