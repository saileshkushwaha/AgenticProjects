import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { ApplicationDetail } from "./ApplicationDetail";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
  api: {
    getApplication: vi.fn().mockResolvedValue({
      id: "APP-2026-0481",
      applicant: "Jane Doe",
      product: "Savings Account",
      submitted: "2026-08-28 19:02",
      status: "In Review",
      timeline: [
        { label: "Application submitted", time: "19:02", state: "done" },
        { label: "KYC / identity review", time: "now", state: "current" },
      ],
    }),
    listApplications: vi.fn(),
    createApplication: vi.fn(),
    decide: vi.fn().mockResolvedValue({
      id: "APP-2026-0481",
      applicant: "Jane Doe",
      product: "Savings Account",
      submitted: "2026-08-28 19:02",
      status: "Approved",
      timeline: [
        { label: "Application submitted", time: "19:02", state: "done" },
        { label: "Approved", time: "19:30", state: "done" },
      ],
    }),
    kycDocument: vi.fn(),
    kycLiveness: vi.fn(),
    kycWatchlist: vi.fn(),
  },
}));

describe("ApplicationDetail", () => {
  it("renders applicant, status, timeline and decision actions", async () => {
    render(<ApplicationDetail id="APP-2026-0481" onBack={() => {}} />);
    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("In Review")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
    expect(screen.getByText("KYC / identity review")).toBeInTheDocument();

    const approve = screen.getByRole("button", { name: /Approve/ });
    const reject = screen.getByRole("button", { name: /Reject/ });
    expect(approve).toBeInTheDocument();
    expect(reject).toBeInTheDocument();
  });

  it("approves the application and reflects the new status", async () => {
    render(<ApplicationDetail id="APP-2026-0481" onBack={() => {}} />);
    const approve = await screen.findByRole("button", { name: /Approve/ });
    fireEvent.click(approve);
    expect(await screen.findByText("Approved")).toBeInTheDocument();
    expect(api.decide).toHaveBeenCalledWith("APP-2026-0481", {
      decision: "Approved",
      reason: "",
    });
  });
});
