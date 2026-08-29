import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ApplicationDetail } from "./ApplicationDetail";

vi.mock("../services/api", () => ({
  api: {
    getApplication: vi.fn((id: string) =>
      Promise.resolve({
        id,
        applicant: "Jane Doe",
        product: "Savings Account",
        submitted: "2026-08-28",
        status: "In Review",
        timeline: [
          { label: "Submitted", time: "19:00", state: "done" },
          { label: "KYC review", time: "now", state: "current" },
        ],
      })
    ),
    decide: vi.fn((id: string, body: any) =>
      Promise.resolve({
        id,
        applicant: "Jane Doe",
        product: "Savings Account",
        submitted: "2026-08-28",
        status: body.decision,
        timeline: [
          { label: "Submitted", time: "19:00", state: "done" },
          { label: `${body.decision}`, time: "now", state: "done" },
        ],
      })
    ),
  },
}));

describe("ApplicationDetail", () => {
  test("renders application detail", async () => {
    render(<ApplicationDetail id="APP-1" onBack={() => {}} />);
    expect(await screen.findByText("Jane Doe")).toBeDefined();
  });

  test("approves application", async () => {
    render(<ApplicationDetail id="APP-1" onBack={() => {}} />);
    await waitFor(() => screen.getByText("✓ Approve"));
    fireEvent.click(screen.getByText("✓ Approve"));
    await waitFor(() => screen.getAllByText("Approved").length > 0);
  });
});
