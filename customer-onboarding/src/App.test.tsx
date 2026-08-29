import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import App from "./App";

vi.mock("./services/api", () => ({
  api: {
    listApplications: vi.fn(() =>
      Promise.resolve([
        {
          id: "APP-1",
          applicant: "Jane Doe",
          product: "Savings",
          submitted: "2026-08-28",
          status: "In Review",
          timeline: [],
        },
      ])
    ),
  },
}));

describe("App", () => {
  test("renders dashboard by default", async () => {
    render(<App />);
    expect(await screen.findByText("Customer Onboarding")).toBeDefined();
  });
});
