const PROD_API = "https://agenticprojects-nmyk.onrender.com";
const DEV_API = "/api";

const isProd = window.location.hostname.includes("github.io");
const BASE = isProd ? PROD_API : DEV_API;

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  name: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: string;
  amount: number;
  description: string;
  category: string | null;
  date: number;
  balanceAfter: number;
}

export interface Transfer {
  id: string;
  fromAccountId: string;
  toAccountId: string | null;
  amount: number;
  transferType: string;
  status: string;
  reference: string | null;
  createdAt: number;
}

export interface KycDocumentCheck {
  status: string;
  docType: string;
  score: number;
}

export interface KycLivenessCheck {
  status: string;
}

export interface KycWatchlistCheck {
  status: string;
  details?: string;
}

export const api = {
  register: (body: { email: string; password: string; fullName: string }) =>
    http<{ token: string; user: any }>("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) =>
    http<{ token: string; user: any }>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => http<any>("/auth/me"),

  listAccounts: () => http<{ accounts: Account[] }>("/accounts"),
  createAccount: (body: { type: string; name: string }) =>
    http<Account>("/accounts", { method: "POST", body: JSON.stringify(body) }),
  getAccount: (id: string) => http<Account & { transactions: Transaction[] }>(`/accounts/${id}`),

  listTransactions: (params?: { accountId?: string; page?: number; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params?.accountId) qs.set("accountId", params.accountId);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));
    return http<{ transactions: Transaction[]; total: number; page: number; totalPages: number }>(
      `/transactions?${qs.toString()}`
    );
  },

  listTransfers: () => http<{ transfers: Transfer[] }>("/transfers"),
  createTransfer: (body: { fromAccountId: string; toAccountId?: string; amount: number; transferType: string; reference?: string }) =>
    http<Transfer>("/transfers", { method: "POST", body: JSON.stringify(body) }),

  kycDocument: (vendor: string, fileName: string, applicantName: string) =>
    http<KycDocumentCheck>("/kyc/document", { method: "POST", body: JSON.stringify({ vendor, fileName, applicantName }) }),
  kycLiveness: (vendor: string, applicantName: string) =>
    http<KycLivenessCheck>("/kyc/liveness", { method: "POST", body: JSON.stringify({ vendor, applicantName }) }),
  kycWatchlist: (vendor: string, fullName: string, nationalId: string) =>
    http<KycWatchlistCheck>("/kyc/watchlist", { method: "POST", body: JSON.stringify({ vendor, fullName, nationalId }) }),

  createApplication: (body: { firstName: string; lastName: string; product: string; consent: boolean }) =>
    http<{ id: string; status: string; createdAt: string }>("/applications", { method: "POST", body: JSON.stringify(body) }),
};
