import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync } from "fs";
import { db, sqlite, initializeDatabase } from "./db/index.mjs";
import { users, accounts, transactions, transfers, kycRecords, auditLogs } from "./db/schema.mjs";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { getVendor, VENDOR_NAMES } from "./kyc.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "banking-app-secret-key-change-in-production";
const PORT = process.env.PORT || 8787;
const DEFAULT_VENDOR = process.env.KYC_VENDOR || "persona";

async function seedDatabase() {
  try {
    const existing = await db.select().from(users).where(eq(users.email, "demo@bank.com")).limit(1);
    if (existing.length > 0) return;

    const userId = randomUUID();
    const passwordHash = await bcrypt.hash("demo1234", 12);
    await db.insert(users).values({ id: userId, email: "demo@bank.com", passwordHash, fullName: "Demo User", role: "customer" });

    const checkingId = randomUUID();
    const savingsId = randomUUID();
    await db.insert(accounts).values([
      { id: checkingId, userId, type: "checking", name: "Primary Checking", balance: 450000, currency: "USD", status: "active" },
      { id: savingsId, userId, type: "savings", name: "Emergency Savings", balance: 300000, currency: "USD", status: "active" },
    ]);

    const now = new Date();
    await db.insert(transactions).values([
      { id: randomUUID(), accountId: checkingId, type: "credit", amount: 500000, description: "Initial deposit", category: "income", date: now, balanceAfter: 500000 },
      { id: randomUUID(), accountId: savingsId, type: "credit", amount: 250000, description: "Savings deposit", category: "income", date: now, balanceAfter: 250000 },
      { id: randomUUID(), accountId: checkingId, type: "debit", amount: 50000, description: "Transfer: Monthly savings", category: "transfer", date: now, balanceAfter: 450000 },
      { id: randomUUID(), accountId: savingsId, type: "credit", amount: 50000, description: "Transfer received: Monthly savings", category: "transfer", date: now, balanceAfter: 300000 },
    ]);

    await db.insert(auditLogs).values({ id: randomUUID(), userId, action: "seed_data", entityType: "users", entityId: userId, metadata: JSON.stringify({ seeded: true }) });
  } catch (e) {
    console.error("Seed failed:", e);
  }
}

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  initializeDatabase();
  seedDatabase();

  // ---- Auth Middleware ----
  function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization header" });
    }
    try {
      const payload = jwt.verify(header.slice(7), JWT_SECRET);
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }

  function requireRole(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      next();
    };
  }

  // ---- Audit Log Helper ----
  async function logAudit(userId, action, entityType, entityId, metadata) {
    await db.insert(auditLogs).values({
      id: randomUUID(),
      userId,
      action,
      entityType,
      entityId,
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
  }

  // ---- Health ----
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, vendor: DEFAULT_VENDOR, vendors: VENDOR_NAMES });
  });

  // ---- Auth Routes ----
  app.post("/api/auth/register", async (req, res) => {
    const { email, password, fullName } = req.body || {};
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "email, password, and fullName are required" });
    }
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const id = randomUUID();
    await db.insert(users).values({ id, email, passwordHash, fullName, role: "customer" });
    await logAudit(id, "user_registered", "users", id);
    const token = jwt.sign({ id, email, role: "customer" }, JWT_SECRET, { expiresIn: "24h" });
    res.status(201).json({ token, user: { id, email, role: "customer", fullName } });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    const found = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (found.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = found[0];
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
    await logAudit(user.id, "user_login", "users", user.id);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, fullName: user.fullName } });
  });

  app.get("/api/auth/me", authMiddleware, async (req, res) => {
    const found = await db.select().from(users).where(eq(users.id, req.user.id)).limit(1);
    if (found.length === 0) return res.status(404).json({ error: "User not found" });
    const u = found[0];
    res.json({ id: u.id, email: u.email, role: u.role, fullName: u.fullName, status: u.status });
  });

  // ---- Account Routes ----
  app.get("/api/accounts", authMiddleware, async (req, res) => {
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id)).orderBy(desc(accounts.createdAt));
    res.json({ accounts: userAccounts });
  });

  app.post("/api/accounts", authMiddleware, async (req, res) => {
    const { type, name } = req.body || {};
    if (!type || !name) return res.status(400).json({ error: "type and name are required" });
    if (!["checking", "savings", "business"].includes(type)) {
      return res.status(400).json({ error: "type must be checking, savings, or business" });
    }
    const id = randomUUID();
    await db.insert(accounts).values({ id, userId: req.user.id, type, name, balance: 0, status: "active" });
    await logAudit(req.user.id, "account_created", "accounts", id, { type, name });
    const created = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
    res.status(201).json(created[0]);
  });

  app.get("/api/accounts/:id", authMiddleware, async (req, res) => {
    const found = await db.select().from(accounts).where(and(eq(accounts.id, req.params.id), eq(accounts.userId, req.user.id))).limit(1);
    if (found.length === 0) return res.status(404).json({ error: "Account not found" });
    const txns = await db.select().from(transactions).where(eq(transactions.accountId, req.params.id)).orderBy(desc(transactions.date)).limit(50);
    res.json({ ...found[0], transactions: txns });
  });

  app.post("/api/accounts/:id/deposit", authMiddleware, async (req, res) => {
    const { amount, description } = req.body || {};
    const amountCents = Math.round(Number(amount) * 100);
    if (!amountCents || amountCents <= 0) return res.status(400).json({ error: "amount must be positive" });
    const found = await db.select().from(accounts).where(and(eq(accounts.id, req.params.id), eq(accounts.userId, req.user.id))).limit(1);
    if (found.length === 0) return res.status(404).json({ error: "Account not found" });
    const account = found[0];
    const newBalance = account.balance + amountCents;
    await db.update(accounts).set({ balance: newBalance }).where(eq(accounts.id, req.params.id));
    const txnId = randomUUID();
    await db.insert(transactions).values({ id: txnId, accountId: req.params.id, type: "credit", amount: amountCents, description: description || "Deposit", category: "income", date: new Date(), balanceAfter: newBalance });
    await logAudit(req.user.id, "deposit", "accounts", req.params.id, { amount: amountCents });
    res.json({ id: req.params.id, balance: newBalance, transaction: { id: txnId, amount: amountCents, description: description || "Deposit" } });
  });

  // ---- Transaction Routes ----
  app.get("/api/transactions", authMiddleware, async (req, res) => {
    try {
      const rows = sqlite.prepare("SELECT * FROM transactions ORDER BY date DESC LIMIT 50").all();
      res.json({ transactions: rows, total: rows.length, page: 1, totalPages: 1 });
    } catch (e) {
      console.error("Transactions error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // ---- Transfer Routes ----
  app.post("/api/transfers", authMiddleware, async (req, res) => {
    const { fromAccountId, toAccountId, amount, transferType, reference, externalRouting, externalAccount } = req.body || {};
    if (!fromAccountId || !amount || !transferType) {
      return res.status(400).json({ error: "fromAccountId, amount, and transferType are required" });
    }
    const amountCents = Math.round(Number(amount) * 100);
    if (amountCents <= 0) return res.status(400).json({ error: "amount must be positive" });

    const fromAccount = await db.select().from(accounts).where(and(eq(accounts.id, fromAccountId), eq(accounts.userId, req.user.id))).limit(1);
    if (fromAccount.length === 0) return res.status(404).json({ error: "Source account not found" });
    if (fromAccount[0].balance < amountCents) return res.status(400).json({ error: "Insufficient funds" });

    const id = randomUUID();
    await db.insert(transfers).values({
      id,
      fromAccountId,
      toAccountId: toAccountId || null,
      externalRouting,
      externalAccount,
      amount: amountCents,
      transferType,
      status: "completed",
      reference,
    });

    // Update balances
    await db.update(accounts).set({ balance: sql`${accounts.balance} - ${amountCents}` }).where(eq(accounts.id, fromAccountId));
    if (toAccountId) {
      await db.update(accounts).set({ balance: sql`${accounts.balance} + ${amountCents}` }).where(eq(accounts.id, toAccountId));
    }

    // Create transaction records
    const now = new Date();
    await db.insert(transactions).values({
      id: randomUUID(),
      accountId: fromAccountId,
      type: "debit",
      amount: amountCents,
      description: `Transfer${reference ? ": " + reference : ""}`,
      category: "transfer",
      date: now,
      balanceAfter: fromAccount[0].balance - amountCents,
    });
    if (toAccountId) {
      const toAcc = await db.select().from(accounts).where(eq(accounts.id, toAccountId)).limit(1);
      if (toAcc.length > 0) {
        await db.insert(transactions).values({
          id: randomUUID(),
          accountId: toAccountId,
          type: "credit",
          amount: amountCents,
          description: `Transfer received${reference ? ": " + reference : ""}`,
          category: "transfer",
          date: now,
          balanceAfter: toAcc[0].balance + amountCents,
        });
      }
    }

    await logAudit(req.user.id, "transfer_completed", "transfers", id, { amount: amountCents, fromAccountId, toAccountId });
    const created = await db.select().from(transfers).where(eq(transfers.id, id)).limit(1);
    res.status(201).json(created[0]);
  });

  app.get("/api/transfers", authMiddleware, async (req, res) => {
    try {
      const rows = sqlite.prepare("SELECT * FROM transfers ORDER BY created_at DESC LIMIT 50").all();
      res.json({ transfers: rows });
    } catch (e) {
      console.error("Transfers error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // ---- KYC Routes ----
  app.post("/api/kyc/document", authMiddleware, async (req, res) => {
    const b = req.body || {};
    const vendor = getVendor(b.vendor || DEFAULT_VENDOR);
    const result = await vendor.verifyDocument({ fileName: b.fileName, applicantName: b.applicantName });
    const id = randomUUID();
    await db.insert(kycRecords).values({
      id,
      userId: req.user.id,
      status: result.status === "Verified" ? "verified" : "failed",
      documentType: result.docType,
      vendor: vendor.name,
      score: result.score,
      verifiedAt: result.status === "Verified" ? new Date() : null,
    });
    await logAudit(req.user.id, "kyc_document_verified", "kyc_records", id, { vendor: vendor.name, score: result.score });
    res.json(result);
  });

  app.post("/api/kyc/liveness", authMiddleware, async (req, res) => {
    const b = req.body || {};
    const vendor = getVendor(b.vendor || DEFAULT_VENDOR);
    const result = await vendor.checkLiveness({ applicantName: b.applicantName });
    res.json(result);
  });

  app.post("/api/kyc/watchlist", authMiddleware, async (req, res) => {
    const b = req.body || {};
    const vendor = getVendor(b.vendor || DEFAULT_VENDOR);
    const result = await vendor.screenWatchlist({ fullName: b.fullName, nationalId: b.nationalId });
    res.json(result);
  });

  // ---- Application Routes (Onboarding) ----
  app.post("/api/applications", authMiddleware, async (req, res) => {
    const { firstName, lastName, product, consent } = req.body || {};
    if (!firstName || !lastName || !product || !consent) {
      return res.status(400).json({ error: "firstName, lastName, product, and consent are required" });
    }
    const id = randomUUID();
    await db.insert(auditLogs).values({
      id: randomUUID(),
      userId: req.user.id,
      action: "application_submitted",
      entityType: "applications",
      entityId: id,
      metadata: JSON.stringify({ firstName, lastName, product }),
    });
    res.status(201).json({ id, status: "pending", createdAt: new Date().toISOString() });
  });

  app.get("/api/applications", authMiddleware, requireRole("officer", "admin"), async (_req, res) => {
    const logs = await db.select().from(auditLogs)
      .where(eq(auditLogs.action, "application_submitted"))
      .orderBy(desc(auditLogs.timestamp))
      .limit(50);
    res.json({ applications: logs });
  });

  app.post("/api/applications/:id/decision", authMiddleware, requireRole("officer", "admin"), async (req, res) => {
    const { decision, reason } = req.body || {};
    if (!decision || !["approved", "rejected"].includes(decision)) {
      return res.status(400).json({ error: "decision must be approved or rejected" });
    }
    await db.insert(auditLogs).values({
      id: randomUUID(),
      userId: req.user.id,
      action: `application_${decision}`,
      entityType: "applications",
      entityId: req.params.id,
      metadata: JSON.stringify({ reason }),
    });
    res.json({ id: req.params.id, status: decision, decidedAt: new Date().toISOString() });
  });

  // ---- Serve built SPA ----
  const distDir = path.join(__dirname, "..", "dist");
  if (existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api/")) return res.status(404).json({ error: "not found" });
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  return app;
}

// Start server when run directly
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`BankingApp API listening on :${PORT} (KYC vendor: ${DEFAULT_VENDOR})`);
  });
}

export { createApp };
