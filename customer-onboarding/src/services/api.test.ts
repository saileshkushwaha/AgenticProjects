import { describe, it, expect, beforeEach, vi } from "vitest";
import { api } from "./api";

describe("api client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("listApplications fetches /api/applications", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: "APP-1" }],
    }) as unknown as typeof fetch;

    const r = await api.listApplications();
    expect(r).toEqual([{ id: "APP-1" }]);
    const [url] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url)).toContain("/api/applications");
  });

  it("createApplication POSTs and returns the new application", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "APP-9" }),
    }) as unknown as typeof fetch;

    const r = await api.createApplication({
      firstName: "A",
      lastName: "B",
      product: "Savings Account",
      consent: true,
    });
    expect(r.id).toBe("APP-9");
    const [, opts] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(opts.method).toBe("POST");
  });

  it("kycDocument POSTs to /api/kyc/document with vendor", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "Verified", score: 91 }),
    }) as unknown as typeof fetch;

    const r = await api.kycDocument("persona", "passport.pdf", "A B");
    expect(r.status).toBe("Verified");
    const [url, opts] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(String(url)).toContain("/api/kyc/document");
    expect(JSON.parse(opts.body).vendor).toBe("persona");
  });

  it("throws with the server error on non-ok responses", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: "bad request" }),
    }) as unknown as typeof fetch;

    await expect(api.listApplications()).rejects.toThrow(/bad request/);
  });
});
