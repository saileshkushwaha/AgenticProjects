import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { getVendor, VENDOR_NAMES } from "./kyc.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8787;
const DEFAULT_VENDOR = process.env.KYC_VENDOR || "persona";

// ---- In-memory store (seeded; swap for a real DB in production) ----
let seq = 482;
const now = () => new Date().toISOString().slice(11, 16);

const applications = [
  {
    id: "APP-2026-0481",
    applicant: "Jane Doe",
    product: "Savings Account",
    submitted: "2026-08-28 19:02",
    status: "In Review",
    timeline: [
      { label: "Application submitted", time: "19:02", state: "done" },
      { label: "Documents received", time: "19:05", state: "done" },
      { label: "KYC / identity review", time: "now", state: "current" },
      { label: "Compliance review", time: "—", state: "todo" },
      { label: "Decision", time: "—", state: "todo" },
    ],
  },
  {
    id: "APP-2026-0478",
    applicant: "Marcus Lee",
    product: "Current Account",
    submitted: "2026-08-28 17:41",
    status: "Approved",
    timeline: [
      { label: "Application submitted", time: "17:41", state: "done" },
      { label: "Documents received", time: "17:44", state: "done" },
      { label: "KYC / identity review", time: "18:02", state: "done" },
      { label: "Compliance review", time: "18:20", state: "done" },
      { label: "Approved", time: "18:21", state: "done" },
    ],
  },
  {
    id: "APP-2026-0472",
    applicant: "Priya Nair",
    product: "Business Account",
    submitted: "2026-08-28 15:10",
    status: "Submitted",
    timeline: [
      { label: "Application submitted", time: "15:10", state: "done" },
      { label: "Documents received", time: "15:30", state: "done" },
      { label: "KYC / identity review", time: "pending", state: "todo" },
      { label: "Compliance review", time: "—", state: "todo" },
      { label: "Decision", time: "—", state: "todo" },
    ],
  },
  {
    id: "APP-2026-0465",
    applicant: "Tom Becker",
    product: "Loan — Personal",
    submitted: "2026-08-27 11:22",
    status: "Rejected",
    timeline: [
      { label: "Application submitted", time: "11:22", state: "done" },
      { label: "Documents received", time: "11:25", state: "done" },
      { label: "KYC / identity review", time: "12:00", state: "done" },
      { label: "Compliance review", time: "12:30", state: "done" },
      { label: "Rejected — watchlist hit", time: "12:31", state: "done" },
    ],
  },
];

// ---- Health ----
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, vendor: DEFAULT_VENDOR, vendors: VENDOR_NAMES });
});

// ---- Applications ----
app.get("/api/applications", (_req, res) => {
  res.json(applications);
});

app.get("/api/applications/:id", (req, res) => {
  const app = applications.find((a) => a.id === req.params.id);
  if (!app) return res.status(404).json({ error: "not found" });
  res.json(app);
});

app.post("/api/applications", (req, res) => {
  const b = req.body || {};
  if (!b.firstName || !b.lastName || !b.product || !b.consent) {
    return res
      .status(400)
      .json({ error: "firstName, lastName, product and consent are required" });
  }
  seq += 1;
  const id = `APP-2026-0${seq}`;
  const app = {
    id,
    applicant: `${b.firstName} ${b.lastName}`,
    product: b.product,
    submitted: `2026-08-28 ${now()}`,
    status: "Submitted",
    timeline: [
      { label: "Application submitted", time: now(), state: "done" },
      { label: "Documents received", time: now(), state: "done" },
      { label: "KYC / identity review", time: "pending", state: "todo" },
      { label: "Compliance review", time: "—", state: "todo" },
      { label: "Decision", time: "—", state: "todo" },
    ],
  };
  applications.unshift(app);
  res.status(201).json(app);
});

app.post("/api/applications/:id/decision", (req, res) => {
  const app = applications.find((a) => a.id === req.params.id);
  if (!app) return res.status(404).json({ error: "not found" });
  const { decision, reason } = req.body || {};
  if (decision !== "Approved" && decision !== "Rejected") {
    return res.status(400).json({ error: "decision must be Approved|Rejected" });
  }
  app.status = decision;
  app.timeline = app.timeline.map((t) =>
    t.state === "current" ? { ...t, state: "done" } : t
  );
  app.timeline.push({
    label:
      decision === "Approved"
        ? "Approved"
        : `Rejected${reason ? " — " + reason : ""}`,
    time: now(),
    state: "done",
  });
  res.json(app);
});

// ---- KYC proxy (vendor-agnostic) ----
app.post("/api/kyc/document", async (req, res) => {
  const b = req.body || {};
  const vendor = getVendor(b.vendor || DEFAULT_VENDOR);
  const result = await vendor.verifyDocument({
    fileName: b.fileName,
    applicantName: b.applicantName,
  });
  res.json(result);
});

app.post("/api/kyc/liveness", async (req, res) => {
  const b = req.body || {};
  const vendor = getVendor(b.vendor || DEFAULT_VENDOR);
  const result = await vendor.checkLiveness({ applicantName: b.applicantName });
  res.json(result);
});

app.post("/api/kyc/watchlist", async (req, res) => {
  const b = req.body || {};
  const vendor = getVendor(b.vendor || DEFAULT_VENDOR);
  const result = await vendor.screenWatchlist({
    fullName: b.fullName,
    nationalId: b.nationalId,
  });
  res.json(result);
});

// ---- Serve the built SPA (single-service deploy; same origin as /api) ----
const distDir = path.join(__dirname, "..", "dist");
if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).json({ error: "not found" });
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(
    `Customer Onboarding API listening on :${PORT} (KYC vendor: ${DEFAULT_VENDOR})`
  );
});
