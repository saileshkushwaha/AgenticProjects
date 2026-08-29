// Server-side KYC vendor adapters.
//
// In production these would call the vendor SDK through the bank's backend
// (which holds API keys + satisfies data residency). Here they return the same
// structured contract the front-end expects, with simulated network latency.
// Selection is driven by `KYC_VENDOR` env or a per-request `vendor` field.

function latency(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function guessDocType(fileName) {
  const f = (fileName || "").toLowerCase();
  if (f.includes("passport")) return "Passport";
  if (f.includes("license") || f.includes("dl")) return "Driver's License";
  if (f.includes("id")) return "National ID";
  return "Government ID";
}

const vendors = {
  onfido: {
    name: "onfido",
    async verifyDocument({ fileName }) {
      await latency(900);
      return { status: "Verified", docType: guessDocType(fileName), score: 94 };
    },
    async checkLiveness() {
      await latency(1100);
      return { status: "Passed" };
    },
    async screenWatchlist({ fullName }) {
      await latency(700);
      const hit = (fullName || "").toLowerCase().includes("beck");
      return hit
        ? { status: "Hit", details: "Potential match on sanctions list" }
        : { status: "Clear" };
    },
  },
  persona: {
    name: "persona",
    async verifyDocument({ fileName }) {
      await latency(800);
      return { status: "Verified", docType: guessDocType(fileName), score: 91 };
    },
    async checkLiveness() {
      await latency(1000);
      return { status: "Passed" };
    },
    async screenWatchlist({ fullName }) {
      await latency(650);
      const hit = (fullName || "").toLowerCase().includes("becker");
      return hit
        ? { status: "Hit", details: "PEP match in Persona watchlist" }
        : { status: "Clear" };
    },
  },
  jumio: {
    name: "jumio",
    async verifyDocument({ fileName }) {
      await latency(950);
      return { status: "Verified", docType: guessDocType(fileName), score: 96 };
    },
    async checkLiveness() {
      await latency(1200);
      return { status: "Passed" };
    },
    async screenWatchlist({ fullName }) {
      await latency(720);
      const hit = (fullName || "").toLowerCase().includes("tom");
      return hit
        ? { status: "Hit", details: "Watchlist hit — manual review required" }
        : { status: "Clear" };
    },
  },
};

export function getVendor(name) {
  return vendors[name] || vendors.persona;
}

export const VENDOR_NAMES = Object.keys(vendors);
