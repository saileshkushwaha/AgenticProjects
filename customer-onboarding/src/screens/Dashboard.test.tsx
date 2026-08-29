import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Dashboard } from "./Dashboard";

vi.mock("../services/api", () => ({
  api: {
    listApplications: vi.fn(() =>
      Promise.resolve([
        {
          id: "APP-1",
          applicant: "Jane Doe",
          product: "Savings Account",
          submitted: "2026-08-28",
          status: "In Review",
          timeline: [],
        },
        {
          id: "APP-2",
          applicant: "Marcus Lee",
          product: "Current Account",
          submitted: "2026-08-27",
          status: "Approved",
          timeline: [],
        },
      ])
    ),
  },
}));

describe("Dashboard", () => {
  test("renders KPI cards and application queue", async () => {
    render(<Dashboard onNew={() => {}} onOpen={() => {}} />);
    expect(await screen.findByText("Total applications")).toBeDefined();
    expect(screen.getAllByText("1").length).toBe(2);
    expect(screen.getAllByText("In Review").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Approved").length).toBeGreaterThan(0);
  });

  test("calls onNew when New Application clicked", async () => {
    const onNew = vi.fn();
    render(<Dashboard onNew={onNew} onOpen={() => {}} />);
    await waitFor(() => screen.getByText("Application Queue"));
    const headerBtn = screen.getByRole("button", { name: "+ New Application" });
    fireEvent.click(headerBtn);
    expect(onNew).toHaveBeenCalled();
  });
});
