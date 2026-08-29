import type { Application } from "../data/mock";
import type {
  KycDocumentCheck,
  KycLivenessCheck,
  KycWatchlistCheck,
  KycVendorName,
} from "./kyc/types";

// Same-origin "/api" by default (single-service deploy). For a split deploy
// (SPA on Cloudflare Pages, API on Render), set VITE_API_URL to the API origin.
const BASE = import.meta.env.VITE_API_URL || "/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export interface NewApplicationInput {
  firstName: string;
  lastName: string;
  product: string;
  consent: boolean;
  email?: string;
  nationalId?: string;
}

export interface DecisionInput {
  decision: "Approved" | "Rejected";
  reason?: string;
}

export const api = {
  listApplications: () => http<Application[]>("/applications"),
  getApplication: (id: string) => http<Application>(`/applications/${id}`),
  createApplication: (body: NewApplicationInput) =>
    http<Application>("/applications", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  decide: (id: string, body: DecisionInput) =>
    http<Application>(`/applications/${id}/decision`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  kycDocument: (vendor: KycVendorName, fileName: string, applicantName: string) =>
    http<KycDocumentCheck>("/kyc/document", {
      method: "POST",
      body: JSON.stringify({ vendor, fileName, applicantName }),
    }),
  kycLiveness: (vendor: KycVendorName, applicantName: string) =>
    http<KycLivenessCheck>("/kyc/liveness", {
      method: "POST",
      body: JSON.stringify({ vendor, applicantName }),
    }),
  kycWatchlist: (
    vendor: KycVendorName,
    fullName: string,
    nationalId: string
  ) =>
    http<KycWatchlistCheck>("/kyc/watchlist", {
      method: "POST",
      body: JSON.stringify({ vendor, fullName, nationalId }),
    }),
};
