import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
  api: {
    listApplications: vi
      .fn()
      .mockResolvedValue([
        {
          id: "APP-2026-0481",
          applicant: "Jane Doe",
          product: "Savings Account",
          submitted: "2026-08-28",
          status: "In Review",
          timeline: [],
        },
        {
          id: "APP-2026-0478",
          applicant: "Marcus Lee",
          product: "Current Account",
          submitted: "2026-08-28",
          status: "Approved",
          timeline: [],
        },
      ]),
    getApplication: vi.fn(),
    createApplication: vi.fn(),
    decide: vi.fn(),
    kycDocument: vi.fn(),
    kycLiveness: vi.fn(),
    kycWatchlist: vi.fn(),
  },
}));

describe("Dashboard", () => {
  it("renders the application queue fetched from the API", async () => {
    render(<Dashboard onNew={() => {}} onOpen={() => {}} />);
    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Marcus Lee")).toBeInTheDocument();
    // Status badges render
    expect(screen.getByText("In Review")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(api.listApplications).toHaveBeenCalled();
  });
});
