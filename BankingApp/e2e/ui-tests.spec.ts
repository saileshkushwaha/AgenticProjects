import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/#/login");
  await page.fill('input[type="email"]', "demo@bank.com");
  await page.fill('input[type="password"]', "demo1234");
  await page.click('button:has-text("Sign in")');
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
}

async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({
    path: `e2e/screenshots/${name}.png`,
    fullPage: true,
  });
}

test.describe("Authentication", () => {
  test("Login page renders correctly", async ({ page }) => {
    await page.goto("/#/login");
    await expect(page.locator("text=Welcome back")).toBeVisible();
    await takeScreenshot(page, "login-page");
  });

  test("Login with valid credentials", async ({ page }) => {
    await login(page);
    await takeScreenshot(page, "login-success");
    await expect(page.locator("text=BankingApp")).toBeVisible();
  });

  test("Login with invalid credentials shows error", async ({ page }) => {
    await page.goto("/#/login");
    await page.fill('input[type="email"]', "wrong@bank.com");
    await page.fill('input[type="password"]', "wrongpass");
    await page.click('button:has-text("Sign in")');
    await page.waitForTimeout(3000);
    await expect(page.locator("text=Invalid email or password")).toBeVisible();
    await takeScreenshot(page, "login-error");
  });
});

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Dashboard loads with data from API", async ({ page }) => {
    await page.goto("/#/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Overview")).toBeVisible();
    await takeScreenshot(page, "dashboard");
  });

  test("IconRail shows correct active state on refresh", async ({ page }) => {
    await page.goto("/#/accounts");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await takeScreenshot(page, "iconrail-active-state");
  });
});

test.describe("Accounts", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Accounts page loads data from API", async ({ page }) => {
    await page.goto("/#/accounts");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Primary Checking")).toBeVisible();
    await expect(page.locator("text=Emergency Savings")).toBeVisible();
    await takeScreenshot(page, "accounts-page");
  });

  test("Account detail page loads", async ({ page }) => {
    await page.goto("/#/accounts");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await page.click("text=Primary Checking");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Available Balance")).toBeVisible();
    await takeScreenshot(page, "account-detail");
  });

  test("Statements sub-tab loads from API", async ({ page }) => {
    await page.goto("/#/accounts/statements");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await takeScreenshot(page, "accounts-statements");
  });
});

test.describe("Transactions", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Transactions page loads data from API", async ({ page }) => {
    await page.goto("/#/transactions");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Salary Deposit")).toBeVisible();
    await takeScreenshot(page, "transactions-page");
  });

  test("Transaction dates display correctly", async ({ page }) => {
    await page.goto("/#/transactions");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=/Aug [0-9]+, 2026/").first()).toBeVisible();
    await takeScreenshot(page, "transactions-dates");
  });
});

test.describe("Transfers", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Transfers page loads with form and history", async ({ page }) => {
    await page.goto("/#/transfers");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=New Transfer")).toBeVisible();
    await takeScreenshot(page, "transfers-page");
  });

  test("Transfer history shows data from API", async ({ page }) => {
    await page.goto("/#/transfers");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Monthly savings")).toBeVisible();
    await takeScreenshot(page, "transfers-history");
  });
});

test.describe("Services", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Services page loads", async ({ page }) => {
    await page.goto("/#/services");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("text=All Services")).toBeVisible();
    await takeScreenshot(page, "services-page");
  });

  test("Cards page loads from API", async ({ page }) => {
    await page.goto("/#/cards");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Primary Debit Card")).toBeVisible();
    await takeScreenshot(page, "cards-page");
  });

  test("Analytics page loads from API", async ({ page }) => {
    await page.goto("/#/analytics");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Total Income")).toBeVisible();
    await takeScreenshot(page, "analytics-page");
  });

  test("Loans page loads from API", async ({ page }) => {
    await page.goto("/#/loans");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Personal Loan")).toBeVisible();
    await takeScreenshot(page, "loans-page");
  });

  test("KYC page loads", async ({ page }) => {
    await page.goto("/#/kyc");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("text=KYC Verification")).toBeVisible();
    await takeScreenshot(page, "kyc-page");
  });
});

test.describe("Settings", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Settings page loads", async ({ page }) => {
    await page.goto("/#/settings");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("text=Settings")).toBeVisible();
    await takeScreenshot(page, "settings-page");
  });

  test("Profile page loads from API", async ({ page }) => {
    await page.goto("/#/settings/profile");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Demo User")).toBeVisible();
    await takeScreenshot(page, "profile-page");
  });

  test("Security page loads from API", async ({ page }) => {
    await page.goto("/#/settings/security");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Change Password")).toBeVisible();
    await takeScreenshot(page, "security-page");
  });

  test("Appearance page loads", async ({ page }) => {
    await page.goto("/#/settings/appearance");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("text=Theme")).toBeVisible();
    await takeScreenshot(page, "appearance-page");
  });
});

test.describe("Notifications", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Notifications page loads from API", async ({ page }) => {
    await page.goto("/#/notifications");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await takeScreenshot(page, "notifications-page");
  });
});

test.describe("Reports", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Reports page loads from API", async ({ page }) => {
    await page.goto("/#/reports");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page.locator("text=Available Reports")).toBeVisible();
    await takeScreenshot(page, "reports-page");
  });
});

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("NavPanel shows correct submenu for selected category", async ({ page }) => {
    await page.goto("/#/accounts");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("text=All Accounts")).toBeVisible();
    await expect(page.locator("text=Checking")).toBeVisible();
    await takeScreenshot(page, "navigation-submenu");
  });

  test("Page refresh maintains correct navigation state", async ({ page }) => {
    await page.goto("/#/transactions/history");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page.locator("text=All Transactions")).toBeVisible();
    await takeScreenshot(page, "navigation-refresh");
  });
});
