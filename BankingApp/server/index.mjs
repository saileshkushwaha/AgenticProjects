import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync } from "fs";
import { db, initializeDatabase } from "./db/index.mjs";
import { users, accounts, transactions, transfers, kycRecords, auditLogs } from "./db/schema.mjs";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { getVendor, VENDOR_NAMES } from "./kyc.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "banking-app-secret-key-change-in-production";
const PORT = process.env.PORT || 8787;
const DEFAULT_VENDOR = process.env.KYC_VENDOR || "persona";

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  initializeDatabase();

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

  // ---- Transaction Routes ----
  app.get("/api/transactions", authMiddleware, async (req, res) => {
    const { accountId, startDate, endDate, category, page = "1", limit = "50" } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];
    if (accountId) conditions.push(eq(transactions.accountId, accountId));
    if (startDate) conditions.push(gte(transactions.date, new Date(startDate)));
    if (endDate) conditions.push(lte(transactions.date, new Date(endDate)));
    if (category) conditions.push(eq(transactions.category, category));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const txns = await db.select().from(transactions).where(whereClause).orderBy(desc(transactions.date)).limit(limitNum).offset(offset);
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(transactions).where(whereClause);
    const total = countResult[0]?.count || 0;

    res.json({ transactions: txns, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
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
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
    const accountIds = userAccounts.map((a) => a.id);
    if (accountIds.length === 0) return res.json({ transfers: [] });

    const userTransfers = await db.select().from(transfers)
      .where(sql`${transfers.fromAccountId} IN (${sql.join(accountIds.map((id) => sql`${id}`), sql`, `)})`)
      .orderBy(desc(transfers.createdAt))
      .limit(50);
    res.json({ transfers: userTransfers });
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

<<<<<<< ours
  // ---- Serve built SPA ----
=======
  // ---- Notifications ----
  app.get("/api/notifications", authMiddleware, async (req, res) => {
    const logs = await db.select().from(auditLogs)
      .where(eq(auditLogs.userId, req.user.id))
      .orderBy(desc(auditLogs.timestamp))
      .limit(20);
    const notifications = logs.map((log, idx) => ({
      id: idx + 1,
      type: log.action.includes("verified") || log.action.includes("completed") ? "success"
        : log.action.includes("warning") || log.action.includes("unusual") ? "warning"
        : "info",
      title: log.action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      message: `Action: ${log.action}`,
      timestamp: log.timestamp ? new Date(log.timestamp).toISOString() : new Date().toISOString(),
      read: idx > 2,
      metadata: log.metadata ? JSON.parse(log.metadata) : null,
    }));
    res.json({ notifications, unreadCount: notifications.filter((n) => !n.read).length });
  });

  app.get("/api/notifications/unread-count", authMiddleware, async (req, res) => {
    const count = await db.select({ count: sql`count(*)` }).from(auditLogs)
      .where(and(eq(auditLogs.userId, req.user.id), eq(auditLogs.action, "user_login")));
    res.json({ count: count[0]?.count || 0 });
  });

  // ---- Cards ----
  app.get("/api/cards", authMiddleware, async (req, res) => {
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
    const user = await db.select().from(users).where(eq(users.id, req.user.id)).limit(1);
    const cards = [
      {
        id: 1,
        type: "Debit",
        name: "Primary Debit Card",
        last4: "4532",
        first12: "4532 **** ****",
        expiry: "12/27",
        status: "active",
        balance: userAccounts.find((a) => a.type === "checking")?.balance || 0,
        cardholderName: user[0]?.fullName || "Account Holder",
        color: "from-blue-500 to-blue-700",
      },
      {
        id: 2,
        type: "Credit",
        name: "Rewards Credit Card",
        last4: "8910",
        first12: "8910 **** ****",
        expiry: "06/28",
        status: "active",
        balance: 125000,
        limit: 500000,
        cardholderName: user[0]?.fullName || "Account Holder",
        color: "from-purple-500 to-purple-700",
      },
    ];
    res.json({ cards });
  });

  // ---- Loans ----
  app.get("/api/loans/products", authMiddleware, async (_req, res) => {
    const products = [
      { id: "personal", title: "Personal Loan", rate: "8.5%", rateValue: 0.085, max: 5000000, maxDisplay: "$50,000", description: "Quick personal loans for any purpose" },
      { id: "auto", title: "Auto Loan", rate: "5.9%", rateValue: 0.059, max: 10000000, maxDisplay: "$100,000", description: "Finance your next vehicle purchase" },
      { id: "home", title: "Home Loan", rate: "6.5%", rateValue: 0.065, max: 100000000, maxDisplay: "$1,000,000", description: "Buy your dream home with competitive rates" },
      { id: "education", title: "Education Loan", rate: "4.5%", rateValue: 0.045, max: 20000000, maxDisplay: "$200,000", description: "Invest in your future with education financing" },
    ];
    res.json({ products });
  });

  // ---- Analytics ----
  app.get("/api/analytics/overview", authMiddleware, async (req, res) => {
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
    const totalBalance = userAccounts.reduce((sum, a) => sum + a.balance, 0);
    const userTxns = await db.select().from(transactions)
      .orderBy(desc(transactions.date))
      .limit(100);
    const totalIncome = userTxns.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = userTxns.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0);
    res.json({
      totalBalance,
      totalIncome,
      totalExpenses,
      netSavings: totalIncome - totalExpenses,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : "0",
    });
  });

  app.get("/api/analytics/monthly", authMiddleware, async (req, res) => {
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
    const accountIds = userAccounts.map((a) => a.id);
    const userTxns = await db.select().from(transactions).orderBy(desc(transactions.date)).limit(200);
    const accountTxns = userTxns.filter((t) => accountIds.includes(t.accountId));
    const monthlyData = {};
    accountTxns.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!monthlyData[key]) monthlyData[key] = { income: 0, expenses: 0 };
      if (t.type === "credit") monthlyData[key].income += t.amount;
      else monthlyData[key].expenses += t.amount;
    });
    const result = Object.entries(monthlyData)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 6)
      .reverse()
      .map(([key, data]) => {
        const [year, month] = key.split("-");
        const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString("en-US", { month: "short" });
        return { month: monthName, income: data.income, expenses: data.expenses };
      });
    res.json({ monthly: result });
  });

  app.get("/api/analytics/categories", authMiddleware, async (req, res) => {
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
    const accountIds = userAccounts.map((a) => a.id);
    const userTxns = await db.select().from(transactions).limit(200);
    const accountTxns = userTxns.filter((t) => accountIds.includes(t.accountId) && t.type === "debit");
    const categoryTotals = {};
    accountTxns.forEach((t) => {
      const cat = t.category || "other";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
    });
    const total = Object.values(categoryTotals).reduce((sum, v) => sum + v, 0) || 1;
    const colors = ["bg-blue-500", "bg-green-500", "bg-amber-500", "bg-purple-500", "bg-pink-500", "bg-gray-500", "bg-teal-500"];
    const categories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([name, amount], idx) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        amount,
        percent: Math.round((amount / total) * 100),
        color: colors[idx % colors.length],
      }));
    res.json({ categories });
  });

  // ---- Reports ----
  app.get("/api/reports", authMiddleware, async (req, res) => {
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
    const accountIds = userAccounts.map((a) => a.id);
    const userTxns = await db.select().from(transactions).orderBy(desc(transactions.date)).limit(50);
    const accountTxns = userTxns.filter((t) => accountIds.includes(t.accountId));
    const months = new Set();
    accountTxns.forEach((t) => {
      const d = new Date(t.date);
      months.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    });
    const reports = Array.from(months).sort().reverse().map((key, idx) => {
      const [year, month] = key.split("-");
      const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString("en-US", { month: "long", year: "numeric" });
      return {
        id: idx + 1,
        name: `Monthly Statement - ${monthName}`,
        type: "Statement",
        date: `${year}-${month}-01`,
        size: `${Math.floor(Math.random() * 200 + 100)} KB`,
      };
    });
    res.json({ reports });
  });

  // ---- Security Sessions ----
  app.get("/api/security/sessions", authMiddleware, async (req, res) => {
    const sessions = [
      {
        id: "current",
        device: "Current Session",
        browser: "Web Browser",
        location: "New York, US",
        status: "active",
        lastActive: new Date().toISOString(),
      },
      {
        id: "mobile",
        device: "Mobile App",
        browser: "Mobile Browser",
        location: "New York, US",
        status: "recent",
        lastActive: new Date(Date.now() - 2 * 3600000).toISOString(),
      },
    ];
    res.json({ sessions });
  });

  // ---- Profile ----
  app.get("/api/profile", authMiddleware, async (req, res) => {
    const found = await db.select().from(users).where(eq(users.id, req.user.id)).limit(1);
    if (found.length === 0) return res.status(404).json({ error: "User not found" });
    const u = found[0];
    res.json({
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      status: u.status,
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null,
    });
  });

  // ---- Statements ----
  app.get("/api/accounts/statements", authMiddleware, async (req, res) => {
    const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
    const accountIds = userAccounts.map((a) => a.id);
    const userTxns = await db.select().from(transactions).orderBy(desc(transactions.date)).limit(100);
    const accountTxns = userTxns.filter((t) => accountIds.includes(t.accountId));
    const months = new Set();
    accountTxns.forEach((t) => {
      const d = new Date(t.date);
      months.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    });
    const statements = Array.from(months).sort().reverse().map((key) => {
      const [year, month] = key.split("-");
      const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString("en-US", { month: "long", year: "numeric" });
      return monthName;
    });
    res.json({ statements });
  });

  // ---- Serve built SPA (MUST BE LAST) ----
>>>>>>> theirs
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
