import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./index.mjs";

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

test("Application API + KYC proxy end-to-end", async () => {
  const app = createApp();
  const server = await listen(app);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const health = await fetch(`${base}/api/health`);
    assert.equal(health.status, 200);
    assert.equal((await health.json()).ok, true);

    const listRes = await fetch(`${base}/api/applications`);
    const apps = await listRes.json();
    assert.ok(Array.isArray(apps) && apps.length >= 1, "seeded applications present");

    const createdRes = await fetch(`${base}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Alex",
        lastName: "Chen",
        product: "Savings Account",
        consent: true,
      }),
    });
    assert.equal(createdRes.status, 201);
    const created = await createdRes.json();
    assert.equal(created.applicant, "Alex Chen");
    assert.equal(created.status, "Submitted");

    const detailRes = await fetch(`${base}/api/applications/${created.id}`);
    assert.equal(detailRes.status, 200);

    const decisionRes = await fetch(`${base}/api/applications/${created.id}/decision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision: "Approved" }),
    });
    assert.equal((await decisionRes.json()).status, "Approved");

    const kycRes = await fetch(`${base}/api/kyc/document`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendor: "persona",
        fileName: "passport.pdf",
        applicantName: "Alex Chen",
      }),
    });
    assert.equal((await kycRes.json()).status, "Verified");

    const badRes = await fetch(`${base}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: "Only" }),
    });
    assert.equal(badRes.status, 400, "missing fields rejected");

    const notFound = await fetch(`${base}/api/applications/NOPE`);
    assert.equal(notFound.status, 404);
  } finally {
    server.close();
  }
});
