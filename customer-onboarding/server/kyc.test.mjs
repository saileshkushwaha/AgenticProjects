import test from "node:test";
import assert from "node:assert/strict";
import { getVendor, VENDOR_NAMES } from "./kyc.mjs";

test("every vendor verifies a document with a 0-100 score", async () => {
  for (const name of VENDOR_NAMES) {
    const r = await getVendor(name).verifyDocument({
      fileName: "passport.pdf",
      applicantName: "A B",
    });
    assert.equal(r.status, "Verified");
    assert.ok(r.score > 0 && r.score <= 100, `${name} score in range`);
    assert.ok(r.docType.length > 0, `${name} docType set`);
  }
});

test("persona watchlist hits on 'becker'", async () => {
  const r = await getVendor("persona").screenWatchlist({
    fullName: "Tom Becker",
    nationalId: "x",
  });
  assert.equal(r.status, "Hit");
});

test("onfido watchlist hits on 'beck'", async () => {
  const r = await getVendor("onfido").screenWatchlist({
    fullName: "Beck Hansen",
    nationalId: "x",
  });
  assert.equal(r.status, "Hit");
});

test("jumio watchlist hits on 'tom'", async () => {
  const r = await getVendor("jumio").screenWatchlist({
    fullName: "Tom X",
    nationalId: "x",
  });
  assert.equal(r.status, "Hit");
});

test("watchlist is Clear for a normal name", async () => {
  const r = await getVendor("persona").screenWatchlist({
    fullName: "Jane Doe",
    nationalId: "x",
  });
  assert.equal(r.status, "Clear");
});

test("liveness passes for every vendor", async () => {
  for (const name of VENDOR_NAMES) {
    const r = await getVendor(name).checkLiveness({ applicantName: "Jane" });
    assert.equal(r.status, "Passed");
  }
});

test("getVendor falls back to persona for unknown names", () => {
  assert.equal(getVendor("does-not-exist").name, "persona");
});
